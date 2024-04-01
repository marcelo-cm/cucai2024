import { createClient } from "@/lib/supabase/client";
import { getTicketType } from "@/lib/utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

const supabase = createClient();

interface RequestBody {
  data: {
    // Profile Information
    first_name: string;
    last_name: string;
    gender: string;
    ethnicity: string;
    school: string;
    grad_year: string;
    degree_type: string;
    faculty: string;
    discipline: string;
    // Tickets
    ticket_applied: string;
    consider_no_hotel: boolean;
    // Conference Application
    linkedin: string;
    why_cucai: string;
    student_partner: string;
    project: boolean;
    // Project Application
    project_id: string;
    project_name: string;
    project_description: string;
    project_needs: string;
    project_team: boolean;
    project_members: { [key: string]: { name: string; email: string } };
  };
  user: {
    id: string;
    email: string;
  };
}

/**
 * This uploads all the application data to the backend and creates a ticket for the user
 *
 * @param req Application form data, and user information
 * @returns Response on success or error
 */
export async function POST(req: Request) {
  try {
    const { data, user } = (await req.json()) as RequestBody;

    if (!user) {
      console.log("No user found");
      return new Response("Error", {
        status: 404,
        statusText: "User not found",
      }); // Custom error handling
    }

    const user_data = {
      user_id: user.id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: user.email,
      gender: data.gender,
      ethnicity: data.ethnicity,
      school: data.school,
      grad_year: data.grad_year,
      degree_type: data.degree_type,
      faculty: data.faculty,
      discipline: data.discipline,
      linkedin: data.linkedin,
      student_partner: data.student_partner,
      why_cucai: data.why_cucai,
      project_id: data.project_id || null,
    };

    const ticket_type = getTicketType(
      data.ticket_applied,
      data.consider_no_hotel
    );

    const ticket_data = {
      owner: user.id,
      ticket_applied: ticket_type,
      ticket_assigned: null,
      status: null,
    };

    // Push user data to backend, excluding project id
    const { data: user_data_res, error: user_data_error } = await supabase
      .from("delegates")
      .upsert(user_data);

    if (user_data_error) {
      throw new Error(user_data_error.message);
    }

    // Push ticket entry to backend with user as owner (relation)
    const { data: ticket_data_res, error: ticket_data_error } = await supabase
      .from("tickets")
      .upsert(ticket_data);

    if (ticket_data_error) {
      throw new Error(ticket_data_error.message);
    }

    // Push project data to backend if applicable
    if (data.project && !data.project_id) {
      const project_data = {
        name: data.project_name,
        description: data.project_description,
        member_names: Object.values(data.project_members).map(
          (member) => member.name
        ),
        member_emails: Object.values(data.project_members).map(
          (member) => member.email
        ),
        special_req: data.project_needs,
      };

      const { data: project_data_res, error: project_data_error } =
        await supabase
          .from("projects")
          .upsert(project_data)
          .select("project_id")
          .single();

      if (project_data_error) {
        throw new Error(project_data_error.message);
      }

      // Add project relation to user object if applicable
      const { data: project_user_res, error: project_user_error } =
        await supabase
          .from("delegates")
          .update({ project_id: project_data_res.project_id })
          .eq("user_id", user.id);

      if (project_user_error) {
        throw new Error(project_user_error.message);
      }
    } else if (data.project && data.project_id) {
      const { data: project_data_res, error: project_data_error } =
        await supabase
          .from("projects")
          .select("member_names, member_emails")
          .eq("project_id", data.project_id);

      if (project_data_error) {
        throw new Error(project_data_error.message);
      }

      if (!project_data_res[0].member_emails.includes(user.email)) {
        const new_member_emails = [
          ...project_data_res[0].member_emails,
          user.email,
        ];

        const fullName = user_data.first_name + " " + user_data.last_name;
        const new_member_names = [
          ...project_data_res[0].member_names,
          fullName,
        ];

        const {
          data: project_data_res_update,
          error: project_data_error_update,
        } = await supabase
          .from("projects")
          .update({
            member_emails: new_member_emails,
            member_names: new_member_names,
          })
          .eq("project_id", data.project_id);

        if (project_data_error_update) {
          throw new Error(project_data_error_update.message);
        }
      }

      const { data: project_user_res, error: project_user_error } =
        await supabase
          .from("delegates")
          .update({ project_id: data.project_id })
          .eq("user_id", user.id);

      if (project_user_error) {
        throw new Error(project_user_error.message);
      }
    }

    return new Response("OK", {
      status: 200,
      statusText: "Data submitted successfully!",
    });
  } catch (error) {
    console.error(error);
    return new Response("An error occurred while submitting data.", {
      status: 500,
      statusText: "An error occurred while submitting data.",
    });
  }
}

import { createContext, useState, useEffect, use } from "react";
import { ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";
import { getTicketType } from "@/lib/utils";

interface ApplyFormContextType {
  title: { [key: number]: string };
  states: {
    page: number;
    canNext: boolean;
    canSubmit: boolean;
  };
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
  functions: {
    nextPage: () => void;
    prevPage: () => void;
    handleChange: (e: any) => void;
    handleSubmit: () => void;
  };
}

const defaultContextValue: ApplyFormContextType = {
  title: {
    0: "Profile Information",
    1: "Conference Application",
    2: "Project Application",
    3: "Thank You!",
  },
  states: {
    page: 0,
    canNext: true,
    canSubmit: false,
  },
  data: {
    first_name: "",
    last_name: "",
    gender: "",
    ethnicity: "",
    school: "",
    grad_year: "",
    degree_type: "",
    faculty: "",
    discipline: "",
    ticket_applied: "",
    consider_no_hotel: false,
    linkedin: "",
    why_cucai: "",
    student_partner: "",
    project: false,
    project_id: "",
    project_name: "",
    project_description: "",
    project_needs: "",
    project_team: false,
    project_members: { member_1: { name: "", email: "" } },
  },
  functions: {
    handleChange: () => {},
    nextPage: () => {},
    prevPage: () => {},
    handleSubmit: () => {},
  },
};

const ApplyFormContext =
  createContext<ApplyFormContextType>(defaultContextValue);

export const ApplyFormProvider = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const title: { [key: number]: string } = defaultContextValue.title;
  const [page, setPage] = useState(defaultContextValue.states.page);
  const [data, setData] = useState(defaultContextValue.data);

  const handleChange = (e: any) => {
    const type = e.target.type;
    const name = e.target.name;
    const value = e.target.value;

    if (type === "file") {
      const file = e.target.files[0];
      setData((prev) => ({ ...prev, [name]: file }));
      return;
    }

    setData((prev) => ({ ...prev, [name]: value }));
  };

  // useEffect(() => {
  //   console.log(data.project_members);
  // }, [data]);

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setPage((prev) => prev - 1);
  };

  const {
    project,
    project_id,
    project_name,
    project_description,
    project_needs,
    project_team,
    project_members,
    ...alwaysRequiredInputs
  } = data;

  const areAlwaysRequiredInputsValid = Object.values(
    alwaysRequiredInputs
  ).every((input) => {
    if (input !== "" && input !== null) return true;
    return false;
  });

  const [areProjectInputsValid, setAreProjectInputsValid] = useState(true);

  useEffect(() => {
    setAreProjectInputsValid(
      !project
        ? true
        : project_id
        ? true
        : project_name !== "" &&
          project_description !== "" &&
          project_needs !== "" &&
          (project_team
            ? Object.values(project_members).every(
                (member) => member.name !== "" && member.email !== ""
              )
            : true)
    );
  }, [
    project,
    project_id,
    project_name,
    project_description,
    project_needs,
    project_team,
    project_members,
  ]);

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      project_name: "",
      project_description: "",
      project_needs: "",
      project_team: false,
      project_members: { member_1: { name: "", email: "" } },
    }));
  }, [project_id]);

  const canSubmit = areAlwaysRequiredInputsValid && areProjectInputsValid;

  const handleSubmit = async () => {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error("No user found");
      return;
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

    const project_data = {
      name: data.project_name,
      description: data.project_description,
      member_names: Object.values(project_members).map((member) => member.name),
      member_emails: Object.values(project_members).map(
        (member) => member.email
      ),
      special_req: data.project_needs,
    };

    console.log(user_data);
    console.log(ticket_data);
    console.log(project_data);

    // Push user data to backend, excluding project id
    const { data: user_data_res, error: user_data_error } = await supabase
      .from("delegates")
      .upsert(user_data);

    if (user_data_error) {
      console.error(user_data_error);
      return;
    }

    // Push ticket entry to backend with user as owner (relation)
    const { data: ticket_data_res, error: ticket_data_error } = await supabase
      .from("tickets")
      .upsert(ticket_data);

    if (ticket_data_error) {
      console.error(ticket_data_error);
      return;
    }

    // Push project data to backend if applicable
    if (data.project && !project_id) {
      const { data: project_data_res, error: project_data_error } =
        await supabase
          .from("projects")
          .upsert(project_data)
          .select("project_id")
          .single();

      if (project_data_error) {
        console.error(project_data_error);
        return;
      }

      // Add project relation to user object if applicable
      const { data: project_user_res, error: project_user_error } =
        await supabase
          .from("delegates")
          .update({ project_id: project_data_res.project_id })
          .eq("user_id", user.id);

      if (project_user_error) {
        console.error(project_user_error);
        return;
      }
    }

    console.log("Data submitted successfully!");

    // Redirect to thank you page
    setPage(3);
  };

  return (
    <ApplyFormContext.Provider
      value={{
        title,
        states: {
          page,
          canNext: page < 3,
          canSubmit,
        },
        data,
        functions: {
          handleChange,
          nextPage,
          prevPage,
          handleSubmit,
        },
      }}
    >
      {children}
    </ApplyFormContext.Provider>
  );
};

export default ApplyFormContext;

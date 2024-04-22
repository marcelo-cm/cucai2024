import { Checkbox } from "@/components/ui/checkbox";
import ExternalLink from "@/components/ui/external-link";
import { getTicketDescription } from "@/lib/utils";
import { SupabaseClient } from "@supabase/supabase-js";
import React, { useState } from "react";

/**
 * A component that displays a row in the final delegate list, showing the delegate's information and ticket status
 * and allowing the admin to change the status of the delegate between Checked In and Paid
 * @param application The application to display
 * @param supabase The Supabase client
 * @param project The project the delegate is in
 * @returns A row in the final delegate list
 */
const DelegateListRow = ({
  application,
  supabase,
  project,
}: {
  application: Application;
  supabase: SupabaseClient;
  project: string;
}) => {
  const [ticketStatus, setTicketStatus] = useState<string>(application.status);

  /**
   * Updates the delegate ticket status to a given status on the database
   * @param user_id user_id of the delegate to update
   * @param status status to update the delegate to
   * @returns void
   */
  const updateDelegateStatus = async (user_id: string, status: string) => {
    const { data: updateDelegateStatusRes, error: updateDelegateStatusError } =
      await supabase
        .from("tickets")
        .update({ status: status })
        .eq("owner", user_id);

    if (updateDelegateStatusError) {
      console.error("Error updating batch status", updateDelegateStatusError);
      return;
    }

    console.log("Delegate checked in", updateDelegateStatusRes);
    setTicketStatus(status);
  };

  /**
   * Handles the change of status of a delegate, toggling between Checked In and Paid based on the current status
   * @param user_id user_id of the delegate to change status
   * @returns void
   */
  const handleDelegateStatusChange = async (user_id: string) => {
    const { data: checkTicketStatus, error: checkTicketStatusError } =
      await supabase
        .from("tickets")
        .select("status")
        .eq("owner", user_id)
        .single();

    if (checkTicketStatusError) {
      console.error("Error checking ticket status", checkTicketStatusError);
      return;
    }

    if (checkTicketStatus.status === "Checked In") {
      await updateDelegateStatus(user_id, "Paid");
    } else {
      await updateDelegateStatus(user_id, "Checked In");
    }
  };

  return (
    <div className="flex pr-6 px-4 items-center gap-2 h-fit">
      <Checkbox
        className="mr-4"
        onClick={() => handleDelegateStatusChange(application.user_id)}
        checked={ticketStatus === "Checked In"}
      />
      <div className="flex flex-row leading-tight w-full">
        <div className="text-blumine-700">{application.ticket_id} – </div>
        <ExternalLink href={application.linkedin} className="text-blumine-200">
          {application.first_name} {application.last_name}
        </ExternalLink>
      </div>
      <div className="flex flex-col leading-tight w-full">
        <div>
          {application.school}, {application.grad_year}
        </div>
        <div>
          {application.degree_type}, {application.faculty},{" "}
          {application.discipline}
        </div>
      </div>
      <div className="flex flex-col leading-tight w-full py-3">
        <div>{getTicketDescription(application.ticket_applied)}</div>
        <div>{application.student_partner}</div>
        <div>{project}</div>
      </div>
    </div>
  );
};

export default DelegateListRow;

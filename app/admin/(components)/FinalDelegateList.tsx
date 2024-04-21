import { Button } from "@/components/ui/button";
import { SupabaseClient } from "@supabase/supabase-js";
import React, { useDeferredValue, useEffect, useState } from "react";

import { getTicketDescription } from "@/lib/utils";
import ExternalLink from "@/components/ui/external-link";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const FinalDelegateDetails = ({
  applications,
  projects,
  supabase,
}: {
  applications: Application[];
  projects: Project[];
  supabase: SupabaseClient;
}) => {
  const [searchFilter, setSearchFilter] = useState<string>("");
  const delayedSearchFilter = useDeferredValue<string>(searchFilter);

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
  };

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
    <div className="flex flex-col gap-4 overflow-scroll">
      <div className="flex flex-col w-full border border-2 border-blumine-700 bg-blumine-950">
        <div className="bg-blumine-700 py-2 px-6 flex flex-row gap-6 justify-between font-semibold items-center">
          <div>Paid Delegate List</div>
          <Input
            className="max-w-[500px] !py-1"
            placeholder="Search"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
        </div>
        {applications
          .filter((application) =>
            String(
              application.first_name +
                " " +
                application.last_name +
                " " +
                application.ticket_id
            )
              .toLowerCase()
              .includes(delayedSearchFilter.toLowerCase())
          )
          .map((application: Application, index) => (
            <div
              className="flex pr-6 px-4 items-center gap-2 h-fit"
              key={index}
            >
              <Checkbox
                className="mr-4"
                onClick={() => handleDelegateStatusChange(application.user_id)}
              />
              <div className="flex flex-row leading-tight w-full">
                <div className="text-blumine-700">
                  {application.ticket_id} – 
                </div>
                <ExternalLink
                  href={application.linkedin}
                  className="text-blumine-200"
                >
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
                <div>
                  {projects.find((p) => p.project_id == application.project_id)
                    ?.name || "None"}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FinalDelegateDetails;

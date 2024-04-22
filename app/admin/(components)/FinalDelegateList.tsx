import { Button } from "@/components/ui/button";
import { SupabaseClient } from "@supabase/supabase-js";
import React, { useDeferredValue, useEffect, useState } from "react";

import { getTicketDescription } from "@/lib/utils";
import ExternalLink from "@/components/ui/external-link";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import DelegateListRow from "./DelegateListRow";

/**
 * A component that displays the final delegate list for the conference
 * @param applications All applications in the database
 * @param projects All projects in the database
 * @param supabase The Supabase client
 * @returns A component that displays the final delegate list for the conference
 */
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
            <DelegateListRow
              application={application}
              supabase={supabase}
              key={index}
              project={
                projects.find((p) => p.project_id == application.project_id)
                  ?.name || "No Project"
              }
            />
          ))}
      </div>
    </div>
  );
};

export default FinalDelegateDetails;

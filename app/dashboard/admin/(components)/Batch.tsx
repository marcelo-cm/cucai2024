"use client";

import React from "react";
import ApplicationRow from "./ApplicationRow";
import { SupabaseClient } from "@supabase/supabase-js";
import BatchTableRow from "./BatchTableRow";

const Batch = ({
  label,
  applications,
}: {
  label: string;
  applications: Application[];
}) => {
  return (
    <div className="border border-blumine-700 text-blumine-50 bg-blumine-950 flex flex-col justify-between">
      <div className="bg-blumine-700 py-4 px-6 flex flex-row gap-6 font-semibold">
        <div>{label}</div>
      </div>
      {applications
        .filter((app) => app.batch === label)
        .map((application, index) => (
          <BatchTableRow key={index} application={application} />
        ))}
      <div className="bg-blumine-700 py-2 px-6 flex flex-row gap-4 font-semibold">
        <div className="flex flex-row gap-2 items-center">
          T{" "}
          <div className="text-xs bg-blumine-950 w-5 h-5 flex items-center justify-center leading-none">
            {applications.filter((app) => app.batch === label).length}
          </div>
        </div>
        <p className="text-blumine-400">—</p>
        <div className="flex flex-row gap-2 items-center">
          H{" "}
          <div className="text-xs bg-blumine-950 w-5 h-5 flex items-center justify-center leading-none">
            {
              applications.filter(
                (app) => app.batch === label && app.ticket_assigned === "Hotel"
              ).length
            }
          </div>
        </div>
        <div className="flex flex-row gap-2 items-center">
          C{" "}
          <div className="text-xs bg-blumine-950 w-5 h-5 flex items-center justify-center leading-none">
            {
              applications.filter(
                (app) =>
                  app.batch === label && app.ticket_assigned === "Conference"
              ).length
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Batch;

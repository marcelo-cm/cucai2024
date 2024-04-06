"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "./template";
import ApplicationRow from "./(components)/ApplicationRow";
import { parseDate } from "@/lib/utils";
import { TabsContent } from "@radix-ui/react-tabs";
import Batch from "./(components)/Batch";

const AdminDashboard = () => {
  const { user, supabase, applications } = useUser();

  return (
    <div className="w-full">
      <TabsContent value="applications">
        <div className="border border-blumine-700 text-blumine-50 w-full bg-blumine-950">
          <div className="bg-blumine-700 py-4 px-6 flex flex-row gap-6 font-semibold">
            <div>Delegate Applications</div>
          </div>
          {applications.map((application, index) => (
            <ApplicationRow
              key={index}
              application={application}
              supabase={supabase}
            />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="acceptances" className="flex flex-col gap-4">
        <div className="bg-blumine-700 py-1 px-6 flex flex-row justify-between font-semibold">
          <div className="bg-blumine-700 py-2 px-6 flex flex-row gap-8 font-semibold items-center">
            <div>Total Sent</div>
            <div className="flex flex-row gap-4">
              <div className="flex flex-row gap-2 items-center">
                T{" "}
                <div className="text-xs bg-blumine-950 w-5 h-5 flex items-center justify-center leading-none">
                  {
                    applications.filter((app) => app.status === "Accepted")
                      .length
                  }
                </div>
              </div>
              <p className="text-blumine-400">—</p>
              <div className="flex flex-row gap-2 items-center">
                H{" "}
                <div className="text-xs bg-blumine-950 w-5 h-5 flex items-center justify-center leading-none">
                  {
                    applications.filter(
                      (app) =>
                        app.status === "Accepted" &&
                        app.ticket_assigned === "Hotel"
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
                        app.status === "Accepted" &&
                        app.ticket_assigned === "Conference"
                    ).length
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="bg-blumine-700 py-2 px-6 flex flex-row gap-8 font-semibold items-center">
            <div>Total Pending</div>
            <div className="flex flex-row gap-4">
              <div className="flex flex-row gap-2 items-center">
                T{" "}
                <div className="text-xs bg-blumine-950 w-5 h-5 flex items-center justify-center leading-none">
                  {
                    applications.filter(
                      (app) =>
                        app.status !== "Accepted" && app.status !== "Rejected"
                    ).length
                  }
                </div>
              </div>
              <p className="text-blumine-400">—</p>
              <div className="flex flex-row gap-2 items-center">
                H{" "}
                <div className="text-xs bg-blumine-950 w-5 h-5 flex items-center justify-center leading-none">
                  {
                    applications.filter(
                      (app) =>
                        app.status !== "Accepted" &&
                        app.status !== "Rejected" &&
                        app.ticket_assigned === "Hotel"
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
                        app.status !== "Accepted" &&
                        app.status !== "Rejected" &&
                        app.ticket_assigned === "Conference"
                    ).length
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
          <Batch applications={applications} label="Batch 1" />
          <Batch applications={applications} label="Batch 2" />
          <Batch applications={applications} label="Batch 3" />
          <Batch applications={applications} label="Reject" />
        </div>
      </TabsContent>
    </div>
  );
};

export default AdminDashboard;

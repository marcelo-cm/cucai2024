"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "./template";
import ApplicationRow from "./(components)/ApplicationRow";
import { parseDate } from "@/lib/utils";
import { TabsContent } from "@radix-ui/react-tabs";
import Batch from "./(components)/Batch";
import ApplicationStatistics from "./(components)/ApplicationStatistics";

const AdminDashboard = () => {
  const { user, supabase, applications, masterSettings } = useUser();

  if (!user || !supabase || !applications || !masterSettings) {
    return null;
  }

  const updateBatchStatus = async (
    batch: string,
    batchApplicants: Application[]
  ) => {
    const { data: updateBatchStatusRes, error: updateBatchStatusError } =
      await supabase
        .from("master_settings")
        .update({ [batch]: "Sent" })
        .eq("id", 1)
        .single();

    if (updateBatchStatusError) {
      console.error("Error updating batch status", updateBatchStatusError);
      return;
    }

    console.log("Batch status updated", updateBatchStatusRes);

    const allAcceptedApplicants: string[] = batchApplicants.map(
      (app) => app.user_id
    );

    const {
      data: updateBatchApplicantsRes,
      error: updateBatchApplicantsError,
    } = await supabase
      .from("tickets")
      .update({ status: "Accepted" })
      .in("owner", allAcceptedApplicants);

    if (updateBatchApplicantsError) {
      console.error(
        "Error updating batch applicants",
        updateBatchApplicantsError
      );
      return;
    }

    window.location.reload();
  };

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
              masterSettings={masterSettings}
            />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="acceptances" className="flex flex-col gap-4">
        <ApplicationStatistics applications={applications} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
          <Batch
            applications={applications}
            label="Batch 1"
            status={masterSettings.batch_1}
            updateStatus={updateBatchStatus}
          />
          <Batch
            applications={applications}
            label="Batch 2"
            status={masterSettings.batch_2}
            updateStatus={updateBatchStatus}
          />
          <Batch
            applications={applications}
            label="Batch 3"
            status={masterSettings.batch_3}
            updateStatus={updateBatchStatus}
          />
          <Batch
            applications={applications}
            label="Reject"
            status={masterSettings.reject}
            updateStatus={updateBatchStatus}
          />
        </div>
      </TabsContent>
      <TabsContent value="projects"></TabsContent>
    </div>
  );
};

export default AdminDashboard;

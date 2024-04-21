"use client";

import React, { useDeferredValue, useEffect, useState } from "react";
import { useUser } from "./template";
import ApplicationRow from "./(components)/ApplicationRow";
import { TabsContent } from "@radix-ui/react-tabs";
import Batch from "./(components)/Batch";
import ApplicationStatistics from "./(components)/ApplicationStatistics";
import { Button } from "@/components/ui/button";
import ProjectContainer from "./(components)/ProjectContainer";
import { Input } from "@/components/ui/input";

const AdminDashboard = () => {
  const { user, supabase, applications, projects, masterSettings } = useUser();

  if (!user || !supabase || !applications || !masterSettings) {
    return null;
  }

  const [detailedProjects, setDetailedProjects] = useState<any[]>([]);
  const [searchFilter, setSearchFilter] = useState<string>("");
  const delayedSearchFilter = useDeferredValue<string>(searchFilter);
  const loading = delayedSearchFilter !== searchFilter;

  useEffect(() => {
    if (projects && applications) {
      transformAllProjects(projects, applications);
    }
  }, [projects, applications]);

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

  function transformProject(
    project: Project,
    applications: Application[]
  ): Project {
    return {
      ...project,
      member_emails: project.member_emails.map((email) => {
        const application = applications.find((app) => app.email === email);
        return application || email; // Returns the Application object if found, otherwise the original email string
      }),
    };
  }

  function transformAllProjects(
    projects: Project[] | null,
    applications: Application[]
  ) {
    if (!projects) return;

    const transformed = projects.map((project) =>
      transformProject(project, applications)
    );
    setDetailedProjects(transformed); // Update state
  }

  return (
    <div className="w-full">
      <TabsContent value="applications">
        {/* <Button onClick={uploadHotelData}>Upload Hotel Data</Button> */}
        <div className="border border-blumine-700 text-blumine-50 w-full bg-blumine-950">
          <div className="bg-blumine-700 py-2 px-6 flex flex-row gap-6 justify-between font-semibold items-center">
            <div>Delegate Applications</div>
            <Input
              className=" max-w-[500px] !py-1"
              placeholder="Search"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
          </div>
          <div className={`${loading ? "opacity-75" : null}`}>
            {applications
              .filter((application) =>
                String(application.first_name + " " + application.last_name)
                  .toLowerCase()
                  .includes(delayedSearchFilter.toLowerCase())
              )
              .map((application, index) => (
                <ApplicationRow
                  key={index}
                  application={application}
                  project={
                    projects.find(
                      (p) => p.project_id === application.project_id
                    ) || null
                  }
                  supabase={supabase}
                  masterSettings={masterSettings}
                />
              ))}
          </div>
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
      <TabsContent value="projects" className="grid lg:grid-cols-2 gap-4">
        {detailedProjects?.map((project, index) => (
          <ProjectContainer key={index} project={project} />
        ))}
      </TabsContent>
    </div>
  );
};

export default AdminDashboard;

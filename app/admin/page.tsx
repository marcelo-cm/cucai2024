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
import FinalDelegateDetails from "./(components)/FinalDelegateList";
import HotelList from "./(components)/HotelList";

/**
 * The admin dashboard that renders the applications, projects, batches of applicants, hotel list and paid delegate list
 * @returns The admin dashboard
 */
const AdminDashboard = () => {
  const { user, supabase, applications, projects, masterSettings } = useUser();
  const [detailedProjects, setDetailedProjects] = useState<any[]>([]);
  const [searchFilter, setSearchFilter] = useState<string>("");
  const delayedSearchFilter = useDeferredValue<string>(searchFilter);
  const loading = delayedSearchFilter !== searchFilter;

  useEffect(() => {
    if (projects && applications) {
      transformAllProjects(projects, applications);
    }
  }, [projects, applications]);

  if (!user || !supabase || !applications || !masterSettings) {
    return null;
  }

  /**
   * Updates the batch status in the master settings to "Sent" and updates the ticket status of all applicants in the batch to "Accepted"
   * @param batch batch to be updated in the master settings
   * @param batchApplicants all applicants in the batch to have their ticket status updated
   * @returns
   */
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
      .update({ status: batch === "Reject" ? "Rejected" : "Accepted" })
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

  /**
   * Helper function to transformAllProjects, Transforms a project object by replacing member_emails with the application object if it's found within the list of applicants
   * @param project the project to transform
   * @param applications all applications in the database
   * @returns the transformed project with member_emails replaced with the application object, or the original email string if not found
   */
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

  /**
   * Transforms all projects in the database by replacing member_emails with the application object if it's found within the list of applicants
   * @param projects  All projects in the database
   * @param applications All applications in the database
   * @requires transformProject, which transforms a single project
   * @returns void
   */
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
    <div className="w-full overflow-scroll">
      <TabsContent value="applications">
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
                  projects={projects}
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
      <TabsContent value="final">
        <FinalDelegateDetails
          applications={applications.filter(
            (a) => a.status === "Paid" || "Checked In"
          )}
          projects={projects}
          supabase={supabase}
        />
      </TabsContent>
      <TabsContent value="hotel">
        <HotelList supabase={supabase} />
      </TabsContent>
    </div>
  );
};

export default AdminDashboard;

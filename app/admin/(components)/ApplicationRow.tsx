"use client";

import ExternalLink from "@/components/ui/external-link";
import React, { useEffect, useState } from "react";
import { SupabaseClient } from "@supabase/supabase-js";
import { getTicketDescription } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import InfoComponent from "../../dashboard/(components)/InfoComponent";

import { Nunito_Sans } from "next/font/google";
const NunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

/**
 * Contains the details of an application, and allows for the assignment of tickets and batches, as well as viewing the application details in a sheet
 * @param application application pertaining to this row
 * @param projects list of all projects in the database
 * @param supabase supabase client
 * @param masterSettings master settings as set in the database
 * @returns A row in the applications table
 */
const ApplicationRow = ({
  application,
  projects,
  supabase,
  masterSettings,
}: {
  application: Application;
  projects: Project[];
  supabase: SupabaseClient;
  masterSettings: MasterSettings;
}) => {
  const [ticketDetails, setTicketDetails] = useState<{
    [key: string]: string;
  }>({
    ticket_assigned: application.ticket_assigned,
    batch: application.batch,
  });
  const project = projects.find(
    (project) => project.project_id === application.project_id
  );

  useEffect(
    () =>
      setTicketDetails({
        ticket_assigned: application.ticket_assigned,
        batch: application.batch,
      }),
    [application]
  );

  const members =
    project &&
    project.member_names.map((name, index) => {
      return { name: name, email: project.member_emails[index] };
    });

  useEffect(() => {
    if (
      ticketDetails.ticket_assigned != application.ticket_assigned ||
      ticketDetails.batch != application.batch
    )
      handleApplicationDecision();
  }, [ticketDetails]);

  /**
   * Updates the ticket details in the database
   * @returns void
   */
  const handleApplicationDecision = async () => {
    console.log("Updating Application");

    const { data: ticketUpdateRes, error: ticketUpdateError } = await supabase
      .from("tickets")
      .update(ticketDetails)
      .eq("owner", application.user_id);

    if (ticketUpdateError) {
      console.error("Error updating ticket: ", ticketUpdateError.message);
      return null;
    }

    console.log("Updated ticket: ", ticketDetails);
  };

  return (
    <div className="flex py-4 px-6 items-center gap-2">
      <div className="flex flex-col lg:flex-row gap-2 mr-6 ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              className="w-[120px]"
              disabled={
                masterSettings[
                  `${ticketDetails.batch
                    ?.replace(" ", "_")
                    ?.toLowerCase()}` as keyof MasterSettings
                ] === "Sent"
              }
            >
              {ticketDetails.ticket_assigned || "Assign Ticket"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup
              onValueChange={(value) =>
                setTicketDetails((prev) => ({
                  ...prev,
                  ["ticket_assigned"]: value,
                }))
              }
              value={ticketDetails.ticket_assigned}
            >
              <DropdownMenuRadioItem value="Hotel">Hotel</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Conference">
                Conference
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              className="w-[120px]"
              disabled={
                masterSettings[
                  `${ticketDetails.batch
                    ?.replace(" ", "_")
                    ?.toLowerCase()}` as keyof MasterSettings
                ] === "Sent"
              }
            >
              {ticketDetails.batch || "Assign Batch"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup
              onValueChange={(value) =>
                setTicketDetails((prev) => ({
                  ...prev,
                  ["batch"]: value,
                }))
              }
              value={ticketDetails.batch}
            >
              <DropdownMenuRadioItem
                value="Batch 1"
                disabled={
                  masterSettings[`batch_1` as keyof MasterSettings] === "Sent"
                }
              >
                Batch 1
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value="Batch 2"
                disabled={
                  masterSettings[`batch_2` as keyof MasterSettings] === "Sent"
                }
              >
                Batch 2
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value="Batch 3"
                disabled={
                  masterSettings[`batch_3` as keyof MasterSettings] === "Sent"
                }
              >
                Batch 3
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value="Reject"
                disabled={
                  masterSettings[`reject` as keyof MasterSettings] === "Sent"
                }
              >
                Reject
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col leading-tight w-full">
        <ExternalLink href={application.linkedin} className="text-blumine-200">
          {application.first_name} {application.last_name}
        </ExternalLink>
        <div>{application.ethnicity}</div>
        <div>{application.gender}</div>
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
      <div className="flex flex-col leading-tight w-full">
        <div>{getTicketDescription(application.ticket_applied)}</div>
        <div>{application.student_partner}</div>
        <div>{project?.name || "None"}</div>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <div className="flex flex-col leading-tight break-keep min-w-[200px] w-[200px] text-blumine-200 underline underline-offset-2 cursor-pointer hover:opacity-70">
            View Application Details
          </div>
        </SheetTrigger>
        <SheetContent
          className={`${NunitoSans.className} text-blumine-50 text-base flex flex-col h-full`}
        >
          <SheetHeader>
            <SheetTitle>
              Application Details — {application.first_name}{" "}
              {application.last_name}
            </SheetTitle>
          </SheetHeader>
          <SheetDescription>
            <InfoComponent label="Name">
              {application?.first_name} {application?.last_name}{" "}
            </InfoComponent>
            <InfoComponent label="Email">{application?.email}</InfoComponent>
            <InfoComponent label="LinkedIn">
              <ExternalLink href={application?.linkedin || ""}>
                {application?.linkedin
                  .replace("https://", "")
                  .replace("www.", "")
                  .replace("linkedin.com", "")}
              </ExternalLink>
            </InfoComponent>
            <InfoComponent label="Gender">{application?.gender}</InfoComponent>
            <InfoComponent label="Ethnicity">
              {application?.ethnicity}
            </InfoComponent>
            <InfoComponent label="School">
              {application?.school}, {application?.grad_year}
            </InfoComponent>
            <InfoComponent label="Faculty">
              {application?.degree_type}, {application?.faculty},{" "}
              {application?.discipline}
            </InfoComponent>
            <InfoComponent label="Student Partner">
              {application?.student_partner}
            </InfoComponent>
          </SheetDescription>
          <SheetDescription className="flex flex-col gap-4">
            <div className="border border-blumine-700 text-blumine-50 w-full  bg-blumine-950">
              <div className="bg-blumine-700 py-4 px-6 flex flex-row gap-6 font-semibold">
                <div>Why CUCAI?</div>
              </div>
              <div className="px-6 py-4">{application.why_cucai}</div>
            </div>
            <div className="border border-blumine-700 text-blumine-50 w-full max-w-[1080px] bg-blumine-950">
              <div className="bg-blumine-700 py-4 px-6 flex flex-row gap-6 font-semibold">
                <div>Project</div>
                <div className="text-blumine-200">
                  ID — {project?.project_id}
                </div>
              </div>
              {project ? (
                <div className="py-4 px-6 flex flex-col">
                  <InfoComponent label="Name">{project?.name}</InfoComponent>
                  <InfoComponent label="Description">
                    {project?.description}
                  </InfoComponent>
                  {project.special_req ? (
                    <InfoComponent label="Special Requests">
                      {project.special_req}
                    </InfoComponent>
                  ) : null}
                  <InfoComponent label="Members" className="!flex-col">
                    {members &&
                      members.map((member, index) => (
                        <div
                          key={index}
                          className="flex flex-row gap-1 items-center"
                        >
                          <div>{member.name}</div>
                          <div className="w-0 md:w-fit hidden md:flex text-blumine-700 text-xs">
                            — ({member.email as string})
                          </div>
                        </div>
                      ))}
                  </InfoComponent>
                </div>
              ) : null}
            </div>
          </SheetDescription>
          <SheetFooter className="absolute bottom-4">
            <div className="flex flex-row gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    className="w-[120px]"
                    disabled={
                      masterSettings[
                        `${ticketDetails.batch
                          ?.replace(" ", "_")
                          ?.toLowerCase()}` as keyof MasterSettings
                      ] === "Sent"
                    }
                  >
                    {ticketDetails.ticket_assigned || "Assign Ticket"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuRadioGroup
                    onValueChange={(value) =>
                      setTicketDetails((prev) => ({
                        ...prev,
                        ["ticket_assigned"]: value,
                      }))
                    }
                    value={ticketDetails.ticket_assigned}
                  >
                    <DropdownMenuRadioItem value="Hotel">
                      Hotel
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Conference">
                      Conference
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    className="w-[120px]"
                    disabled={
                      masterSettings[
                        `${ticketDetails.batch
                          ?.replace(" ", "_")
                          ?.toLowerCase()}` as keyof MasterSettings
                      ] === "Sent"
                    }
                  >
                    {ticketDetails.batch || "Assign Batch"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuRadioGroup
                    onValueChange={(value) =>
                      setTicketDetails((prev) => ({
                        ...prev,
                        ["batch"]: value,
                      }))
                    }
                    value={ticketDetails.batch}
                  >
                    <DropdownMenuRadioItem
                      value="Batch 1"
                      disabled={
                        masterSettings[`batch_1` as keyof MasterSettings] ===
                        "Sent"
                      }
                    >
                      Batch 1
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      value="Batch 2"
                      disabled={
                        masterSettings[`batch_2` as keyof MasterSettings] ===
                        "Sent"
                      }
                    >
                      Batch 2
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      value="Batch 3"
                      disabled={
                        masterSettings[`batch_3` as keyof MasterSettings] ===
                        "Sent"
                      }
                    >
                      Batch 3
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      value="Reject"
                      disabled={
                        masterSettings[`reject` as keyof MasterSettings] ===
                        "Sent"
                      }
                    >
                      Reject
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ApplicationRow;

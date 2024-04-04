"use client";

import ExternalLink from "@/components/ui/external-link";
import React, { useEffect, useState } from "react";
import { SupabaseClient } from "@supabase/supabase-js";
import { getTicketDescription } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const ApplicationRow = ({
  application,
  supabase,
}: {
  application: Application;
  supabase: SupabaseClient;
}) => {
  if (!application) {
    return null;
  }

  const [project, setProject] = useState<Project | null>(null);

  const fetchProject = async () => {
    const { data: projectRes, error: projectError } = await supabase
      .from("projects")
      .select("*")
      .eq("project_id", application.project_id)
      .single();

    if (projectError) {
      console.error(projectError);
      return;
    }

    console.log(projectRes);
    setProject(projectRes);
  };

  useEffect(() => {
    if (application.project_id) {
      fetchProject();
    }
  }, []);

  return (
    <div className="flex py-4 px-6 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="mr-2">
          <Button variant="secondary">Ticket</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup>
            <DropdownMenuRadioItem value="1">Hotel</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="2">Conference</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="mr-8">
          <Button variant="secondary">Decision</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup>
            <DropdownMenuRadioItem value="1">Batch 1</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="2">Batch 2</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="3">Batch 3</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="0">Reject</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

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
      <div className="flex flex-col leading-tight break-keep min-w-[200px] w-[200px] text-blumine-200 underline underline-offset-2">
        View Application Details
      </div>
    </div>
  );
};

export default ApplicationRow;

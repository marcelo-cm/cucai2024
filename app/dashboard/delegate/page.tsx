"use client";

import React, { useEffect, useState } from "react";
import DashboardTemplate, { useUser } from "../template";
import TicketInfo from "./(components)/TicketInfo";
import ProfileInfo from "./(components)/ProfileInfo";
import ProjectInfo from "./(components)/ProjectInfo";
import ImportantResources from "./(components)/ImportantResources";
import { createClient } from "@/lib/supabase/client";

const DelegateDashboard = () => {
  const { user, supabase } = useUser();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    if (user) {
      fetchProject();
    }
  }, [user]);

  const fetchProject = async () => {
    const { data: projectIDRes, error: projectIDError } = await supabase
      .from("delegates")
      .select("project_id")
      .eq("user_id", user?.id)
      .single();

    if (projectIDError) {
      console.error(projectIDError);
      return;
    }

    console.log(projectIDRes);

    const { data: projectRes, error: projectError } = await supabase
      .from("projects")
      .select("*")
      .eq("project_id", projectIDRes?.project_id)
      .single();

    if (projectError) {
      console.error(projectError);
      return;
    }

    console.log(projectRes);

    setProject(projectRes);
  };

  if (user === null) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 w-full items-center h-full">
      <div className="border border-blumine-700 w-full max-w-[1080px] h-[500px]">
        Graphic Here
      </div>
      <ProfileInfo user={user} supabase={supabase} />
      <TicketInfo user={user} supabase={supabase} />
      {project ? <ProjectInfo project={project} /> : null}
      <ImportantResources />
    </div>
  );
};

export default DelegateDashboard;

"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "./template";
import TicketInfo from "./(components)/TicketInfo";
import ProfileInfo from "./(components)/ProfileInfo";
import ProjectInfo from "./(components)/ProjectInfo";
import ImportantResources from "./(components)/ImportantResources";

/**
 * The delegate dashboard that renders the profile, ticket, project and important resources information
 * @returns The delegate dashboard
 */
const DelegateDashboard = () => {
  const { user, ticket, supabase } = useUser();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchProject();
    }
  }, [user]);

  if (user === null) {
    return null;
  }

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
    setProject(projectRes);
  };

  return (
    <div className="flex flex-col gap-4 w-full items-center h-full">
      <div className="border border-blumine-700 w-full max-w-[1080px] h-[500px]">
        Graphic Here
      </div>
      <ProfileInfo user={user} supabase={supabase} />
      <TicketInfo ticket={ticket} />
      {project ? <ProjectInfo project={project} /> : null}
      <ImportantResources />
    </div>
  );
};

export default DelegateDashboard;

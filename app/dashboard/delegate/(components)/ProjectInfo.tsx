import { SupabaseClient, User } from "@supabase/supabase-js";
import React from "react";
import InfoComponent from "./InfoComponent";

const ProjectInfo = ({ project }: { project: Project }) => {
  const members = project.member_names.map((name, index) => {
    return { name: name, email: project.member_emails[index] };
  });

  return (
    <div className="border border-blumine-700 text-blumine-50 w-full max-w-[1080px] bg-blumine-950">
      <div className="bg-blumine-700 py-4 px-6 flex flex-row gap-6 font-semibold">
        <div>Project</div>
        <div className="text-blumine-200">ID — {project?.project_id}</div>
      </div>
      <div className="py-4 px-6 flex flex-col lg:flex-row lg:gap-8">
        <div className="flex flex-col w-1/2">
          <InfoComponent label="Name">{project?.name}</InfoComponent>
          <InfoComponent label="Description">
            {project?.description}
          </InfoComponent>
          {project.special_req ? (
            <InfoComponent label="Special Requests">
              {project.special_req}
            </InfoComponent>
          ) : null}
        </div>
        <div className="flex flex-col lg:w-1/2">
          <InfoComponent label="Members">
            {members.map((member, index) => (
              <div key={index} className="flex flex-ol gap-1 items-center">
                <div>{member.name}</div>
                <div className="w-0 md:w-fit hidden md:flex text-blumine-700 text-xs">
                  — ({member.email})
                </div>
              </div>
            ))}
          </InfoComponent>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;

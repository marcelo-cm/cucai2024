import React from "react";
import ProjectMemberRow from "./ProjectMemberRow";

/**
 * Container for a project, displaying the name, description, special requests, and members
 * @param project The project to display
 * @returns A component that displays the project
 */
const ProjectContainer = ({ project }: { project: Project }) => {
  return (
    <div className="border border-2 border-blumine-700">
      <div className="bg-blumine-700 py-2 px-6 flex flex-row gap-6 font-semibold items-center justify-between">
        {project.name}
      </div>
      <div className="py-4 px-6 flex flex-col gap-4 bg-blumine-950">
        <div>Description: {project.description}</div>
        {project.special_req ? (
          <div>Special Requests: {project.special_req}</div>
        ) : null}
        <div>
          {project.member_emails.map((member: string | Application, index) => (
            <div key={index}>
              {typeof member == "string" ? (
                member
              ) : (
                <ProjectMemberRow member={member} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectContainer;

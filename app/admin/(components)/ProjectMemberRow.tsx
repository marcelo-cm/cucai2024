import React from "react";

/**
 * @param member Member of the project to display
 * @returns A component that displays a row for a member of a project
 */
const ProjectMemberRow = ({ member }: { member: Application }) => {
  return (
    <div className="flex flex-row gap-1 items-center">
      <div>{member.first_name + " " + member.last_name}</div>
      <div className="w-0 md:w-fit hidden md:flex text-blumine-700 text-xs">
        — ({member.email as string})
      </div>
      <div
        className={`rounded-full text-xs w-fit h-fit px-3 py-1 ${
          member.status === "Paid"
            ? "bg-jewel-700 text-jewel-100"
            : member.status === "Rejected"
            ? "bg-sangria-900 text-sangria-100"
            : member.status === "Accepted"
            ? "bg-blumine-700 text-blumine-200"
            : "bg-blumine-800 text-blumine-400"
        }`}
      >
        {member.status}
      </div>
    </div>
  );
};

export default ProjectMemberRow;

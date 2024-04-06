import React from "react";

const BatchTableRow = ({ application }: { application: Application }) => {
  return (
    <div className="flex flex-row gap-1 items-center py-4 px-6 justify-between">
      <div className="flex flex-row gap-1 items-center">
        <div>
          {application.first_name} {application.last_name}
        </div>
        <div className="w-0 md:w-fit hidden md:flex text-blumine-700 text-xs">
          — ({application.email})
        </div>
      </div>
      <div>{application.ticket_assigned}</div>
    </div>
  );
};

export default BatchTableRow;

import React from "react";

/**
 * A row in the Batch table that displays the name & email of the applicant and the ticket they were assigned
 * @param application The application to display
 * @returns A row in the Batch table
 */
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

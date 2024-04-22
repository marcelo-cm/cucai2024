import React from "react";

/**
 * @param applications All applications in the database
 * @returns A component that displays the total number of applications sent and pending for both hotel and conference tickets
 */
const ApplicationStatistics = ({
  applications,
}: {
  applications: Application[];
}) => {
  return (
    <div className="bg-blumine-700 py-1 px-6 flex flex-row justify-between font-semibold">
      <div className="bg-blumine-700 py-2 px-6 flex flex-row gap-8 font-semibold items-center">
        <div>Total Sent</div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-row gap-2 items-center">
            T
            <div className="text-xs bg-blumine-950 w-5 h-5 flex items-center justify-center leading-none">
              {applications.filter((app) => app.status === "Accepted").length}
            </div>
          </div>
          <p className="text-blumine-400">—</p>
          <div className="flex flex-row gap-2 items-center">
            H{" "}
            <div className="text-xs bg-blumine-950 w-5 h-5 flex items-center justify-center leading-none">
              {
                applications.filter(
                  (app) =>
                    app.status === "Accepted" && app.ticket_assigned === "Hotel"
                ).length
              }
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center">
            C{" "}
            <div className="text-xs bg-blumine-950 w-5 h-5 flex items-center justify-center leading-none">
              {
                applications.filter(
                  (app) =>
                    app.status === "Accepted" &&
                    app.ticket_assigned === "Conference"
                ).length
              }
            </div>
          </div>
        </div>
      </div>
      <div className="bg-blumine-700 py-2 px-6 flex flex-row gap-8 font-semibold items-center">
        <div>Total Pending</div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-row gap-2 items-center">
            T{" "}
            <div className="text-xs bg-blumine-950 w-5 h-5 flex items-center justify-center leading-none">
              {
                applications.filter(
                  (app) =>
                    app.status !== "Accepted" && app.status !== "Rejected"
                ).length
              }
            </div>
          </div>
          <p className="text-blumine-400">—</p>
          <div className="flex flex-row gap-2 items-center">
            H{" "}
            <div className="text-xs bg-blumine-950 w-5 h-5 flex items-center justify-center leading-none">
              {
                applications.filter(
                  (app) =>
                    app.status !== "Accepted" &&
                    app.status !== "Rejected" &&
                    app.ticket_assigned === "Hotel"
                ).length
              }
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center">
            C{" "}
            <div className="text-xs bg-blumine-950 w-5 h-5 flex items-center justify-center leading-none">
              {
                applications.filter(
                  (app) =>
                    app.status !== "Accepted" &&
                    app.status !== "Rejected" &&
                    app.ticket_assigned === "Conference"
                ).length
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatistics;

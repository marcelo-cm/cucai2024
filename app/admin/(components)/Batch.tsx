"use client";

import React from "react";
import BatchTableRow from "./BatchTableRow";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Nunito_Sans } from "next/font/google";
const NunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

/**
 * Container for all applications in a given batch, with the ability to send the batch and copy all emails to the clipboard
 * @param label The name of the batch
 * @param applications All applications in the database
 * @param status The status of the batch
 * @param updateStatus A function to update the status of the batch
 * @returns A component that displays the applications in a batch
 */
const Batch = ({
  label,
  applications,
  status,
  updateStatus,
}: {
  label: string;
  applications: Application[];
  status: string;
  updateStatus: Function;
}) => {
  const batchApplications = applications.filter((app) => app.batch === label);

  /**
   * Copies all emails in the batch to the clipboard in a comma-separated string
   */
  const copyEmailsToClipboard = async () => {
    const emailsString = batchApplications.map((app) => app.email).join(", ");
    try {
      await navigator.clipboard.writeText(emailsString);
      alert("Emails copied to clipboard!");
    } catch (err) {
      console.error("Error copying emails to clipboard", err);
    }
  };

  return (
    <div className="border border-blumine-700 text-blumine-50 bg-blumine-950 flex flex-col justify-between static">
      <div className="bg-blumine-700 py-2 px-6 flex flex-row gap-6 font-semibold items-center justify-between">
        <div>{label}</div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              disabled={status === "Sent"}
              className="text-xs bg-blumine-950 w-fit py-2 px-2 flex items-center justify-center leading-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status}
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent
            className={`${NunitoSans.className} text-blumine-50 flex flex-col gap-4 h-fit bg-blumine-800 p-8 text-blumine-50 border-0 !rounded-none`}
          >
            <AlertDialogTitle className="text-blumine-50 text-2xl">
              Send {label} Batch?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-blumine-50">
              Are you sure you want to send the {label} batch? This action is
              irreversible.
            </AlertDialogDescription>
            <AlertDialogAction asChild>
              <Button
                onClick={() =>
                  updateStatus(
                    label.replace(" ", "_").toLowerCase(),
                    batchApplications
                  )
                }
              >
                Yes, let's ship!
              </Button>
            </AlertDialogAction>
            <AlertDialogCancel asChild>
              <Button
                variant={"secondary"}
                className="bg-blumine-950 border-2 border-blumine-900 text-blumine-50 font-semibold hover:bg-blumine-950/60"
              >
                Cancel
              </Button>
            </AlertDialogCancel>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      {batchApplications.map((application, index) => (
        <BatchTableRow key={index} application={application} />
      ))}
      <div className="bg-blumine-700 py-2 px-6 flex flex-row justify-between font-semibold">
        <div className="flex flex-row gap-4">
          <div className="flex flex-row gap-2 items-center">
            T{" "}
            <div className="text-xs bg-blumine-950 w-5 h-5 flex items-center justify-center leading-none">
              {batchApplications.length}
            </div>
          </div>
          <p className="text-blumine-400">—</p>
          <div className="flex flex-row gap-2 items-center">
            H{" "}
            <div className="text-xs bg-blumine-950 w-5 h-5 flex items-center justify-center leading-none">
              {
                batchApplications.filter(
                  (app) => app.ticket_assigned === "Hotel"
                ).length
              }
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center">
            C{" "}
            <div className="text-xs bg-blumine-950 w-5 h-5 flex items-center justify-center leading-none">
              {
                batchApplications.filter(
                  (app) => app.ticket_assigned === "Conference"
                ).length
              }
            </div>
          </div>
        </div>
        <div
          className="bg-blumine-700 px-2 py-1 underline underline-offset-2 text-blumine-200 hover:opacity-80 cursor-pointer"
          onClick={copyEmailsToClipboard}
        >
          Copy Emails
        </div>
      </div>
    </div>
  );
};

export default Batch;

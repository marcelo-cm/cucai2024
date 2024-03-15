"use client";

import React from "react";
import ProfileInformation from "./ProfileInformation";
import ProjectApplication from "./ProjectApplication";
import ThankYou from "./ThankYou";
import useFormContext from "@/app/apply/hooks/useFormContext";
import { Nunito_Sans } from "next/font/google";
import { Button } from "@/components/ui/button";
import ConferenceApplication from "./ConferenceApplication";

const NunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const ApplicationForm = () => {
  const context = useFormContext();

  if (!context) {
    throw new Error("ApplicationForm must be used within an ApplyFormProvider");
  }

  const {
    title,
    states: { page, canNext, canSubmit },
    data,
    functions: { handleChange, nextPage, prevPage, handleSubmit },
  } = context;

  const activePage: any = {
    0: <ProfileInformation />,
    1: <ConferenceApplication />,
    2: <ProjectApplication />,
    3: <ThankYou />,
  };

  const progress = Math.min(((page + 1) / (data.project ? 4 : 3)) * 100, 100);

  return (
    <div
      className={`${NunitoSans.className} flex flex-col gap-4 w-full sm:w-1/2 sm:max-w-[560px] sm:min-w-[400px] h-fit bg-blumine-800 p-12 text-blumine-50`}
    >
      <div className={`h-4 bg-[#32404D]`}>
        <div
          className="h-full bg-blumine-200 transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="font-bold text-2xl">{title[page]}</p>
      {activePage[page]}
      <div className="flex flex-row gap-4">
        {page > 0 && page < 3 ? (
          <Button
            className="w-full h-10"
            onClick={() => prevPage()}
            id="Previous"
          >
            Previous
          </Button>
        ) : null}
        {page === 0 || (data.project && page < 2) ? (
          <Button
            disabled={!canNext}
            className="w-full h-10"
            onClick={() => nextPage()}
            id="Next"
          >
            Next
          </Button>
        ) : null}
        {(!data.project && page == 1) || page == 2 ? (
          <Button
            disabled={!canSubmit}
            className="w-full h-10"
            onClick={handleSubmit}
            id="Apply"
          >
            Apply
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default ApplicationForm;

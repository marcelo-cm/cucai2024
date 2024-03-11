import React from "react";
import ProfileInformation from "./ProfileInformation";
import ProjectApplication from "./ProjectApplication";
import ThankYou from "./ThankYou";
import useFormContext from "@/app/hooks/useFormContext";
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
    throw new Error("useApplyForm must be used within an ApplyFormProvider");
  }

  const {
    title,
    page,
    data,
    setData,
    canSubmit,
    handleChange,
    nextPage,
    prevPage,
  } = context;

  const activePage: any = {
    0: <ProfileInformation />,
    1: <ConferenceApplication />,
    2: <ProjectApplication />,
    3: <ThankYou />,
  };

  return (
    <div
      className={`${NunitoSans.className} flex flex-col gap-4 w-1/3 h-fit bg-blumine-800 p-12 text-blumine-50`}
    >
      <div className="h-6 w-full bg-[#32404D]"></div>
      <p className="font-bold text-2xl">{title[page]}</p>
      {activePage[page]}
      {/* Nav Buttons */}
      <div className="flex flex-row gap-4">
        <Button className="w-1/2 h-10" onClick={() => prevPage()}>
          Previous
        </Button>
        <Button className="w-1/2 h-10" onClick={() => nextPage()}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default ApplicationForm;

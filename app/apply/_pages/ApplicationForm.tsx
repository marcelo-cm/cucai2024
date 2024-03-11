import React, { useContext } from "react";
import ConferenceApplication from "./ConferenceApplication";
import ProjectApplication from "./ProjectApplication";
import ThankYou from "./ThankYou";
import ApplyFormContext from "@/app/context/ApplyFormContext";

const ApplicationForm = () => {
  const context = useContext(ApplyFormContext);

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
    0: <ConferenceApplication />,
    1: <ProjectApplication />,
    2: <ThankYou />,
  };

  return (
    <div>
      <button onClick={() => nextPage()}>Next</button>
      <button onClick={() => prevPage()}>Previous</button>
      {activePage[page]}
    </div>
  );
};

export default ApplicationForm;

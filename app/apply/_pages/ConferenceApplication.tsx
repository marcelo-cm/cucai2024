"use client";

import ApplyFormContext from "@/app/context/ApplyFormContext";
import React, { useContext } from "react";

const ConferenceApplication = () => {
  const context = useContext(ApplyFormContext);

  if (!context) {
    throw new Error("useApplyForm must be used within an ApplyFormProvider");
  }

  const { title, page, data, setData, canSubmit, handleChange } = context;

  return (
    <div className="text-black">
      <input
        type="text"
        name="name"
        value={data.name}
        onChange={handleChange}
        placeholder="Name"
      />
    </div>
  );
};

export default ConferenceApplication;

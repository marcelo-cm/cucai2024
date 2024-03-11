"use client";

import React, { use, useEffect } from "react";
import { ApplyFormProvider } from "../context/ApplyFormContext";
import ApplicationForm from "./_pages/ApplicationForm";

function ApplyPage() {
  return (
    <ApplyFormProvider>
      <div className="w-full h-full flex flex-col p-16 items-center">
        <ApplicationForm />
      </div>
    </ApplyFormProvider>
  );
}

export default ApplyPage;

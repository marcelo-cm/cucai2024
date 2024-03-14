"use client";

import React, { use, useEffect } from "react";
import { ApplyFormProvider } from "../context/ApplyFormContext";
import ApplicationForm from "./_pages/ApplicationForm";
import { BackgroundBeams } from "@/components/ui/background-beams";

function ApplyPage() {
  return (
    <ApplyFormProvider>
      <div className="w-full h-full flex flex-col py-16 px-4 items-center overflow-y-scroll no-scrollbar">
        <ApplicationForm />
      </div>
    </ApplyFormProvider>
  );
}

export default ApplyPage;

"use client";

import React, { use, useEffect } from "react";
import { ApplyFormProvider } from "../context/ApplyFormContext";
import ApplicationForm from "./_pages/ApplicationForm";

function ApplyPage() {
  return (
    <ApplyFormProvider>
      <ApplicationForm />
    </ApplyFormProvider>
  );
}

export default ApplyPage;

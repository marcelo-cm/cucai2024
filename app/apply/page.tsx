"use client";
import React, { use, useEffect, useState } from "react";
import { ApplyFormProvider } from "./context/ApplyFormContext";
import ApplicationForm from "./form/ApplicationForm";
import { createClient } from "@/lib/supabase/client";
import SignUpPopUp from "@/components/molecules/SignUpPopUp";

/**
 * The page for the application form
 * @returns The application form page
 */
const ApplyPage = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const supabase = createClient();

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.log("No user found");
      setLoggedIn(false);
    } else {
      console.log("User found");
      setLoggedIn(true);
    }
  };

  useEffect(() => {
    checkUser();
  }, [loggedIn]);

  return (
    <ApplyFormProvider>
      <div className=" w-full h-full flex flex-col py-16 px-4 items-center overflow-y-scroll no-scrollbar">
        <SignUpPopUp open={!loggedIn} handleSubmit={() => checkUser()} />
        <ApplicationForm />
      </div>
    </ApplyFormProvider>
  );
};

export default ApplyPage;

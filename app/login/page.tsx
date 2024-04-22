"use client";

import React, { useState } from "react";

import FormGenerator from "@/components/generators/FormGenerator";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

import { Nunito_Sans } from "next/font/google";
const NunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const LogIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const supabase = createClient();
  const [logInInfo, setLogInInfo] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();

    const { data: logInRes, error: logInError } =
      await supabase.auth.signInWithPassword(logInInfo);

    if (logInError) {
      setLoading(false);
      setError(true);
      console.error(logInError);
    } else {
      window.location.href = "/dashboard";
    }
  };

  const handleChange = (e: any) => {
    setLogInInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const formFields = [
    {
      label: "Email",
      name: "email",
      placeholder: "support@cucai.ca",
      type: "text",
    },
    {
      label: "Password",
      name: "password",
      placeholder: "pswd123!",
      type: "text",
    },
  ];

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div
        className={`flex flex-col gap-4 w-full sm:w-1/2 sm:max-w-[560px] sm:min-w-[400px] h-fit bg-blumine-800 p-12 text-blumine-50 ${NunitoSans.className}`}
      >
        <h1 className="font-bold text-2xl">Log In</h1>
        <div>
          Welcome to the CUCAI 2025 platform! Please sign in to see your profile
          details (ticket status, project team information, important
          resources)! If you haven't made an account, please{" "}
          <a href="/apply" className="text-blumine-200 underline">
            apply here!
          </a>
        </div>
        <FormGenerator
          formFields={formFields}
          data={logInInfo}
          handleChange={handleChange}
        />
        {error && (
          <div className="text-red-500">There was an error logging in...</div>
        )}
        <Button onClick={(e) => handleSubmit(e)} disabled={loading}>
          Log In
        </Button>
      </div>
    </div>
  );
};

export default LogIn;

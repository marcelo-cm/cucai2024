"use client";

import useFormContext from "@/app/apply/hooks/useFormContext";
import React from "react";
import FormGenerator from "../../../components/generators/FormGeneratorContext";

const ConferenceApplication = () => {
  const context = useFormContext();

  if (!context) {
    throw new Error(
      "ConferenceApplication must be used within an ApplyFormProvider"
    );
  }

  const {
    title,
    states: { page, canNext, canSubmit },
    data,
    functions: { handleChange, nextPage, prevPage },
  } = context;

  const formFields: { [key: string]: string | string[] }[] = [
    {
      label: "What ticket are you applying for?",
      name: "ticket_applied",
      type: "dropdown",
      options: ["Conference Ticket ($100)", "Conference + Hotel Ticket ($225)"],
    },
    {
      label:
        "If you are applying for a hotel, can you attend the conference without a hotel?",
      name: "consider_no_hotel",
      type: "checkbox",
    },
    {
      label: "LinkedIn Profile",
      name: "linkedin",
      type: "text",
      placeholder: "linkedin.com/in/your-profile",
    },
    {
      label:
        "Why is it important that you attend CUCAI 2025? (150 words or less)",
      name: "why_cucai",
      type: "long_text",
      placeholder: "I want to attend CUCAI 2025 because...",
    },
    {
      label: "Are you a part of a Student Partner Organization? If so, which?",
      name: "student_partner",
      type: "dropdown",
      options: [
        "None",
        "Engineering Society Software Development (ESSDEV)",
        "hopAI",
        "McMaster AI (MacAI)",
        "McGill AI (MAIS)",
        "QMIND",
        "Université de Montreal AI (UdeM AI)",
        "University of Toronto AI (UofT AI)",
        "University of Toronto Machine Intelligence Student Team (UTMIST)",
        "University of Vic AI (UVic AI)",
        "WAT.ai",
        "Wester Cyber Society (WCS)",
        "Western AI (WAI)",
      ],
    },
    {
      label: "Are you interested in submitting a project?",
      name: "project",
      type: "checkbox",
    },
  ];

  return <FormGenerator formFields={formFields} />;
};

export default ConferenceApplication;

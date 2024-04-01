"use client";

import useFormContext from "@/app/apply/hooks/useFormContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import FormGenerator from "../../../components/generators/FormGenerator";
import Image from "next/image";

const ProfileInformation = () => {
  const context = useFormContext();

  if (!context) {
    throw new Error(
      "ProfileInformation must be used within an ApplyFormProvider"
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
      label: "First Name",
      name: "first_name",
      type: "text",
      placeholder: "Marcelo",
    },
    {
      label: "Last Name",
      name: "last_name",
      type: "text",
      placeholder: "Chaman Mallqui",
    },
    {
      label: "Self-Identified Gender",
      name: "gender",
      type: "dropdown",
      options: [
        "Male",
        "Female",
        "Non-Binary",
        "Gender Fluid",
        "Other",
        "Prefer Not To Answer",
      ],
    },
    {
      label: "Ethnicity",
      name: "ethnicity",
      type: "dropdown",
      options: [
        "White",
        "American Indian",
        "Alaska Native",
        "Black or African American",
        "Hispanic or Latino/Latina",
        "Native Hawaiian or Other Pacific Islander",
        "Two or More Races",
        "Other",
        "Prefer Not To Answer",
      ],
    },
    {
      label: "School",
      name: "school",
      type: "dropdown",
      options: [
        "Carleton University",
        "École Polytechnique de Montréal",
        "LaSalle College",
        "McGill University",
        "McMaster University",
        "Queen's University",
        "Ryerson University",
        "Université de Montréal",
        "University of Calgary",
        "University of Guelph",
        "University of Ontario Institute of Technology",
        "University of Ottawa",
        "University of Toronto",
        "University of Victoria",
        "University of Waterloo",
        "University of Western Ontario",
        "Wilfrid Laurier University",
        "York University",
        "Other",
      ],
    },
    {
      label: "Graduation Year",
      name: "grad_year",
      type: "dropdown",
      options: ["2025", "2026", "2027", "2028", "2029"],
    },
    {
      label: "Type of Degree",
      name: "degree_type",
      type: "dropdown",
      options: [
        "High School",
        "Undergraduate",
        "Masters",
        "PhD",
        "Certificate",
        "Other",
      ],
    },
    {
      label: "Faculty",
      name: "faculty",
      type: "dropdown",
      options: [
        "Arts and Humanities",
        "Science",
        "Engineering",
        "Medicine",
        "Business",
        "Law",
        "Education",
        "Social Sciences",
        "Health Sciences",
        "Agriculture",
        "Environmental Sciences",
        "Architecture",
        "Computer Science",
        "Nursing",
        "Pharmacy",
        "Dentistry",
        "Public Health",
        "Veterinary Medicine",
        "Information Technology",
        "Fine Arts",
        "Music",
        "Physical Education",
        "Tourism and Hospitality",
      ],
    },
    {
      label: "Discipline",
      name: "discipline",
      type: "text",
      placeholder: "Computer Engineering",
    },
  ];

  return (
    <div className="text-blumine-50 flex flex-col gap-2">
      <p className="text-sm mb-2">
        Welcome to the application for CUCAI 2025! We're pumped that you want to
        be a part of of the largest and most impactful events for undergraduates
        across Canada. Why do we say that? Well, take a look at the CUCAI 2024
        by the numbers:
      </p>
      <Image
        src="/cucai-2024-by-the-numbers.png"
        width={500}
        height={500}
        className="rounded-xl border-2 border-blumine-300 w-full h-auto mb-1"
        alt="340 Attendees. 11 Speakers. 70 Projects. 19 Schools."
      />
      <p className="text-sm mb-2">
        Tickets are limited and we want to make sure that we're bringing in the
        best of the best. Please fill out the form below to apply for a ticket
        to CUCAI 2025. If you have any questions, please reach out to us at
        support@cucai.ca.
      </p>
      <FormGenerator formFields={formFields} />
    </div>
  );
};

export default ProfileInformation;

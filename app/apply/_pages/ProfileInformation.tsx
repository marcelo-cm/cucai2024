"use client";

import useFormContext from "@/app/hooks/useFormContext";
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
import FormGenerator from "./FormGenerator";

type Checked = DropdownMenuCheckboxItemProps["checked"];

const ProfileInformation = () => {
  const context = useFormContext();

  if (!context) {
    throw new Error("useApplyForm must be used within an ApplyFormProvider");
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
      label: "E-mail",
      name: "email",
      type: "text",
      placeholder: "support@cucai.ca",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "CUCAIFTW!1",
    },
    {
      label: "Confirm Password",
      name: "confirm_password",
      type: "password",
      placeholder: "CUCAIFTW!1",
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
        "Queen’s University",
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

  return <FormGenerator formFields={formFields} />;
};

export default ProfileInformation;

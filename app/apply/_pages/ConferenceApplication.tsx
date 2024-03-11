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

const ConferenceApplication = () => {
  const context = useFormContext();

  if (!context) {
    throw new Error("useApplyForm must be used within an ApplyFormProvider");
  }

  const { title, page, data, setData, canSubmit, handleChange } = context;
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
      label: "Resume",
      name: "resume",
      type: "file",
      placeholder: "Upload your resume",
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
      name: "why_cucai",
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

  return (
    <div className="text-blumine-50 flex flex-col gap-2">
      {formFields.map((field, k) =>
        field.type === "dropdown" ? (
          <div key={k}>
            <Label htmlFor={field.name.toString()}>{field.label}</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="w-full">
                  {data[field.name as keyof typeof data] || "Select"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup
                  value={data[field.name as keyof typeof data]}
                  onValueChange={(value) =>
                    handleChange({
                      target: {
                        type: "checkbox",
                        name: field.name,
                        value: value,
                      },
                    })
                  }
                >
                  {Array.isArray(field.options) &&
                    field.options.map((option) => (
                      <DropdownMenuRadioItem key={option} value={option}>
                        {option}
                      </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : field.type === "checkbox" ? (
          <div className="flex items-center justify-between pr-2" key={k}>
            <Label htmlFor={field.name.toString()}>{field.label}</Label>
            <Checkbox
              onCheckedChange={() =>
                handleChange({
                  target: {
                    type: "checkbox",
                    name: field.name,
                    value: !data[field.name as keyof typeof data],
                  },
                })
              }
              name={field.name.toString()}
            />
          </div>
        ) : field.type === "long_text" ? (
          <div>
            <Label htmlFor={field.name.toString()}>{field.label}</Label>
            <Textarea
              onChange={handleChange}
              name={field.name.toString()}
              placeholder={field.placeholder.toString()}
            />
            <p className="text-xs flex justify-end mt-1">
              Word Count:{" "}
              {data[field.name as keyof typeof data].split(" ").length - 1}
            </p>
          </div>
        ) : (
          <div key={k}>
            <Label htmlFor={field.name.toString()}>{field.label}</Label>
            <Input
              onChange={handleChange}
              name={field.name.toString()}
              type={field.type.toString()}
              placeholder={field.placeholder.toString()}
            />
          </div>
        )
      )}
    </div>
  );
};

export default ConferenceApplication;

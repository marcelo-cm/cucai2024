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
import React, { use, useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon } from "lucide-react";
import FormGenerator from "./FormGenerator";

const ProjectApplication = () => {
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

  const formFields: { [key: string]: string | string[] | boolean }[] = [
    {
      label:
        "If someone has already applied with this project, please enter their email address here.",
      name: "project_id",
      type: "text",
      placeholder: "CU-123456",
    },
    {
      label: "Project Name",
      name: "project_name",
      type: "text",
      placeholder: "Project Name",
      disabled: data["project_id"] ? true : false,
    },
    {
      label: "Project Description",
      name: "project_description",
      type: "long_text",
      placeholder: "My project uses X to do Y. It will help Z.",
      disabled: data["project_id"] ? true : false,
    },
    {
      label: "Special Presentation Needs",
      name: "project_needs",
      type: "long_text",
      placeholder:
        "To present my project effectively I need an outlet near me...",
      disabled: data["project_id"] ? true : false,
    },
  ];

  const [projectMembers, setProjectMembers] = useState<{
    [key: string]: { [key: string]: string };
  }>(data["project_members"]);

  const addProjectMember = () => {
    const currentMemberCount = Object.keys(projectMembers).length;
    const nextMemberNumber = currentMemberCount + 1;

    if (nextMemberNumber <= 6) {
      const newMemberKey = `member_${nextMemberNumber}`;
      setProjectMembers({
        ...projectMembers,
        [newMemberKey]: { name: "", email: "" },
      });
    } else {
      console.log("Cannot add more than 6 project members.");
    }
  };

  const handleTeamChange = (e: any, memberKey: string) => {
    const { name, value } = e.target; // `name` will be either 'name' or 'email'
    setProjectMembers((prevState) => ({
      ...prevState,
      [memberKey]: {
        ...prevState[memberKey],
        [name]: value,
      },
    }));
  };

  useEffect(() => {
    handleChange({
      target: { name: "project_members", value: projectMembers },
    });
  }, [projectMembers]);

  return (
    <div className="text-blumine-50 flex flex-col gap-2">
      <FormGenerator formFields={formFields} />
      <div className="flex items-center justify-between pr-2">
        <Label htmlFor="project_team">Does your project have a team?</Label>
        <Checkbox
          onCheckedChange={() => {
            handleChange({
              target: {
                type: "checkbox",
                name: "project_team",
                value: !data["project_team"],
              },
            });
            setProjectMembers({ member_1: { name: "", email: "" } });
          }}
          name={"project_team"}
          checked={data["project_team"]}
          disabled={data["project_id"] ? true : false}
        />
      </div>
      {data.project_team ? (
        <div className="flex flex-col gap-2">
          {Object.entries(projectMembers).map(([memberKey, member], k) => (
            <div key={k} className="flex flex-row gap-2">
              <Input
                placeholder={`Member ${k + 1} Name`}
                name="name"
                type="text"
                value={projectMembers[memberKey].name}
                onChange={(e) => handleTeamChange(e, memberKey)}
              />
              <Input
                placeholder={`Member ${k + 1} Email`}
                name="email"
                type="email"
                value={projectMembers[memberKey].email}
                onChange={(e) => handleTeamChange(e, memberKey)}
              />
            </div>
          ))}
          {Object.keys(projectMembers).length < 6 ? (
            <Button
              className="flex w-fit self-center"
              onClick={addProjectMember}
            >
              <PlusIcon className="h-4" />
            </Button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default ProjectApplication;

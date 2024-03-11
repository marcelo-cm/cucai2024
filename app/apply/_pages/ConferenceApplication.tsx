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
import { ChevronDown, ChevronUp } from "lucide-react";

type Checked = DropdownMenuCheckboxItemProps["checked"];

const ConferenceApplication = () => {
  const context = useFormContext();

  if (!context) {
    throw new Error("useApplyForm must be used within an ApplyFormProvider");
  }

  const { title, page, data, setData, canSubmit, handleChange } = context;

  return (
    <div className="text-blumine-50 flex flex-col gap-2">
      <div>
        <Label htmlFor="first_name">First Name</Label>
        <Input
          onChange={handleChange}
          name="first_name"
          type="text"
          placeholder="Marcelo"
        />
      </div>
      <div>
        <Label htmlFor="last_name">Last Name</Label>
        <Input
          onChange={handleChange}
          name="last_name"
          type="text"
          placeholder="Chaman Mallqui"
        />
      </div>
      <div>
        <Label htmlFor="email">E-mail</Label>
        <Input
          onChange={handleChange}
          type="text"
          name="email"
          placeholder="support@cucai.ca"
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="CUCAIFTW!1"
        />
      </div>
      <div>
        <Label htmlFor="confirm_password">Confirm Password</Label>
        <Input
          onChange={handleChange}
          type="password"
          name="confirm_password"
          placeholder="CUCAIFTW!1"
        />
      </div>
      <div>
        <Label htmlFor="gender">Self-Identified Gender</Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="w-full">
              {data["gender"] || "Select"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuRadioGroup
              value={data["gender"]}
              onValueChange={(value) =>
                handleChange({
                  target: {
                    type: "checkbox",
                    name: "gender",
                    value: value,
                  },
                })
              }
            >
              <DropdownMenuRadioItem value="Male">Male</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Female">
                Female
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Non-Binary">
                Non-Binary
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ConferenceApplication;

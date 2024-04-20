import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import useFormContext from "@/app/apply/hooks/useFormContext";
import { CheckedState } from "@radix-ui/react-checkbox";

const FormGenerator = ({
  formFields,
}: {
  formFields: { [key: string]: string | string[] | boolean }[];
}) => {
  const context = useFormContext();

  if (!context) {
    throw new Error("FormGenerator must be used within an ApplyFormProvider");
  }
  const {
    title,
    states: { page, canNext, canSubmit },
    data,
    functions: { handleChange, nextPage, prevPage },
  } = context;

  return (
    <div className="text-blumine-50 flex flex-col gap-2">
      {formFields.map((field, k) =>
        field.type === "dropdown" ? (
          <div key={k}>
            <Label htmlFor={field.name.toString()}>{field.label}</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  className="w-full overflow-hidden text-ellipsis"
                  id={field.name.toString()}
                >
                  {String(data[field.name as keyof typeof data]) || "Select"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup
                  value={String(data[field.name as keyof typeof data])}
                  onValueChange={(value) => {
                    handleChange({
                      target: {
                        type: "checkbox",
                        name: field.name,
                        value: value,
                      },
                    });
                  }}
                >
                  {Array.isArray(field.options) &&
                    field.options.map((option) => (
                      <DropdownMenuRadioItem
                        key={option}
                        value={option}
                        id={option}
                      >
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
              checked={data[field.name as keyof typeof data] as CheckedState}
              disabled={field.disabled as boolean}
              id={field.name.toString()}
            />
          </div>
        ) : field.type === "long_text" ? (
          <div key={k}>
            <Label htmlFor={field.name.toString()}>{field.label}</Label>
            <Textarea
              onChange={handleChange}
              name={field.name.toString()}
              placeholder={field.placeholder.toString()}
              value={String(data[field.name as keyof typeof data])}
              disabled={field.disabled as boolean}
              id={field.name.toString()}
            />
            <p className="text-xs flex justify-end mt-1">
              Word Count:{" "}
              {String(data[field.name as keyof typeof data])?.split(" ")
                .length - 1 || 0}
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
              value={String(data[field.name as keyof typeof data])}
              disabled={field.disabled as boolean}
              id={field.name.toString()}
            />
          </div>
        )
      )}
    </div>
  );
};

export default FormGenerator;

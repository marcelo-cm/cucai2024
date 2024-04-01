import { createContext, useState, useEffect, use } from "react";
import { ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";
import { getTicketType } from "@/lib/utils";

interface ApplyFormContextType {
  title: { [key: number]: string };
  states: {
    page: number;
    canNext: boolean;
    canSubmit: boolean;
  };
  data: {
    // Profile Information
    first_name: string;
    last_name: string;
    gender: string;
    ethnicity: string;
    school: string;
    grad_year: string;
    degree_type: string;
    faculty: string;
    discipline: string;
    // Tickets
    ticket_applied: string;
    consider_no_hotel: boolean;
    // Conference Application
    linkedin: string;
    why_cucai: string;
    student_partner: string;
    project: boolean;
    // Project Application
    project_id: string;
    project_name: string;
    project_description: string;
    project_needs: string;
    project_team: boolean;
    project_members: { [key: string]: { name: string; email: string } };
  };
  functions: {
    nextPage: () => void;
    prevPage: () => void;
    handleChange: (e: any) => void;
    handleSubmit: () => void;
  };
}

const defaultContextValue: ApplyFormContextType = {
  title: {
    0: "Profile Information",
    1: "Conference Application",
    2: "Project Application",
    3: "Thank You!",
  },
  states: {
    page: 0,
    canNext: true,
    canSubmit: false,
  },
  data: {
    first_name: "",
    last_name: "",
    gender: "",
    ethnicity: "",
    school: "",
    grad_year: "",
    degree_type: "",
    faculty: "",
    discipline: "",
    ticket_applied: "",
    consider_no_hotel: false,
    linkedin: "",
    why_cucai: "",
    student_partner: "",
    project: false,
    project_id: "",
    project_name: "",
    project_description: "",
    project_needs: "",
    project_team: false,
    project_members: { member_1: { name: "", email: "" } },
  },
  functions: {
    handleChange: () => {},
    nextPage: () => {},
    prevPage: () => {},
    handleSubmit: () => {},
  },
};

const ApplyFormContext =
  createContext<ApplyFormContextType>(defaultContextValue);

export const ApplyFormProvider = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const title: { [key: number]: string } = defaultContextValue.title;
  const [page, setPage] = useState(defaultContextValue.states.page);
  const [data, setData] = useState(defaultContextValue.data);

  const handleChange = (e: any) => {
    const type = e.target.type;
    const name = e.target.name;
    const value = e.target.value;

    if (type === "file") {
      const file = e.target.files[0];
      setData((prev) => ({ ...prev, [name]: file }));
      return;
    }

    setData((prev) => ({ ...prev, [name]: value }));
  };

  // useEffect(() => {
  //   console.log(data.project_members);
  // }, [data]);

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setPage((prev) => prev - 1);
  };

  const {
    project,
    project_id,
    project_name,
    project_description,
    project_needs,
    project_team,
    project_members,
    ...alwaysRequiredInputs
  } = data;

  const areAlwaysRequiredInputsValid = Object.values(
    alwaysRequiredInputs
  ).every((input) => {
    if (input !== "" && input !== null) return true;
    return false;
  });

  const [areProjectInputsValid, setAreProjectInputsValid] = useState(true);

  useEffect(() => {
    setAreProjectInputsValid(
      !project
        ? true
        : project_id
        ? true
        : project_name !== "" &&
          project_description !== "" &&
          project_needs !== "" &&
          (project_team
            ? Object.values(project_members).every(
                (member) => member.name !== "" && member.email !== ""
              )
            : true)
    );
  }, [
    project,
    project_id,
    project_name,
    project_description,
    project_needs,
    project_team,
    project_members,
  ]);

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      project_name: "",
      project_description: "",
      project_needs: "",
      project_team: false,
      project_members: { member_1: { name: "", email: "" } },
    }));
  }, [project_id]);

  const canSubmit = areAlwaysRequiredInputsValid && areProjectInputsValid;

  const handleSubmit = async () => {
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log(user);

      const response = await fetch("/api/app-submission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: data, user: user }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong while submitting the data.");
      }

      console.log(response.status, response.statusText);

      // Redirect to thank you page
      setPage(3);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <ApplyFormContext.Provider
      value={{
        title,
        states: {
          page,
          canNext: page < 3,
          canSubmit,
        },
        data,
        functions: {
          handleChange,
          nextPage,
          prevPage,
          handleSubmit,
        },
      }}
    >
      {children}
    </ApplyFormContext.Provider>
  );
};

export default ApplyFormContext;

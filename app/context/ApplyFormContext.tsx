import { createContext, useState, useEffect } from "react";
import { ReactNode } from "react";

interface ApplyFormContextType {
  title: { [key: number]: string };
  page: number;
  data: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password: string;
    phone: string;
    gender: string;
    ethnicity: string;
    school: string;
    grad_year: string;
    degree_type: string;
    faculty: string;
    discipline: string;
    linkedin: string;
    resume: null | any;
    student_partner: string;
    project: boolean;
    project_name: string;
    project_description: string;
    project_needs: string;
    project_members: string[];
  };
  setData: any;
  canSubmit: boolean;
  nextPage: () => void;
  prevPage: () => void;
  handleChange: (e: any) => void;
}

const defaultContextValue: ApplyFormContextType = {
  title: {
    0: "Conference Application",
    1: "Project Application",
    2: "Thank You!",
  },
  page: 0,
  data: {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
    gender: "",
    ethnicity: "",
    school: "",
    grad_year: "",
    degree_type: "",
    faculty: "",
    discipline: "",
    linkedin: "",
    resume: null,
    student_partner: "",
    project: false,
    project_name: "",
    project_description: "",
    project_needs: "",
    project_members: [],
  },
  setData: () => {}, // Placeholder function
  canSubmit: false,
  handleChange: () => {}, // Placeholder function
  nextPage: () => {}, // Placeholder function
  prevPage: () => {}, // Placeholder function
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
  const title: { [key: number]: string } = {
    0: "Conference Application",
    1: "Project Application",
    2: "Thank You!",
  };

  const [page, setPage] = useState(0);

  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
    gender: "",
    ethnicity: "",
    school: "",
    grad_year: "",
    degree_type: "",
    faculty: "",
    discipline: "",
    linkedin: "",
    resume: null,
    student_partner: "",
    project: false,
    project_name: "",
    project_description: "",
    project_needs: "",
    project_members: [],
  });

  useEffect(() => {
    console.log("FormProvider mounted");
  }, []);

  const handleChange = (e: any) => {
    // console.log(e.target.name, e.target.value);
    // console.log(data);

    const type = e.target.type;
    const name = e.target.name;
    const value = e.target.value;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const nextPage = () => {
    setPage((prev) => prev + 1);
    console.log(page);
  };

  const prevPage = () => {
    setPage((prev) => prev - 1);
    console.log(page);
  };

  const {
    project,
    project_name,
    project_description,
    project_needs,
    project_members,
    ...requiredInputs
  } = data;

  const canSubmit =
    [...Object.values(requiredInputs)].every(Boolean) &&
    page === Object.keys(title).length - 1;

  return (
    <ApplyFormContext.Provider
      value={{
        title,
        page,
        data,
        handleChange,
        setData,
        canSubmit,
        nextPage,
        prevPage,
      }}
    >
      {children}
    </ApplyFormContext.Provider>
  );
};

export default ApplyFormContext;

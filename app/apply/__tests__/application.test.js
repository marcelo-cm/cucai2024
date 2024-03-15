import "@testing-library/jest-dom";
import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ApplyPage from "../page";

test("Renders Application Form Crashing", () => {
  render(<ApplyPage />);

  expect(
    screen.getByText(/apply for a ticket to CUCAI 2025/i)
  ).toBeInTheDocument();
});

test("ProfileInformation Text Inputs", async () => {
  render(<ApplyPage />);

  const testData = [
    {
      label: "First Name",
      value: "Marcelo",
    },
    {
      label: "Last Name",
      value: "Chaman Mallqui",
    },
    {
      label: "Email",
      value: "marcechaman@gmail.com",
    },
    { label: "Password", value: "CUCAIROX" },
    { label: "Confirm Password", value: "CUCAIROX" },
    { label: "Discipline", value: "Commerce" },
  ];

  for (const { label, value } of testData) {
    const input = screen.getByLabelText(label);
    userEvent.type(input, value);
    await waitFor(() => {
      expect(input).toHaveValue(value);
    });
  }
});

test("ProfileInformation Dropdowns", async () => {
  render(<ApplyPage />);

  const testData = [
    { label: "Self-Identified Gender", value: "Male" },
    { label: "Ethnicity", value: "Hispanic or Latino/Latina" },
    { label: "School", value: "Queen's University" },
    { label: "Graduation Year", value: "2026" },
    { label: "Type of Degree", value: "Undergraduate" },
    { label: "Faculty", value: "Business" },
  ];

  for (const { label, value } of testData) {
    const dropdownTrigger = screen.getByRole("button", { name: label });
    userEvent.click(dropdownTrigger);
    const option = await screen.findByRole("menuitemradio", { name: value });
    userEvent.click(option);
    await waitFor(() => {
      expect(dropdownTrigger).toHaveTextContent(value);
    });
  }
});

test("ProfileInformation Full", async () => {
  render(<ApplyPage />);

  const testTextInputData = [
    {
      label: "First Name",
      value: "Marcelo",
    },
    {
      label: "Last Name",
      value: "Chaman Mallqui",
    },
    {
      label: "Email",
      value: "marcechaman@gmail.com",
    },
    { label: "Password", value: "CUCAIROX" },
    { label: "Confirm Password", value: "CUCAIROX" },
    { label: "Discipline", value: "Commerce" },
  ];

  for (const { label, value } of testTextInputData) {
    const input = screen.getByLabelText(label);
    await userEvent.type(input, value);
    await waitFor(() => {
      expect(input).toHaveValue(value);
    });
  }

  const testDropdownData = [
    { label: "Self-Identified Gender", value: "Male" },
    { label: "Ethnicity", value: "Hispanic or Latino/Latina" },
    { label: "School", value: "Queen's University" },
    { label: "Graduation Year", value: "2026" },
    { label: "Type of Degree", value: "Undergraduate" },
    { label: "Faculty", value: "Business" },
  ];

  for (const { label, value } of testDropdownData) {
    const dropdownTrigger = screen.getByRole("button", { name: label });
    await userEvent.click(dropdownTrigger);
    const option = await screen.findByRole("menuitemradio", { name: value });
    await userEvent.click(option);
    await waitFor(() => {
      expect(dropdownTrigger).toHaveTextContent(value);
    });
  }
});

test("ConferenceApplication Full", async () => {
  render(<ApplyPage />);

  const nextButton = screen.getByRole("button", { name: "Next" });
  userEvent.click(nextButton);
  await waitFor(() => {
    expect(screen.getByText("Conference Application")).toBeInTheDocument();
  });

  const testTextInputData = [
    {
      label: "LinkedIn Profile",
      value: "https://www.linkedin.com/in/marc-cham/",
    },
    {
      label:
        "Why is it important that you attend CUCAI 2025? (150 words or less)",
      value: "I want to attend CUCAI 2025 because...",
    },
  ];

  for (const { label, value } of testTextInputData) {
    const input = screen.getByLabelText(label);
    await userEvent.type(input, value);
    await waitFor(() => {
      expect(input).toHaveValue(value);
    });
  }

  const resumeUpload = screen.getByLabelText("Resume");
  userEvent.upload(
    resumeUpload,
    new File(["(⌐□_□)"], "MarceloChamanResume.pdf")
  );
  await waitFor(() => {
    expect(screen.getByText("MarceloChamanResume.pdf")).toBeInTheDocument();
  });

  const testDropdownData = [
    {
      label: "What ticket are you applying for?",
      value: "Conference Ticket ($100)",
    },
    {
      label: "Are you a part of a Student Partner Organization? If so, which?",
      value: "QMIND",
    },
  ];

  for (const { label, value } of testDropdownData) {
    const dropdownTrigger = screen.getByRole("button", { name: label });
    await userEvent.click(dropdownTrigger);
    const option = await screen.findByRole("menuitemradio", { name: value });
    await userEvent.click(option);
    await waitFor(() => {
      expect(dropdownTrigger).toHaveTextContent(value);
    });
  }
});

test("Full (Non-Project) Application Submission", async () => {
  render(<ApplyPage />);

  const testTextInputData_Profile = [
    {
      label: "First Name",
      value: "Marcelo",
    },
    {
      label: "Last Name",
      value: "Chaman Mallqui",
    },
    {
      label: "Email",
      value: "marcechaman@gmail.com",
    },
    { label: "Password", value: "CUCAIROX" },
    { label: "Confirm Password", value: "CUCAIROX" },
    { label: "Discipline", value: "Commerce" },
  ];

  for (const { label, value } of testTextInputData_Profile) {
    const input = screen.getByLabelText(label);
    await userEvent.type(input, value);
    await waitFor(() => {
      expect(input).toHaveValue(value);
    });
  }

  const testDropdownData_Profile = [
    { label: "Self-Identified Gender", value: "Male" },
    { label: "Ethnicity", value: "Hispanic or Latino/Latina" },
    { label: "School", value: "Queen's University" },
    { label: "Graduation Year", value: "2026" },
    { label: "Type of Degree", value: "Undergraduate" },
    { label: "Faculty", value: "Business" },
  ];

  for (const { label, value } of testDropdownData_Profile) {
    const dropdownTrigger = screen.getByRole("button", { name: label });
    await userEvent.click(dropdownTrigger);
    const option = await screen.findByRole("menuitemradio", { name: value });
    await userEvent.click(option);
    await waitFor(() => {
      expect(dropdownTrigger).toHaveTextContent(value);
    });
  }

  const nextButton = screen.getByRole("button", { name: "Next" });
  userEvent.click(nextButton);
  await waitFor(() => {
    expect(screen.getByText("Conference Application")).toBeInTheDocument();
  });

  const testTextInputData_Conference = [
    {
      label: "LinkedIn Profile",
      value: "https://www.linkedin.com/in/marc-cham/",
    },
    {
      label:
        "Why is it important that you attend CUCAI 2025? (150 words or less)",
      value: "I want to attend CUCAI 2025 because...",
    },
  ];

  for (const { label, value } of testTextInputData_Conference) {
    const input = screen.getByLabelText(label);
    await userEvent.type(input, value);
    await waitFor(() => {
      expect(input).toHaveValue(value);
    });
  }

  const resumeUpload = screen.getByLabelText("Resume");
  userEvent.upload(
    resumeUpload,
    new File(["(⌐□_□)"], "MarceloChamanResume.pdf")
  );
  await waitFor(() => {
    expect(screen.getByText("MarceloChamanResume.pdf")).toBeInTheDocument();
  });

  const testDropdownData_Conference = [
    {
      label: "What ticket are you applying for?",
      value: "Conference Ticket ($100)",
    },
    {
      label: "Are you a part of a Student Partner Organization? If so, which?",
      value: "QMIND",
    },
  ];

  for (const { label, value } of testDropdownData_Conference) {
    const dropdownTrigger = screen.getByRole("button", { name: label });
    await userEvent.click(dropdownTrigger);
    const option = await screen.findByRole("menuitemradio", { name: value });
    await userEvent.click(option);
    await waitFor(() => {
      expect(dropdownTrigger).toHaveTextContent(value);
    });
  }

  // For some reason it takes me to the Project Application page even though I said submit
  const applyButton = await screen.getByRole("button", { name: "Apply" });
  waitFor(() => {
    expect(applyButton.disabled).toBe(false);
  });
  userEvent.click(applyButton);
  waitFor(() => {
    expect(screen.getByText("Thank You!")).toBeInTheDocument();
  });
});

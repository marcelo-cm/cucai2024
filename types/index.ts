export interface Inputs {
  [key: string]: string | File;
}

export interface MessageError {
  error?: string;
  message?: string;
}

export interface User {
  id: string;
  createdAt: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  linkedIn: string;
  university: string;
  organization: string;
  onboarded: boolean;
}

export interface PaperPassword {
  id: number;
  createdAt: string;
  paperId: number;
  password: string;
}

export interface Paper {
  id: number;
  createdAt: string;
  title: string;
  track: string;
  abstract: string;
  doi: string;
  url: string;
  fileUrl: string;
}

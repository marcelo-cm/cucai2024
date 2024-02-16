export interface User {}

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
  abstract: string;
  doi: string;
  url: string;
  fileUrl: string;
}

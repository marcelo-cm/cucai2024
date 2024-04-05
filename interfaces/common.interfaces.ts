interface Project {
  created_at: string;
  project_id: string;
  name: string;
  description: string;
  approved: boolean;
  member_names: string[];
  member_emails: string[];
  special_req: string;
}

interface DelegateProfile {
  created_at: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  ethnicity: string;
  school: string;
  grad_year: string;
  degree_type: string;
  faculty: string;
  discipline: string;
  linkedin: string;
  student_partner: string;
  why_cucai: string;
  project_id: string | null;
}

interface Ticket {
  created_at: string;
  ticket_id: string;
  owner: string;
  ticket_applied: string;
  ticket_assigned: string;
  status: string;
  batch: string;
}

interface Application extends DelegateProfile, Omit<Ticket, "owner"> {}

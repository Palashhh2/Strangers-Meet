export interface Applicant {
  id: string;
  name: string;
  email: string;
  age?: number;
  location?: string;
  bio?: string;
  interests?: string;
  dietary?: string;
  profession?: string;
  AI?: { decision: string; confidence: number; reason: string };
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

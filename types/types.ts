export interface TicketFormData {
  title: string;
  description: string;
  priority: number; // Note: priority is a number
  progress: number; // Note: progress is a number
  status: string; // You can use a union type if needed (e.g., "not started" | "started" | "done")
  category: string; // You can use a union type if needed (e.g., "hardware problem" | "software problem" | "project")
  active: boolean;
}
export interface TicketDataFromDb {
  _id: string;
  title: string;
  description: string;
  category: string;
  priority: number;
  progress: number;
  status: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

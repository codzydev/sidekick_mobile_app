export type EventStatus =
  | "todo"
  | "inProgress"
  | "completed"
  | "cancelled"
  | "pending"
  | "overdue"
  | "upcoming"
  | "scheduled"
  | "rescheduled"
  | "onHold";
export interface Event {
  id: string;
  title: string;
  description?: string; // made optional in case not always present
  duration: string;

  // New address fields
  streetAddress: string;
  city: string;
  state?: string;
  postcode: string;
  country: string;
  suburb: string;
  status: EventStatus;
}

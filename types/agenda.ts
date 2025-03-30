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
}

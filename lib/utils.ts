import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTicketType(ticket: string, consider_no_hotel: boolean) {
  if (ticket == "Conference Ticket ($100)") {
    return "conference";
  } else if (
    ticket == "Conference + Hotel Ticket ($225)" &&
    consider_no_hotel == false
  ) {
    return "hotel_needed";
  } else if (
    ticket == "Conference + Hotel Ticket ($225)" &&
    consider_no_hotel == true
  ) {
    return "hotel_optional";
  }

  return "Unknown";
}

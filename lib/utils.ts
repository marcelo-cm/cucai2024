import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { createClient } from "./supabase/client";

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

export function getTicketDescription(category: string): string {
  if (category === "conference") {
    return "Conference Ticket ($100)";
  } else if (category === "hotel_needed") {
    return "Conference, Hotel Needed ($225)";
  } else if (category === "hotel_optional") {
    return "Conference, Hotel Optional ($225)";
  }

  return "Invalid category or mismatched options";
}

export const parseDate = (dateString: string): Date => new Date(dateString);
export const formatDate = (date: Date): string => date.toLocaleDateString();

export const registerTicketPurchase = async (email: string) => {
  console.log(`📧  Registering ticket purchase for ${email}`);
  const supabase = createClient();
  const { data: userDataRes, error: userDataError } = await supabase
    .from("delegates")
    .select("*")
    .eq("email", email)
    .single();

  if (userDataError) {
    console.error(userDataError);
    return new Error("Error fetching user data");
  }

  const { data: ticketDataRes, error: ticketDataError } = await supabase
    .from("tickets")
    .update({ status: "Paid" })
    .eq("owner", userDataRes.user_id)
    .single();

  if (ticketDataError) {
    console.error(ticketDataError);
    return new Error("Error updating ticket data");
  }

  return ticketDataRes;
};

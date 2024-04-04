import { SupabaseClient, User } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import InfoComponent from "./InfoComponent";
import { getTicketDescription } from "@/lib/utils";

const TicketInfo = ({
  user,
  supabase,
}: {
  user: User;
  supabase: SupabaseClient;
}) => {
  const [ticket, setTicket] = useState<any>(null);

  const fetchTicket = async () => {
    const { data, error } = await supabase
      .from("tickets")
      .select("*")
      .eq("owner", user.id)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setTicket(data);
  };

  useEffect(() => {
    fetchTicket();
  }, []);

  return (
    <div className="border border-blumine-700 text-blumine-50 w-full max-w-[1080px] bg-blumine-950">
      <div className="bg-blumine-700 py-4 px-6 flex flex-row gap-6 font-semibold">
        <div>Ticket</div>
        <div className="text-blumine-200">
          ID — {ticket?.ticket_id || "#####"}
        </div>
      </div>
      <div className="py-4 px-6 flex flex-col">
        <InfoComponent label="Status">
          {ticket ? ticket.status : "Loading..."}
        </InfoComponent>
        <InfoComponent label="Type">
          {ticket ? getTicketDescription(ticket.ticket_applied) : "Loading..."}
        </InfoComponent>
      </div>
    </div>
  );
};

export default TicketInfo;

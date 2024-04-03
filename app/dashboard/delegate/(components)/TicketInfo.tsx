import { SupabaseClient, User } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";

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
    <div className="border border-blumine-700 text-blumine-50 w-full max-w-[1080px]">
      <div className="bg-blumine-700 py-4 px-6 flex flex-row gap-6 font-semibold">
        <div>Ticket</div>
        <div className="text-blumine-200">ID — {ticket?.ticket_id}</div>
      </div>
      <div className="p-4">Info</div>
    </div>
  );
};

export default TicketInfo;

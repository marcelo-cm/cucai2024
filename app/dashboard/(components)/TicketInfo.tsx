import { SupabaseClient, User } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import InfoComponent from "./InfoComponent";
import { getTicketDescription } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

const TicketInfo = ({ ticket }: { ticket: Ticket | null }) => {
  return (
    <div className="border border-blumine-700 text-blumine-50 w-full max-w-[1080px] bg-blumine-950">
      <div className="bg-blumine-700 py-4 px-6 flex flex-row gap-6 font-semibold items-center">
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
        {ticket?.status == "Paid" && ticket.ticket_assigned == "Hotel" ? (
          <InfoComponent label="Hotel Room">Claimed</InfoComponent>
        ) : null}
      </div>
      {ticket?.status == "Accepted" ? (
        <Button className="w-full">
          You're Invited. Purchase Your Ticket!
        </Button>
      ) : null}
      {ticket?.status == "Paid" && ticket.ticket_assigned == "Hotel" ? (
        <Button className="w-full">Claim your hotel room!</Button>
      ) : null}
    </div>
  );
};

export default TicketInfo;

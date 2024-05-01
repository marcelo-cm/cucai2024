import React from "react";
import InfoComponent from "./InfoComponent";
import { getTicketDescription } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const TicketInfo = ({ ticket }: { ticket: Ticket | null }) => {
  return (
    <div className="border border-2 border-blumine-700 text-blumine-50 w-full max-w-[1080px] bg-blumine-950">
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
        // needs to be conditional to ticket type.
        <Button
          className="w-full"
          onClick={() => (window.location.href = "/dashboard")}
        >
          You're Invited. Purchase Your Ticket!
        </Button>
      ) : null}
      {ticket?.status == "Paid" &&
      ticket.ticket_assigned == "Hotel" &&
      !ticket.hotel_claimed ? (
        <Button
          className="w-full"
          onClick={() => (window.location.href = "/hotel")}
        >
          Claim your hotel room!
        </Button>
      ) : null}
    </div>
  );
};

export default TicketInfo;

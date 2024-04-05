"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "../template";
import ApplicationRow from "./(components)/ApplicationRow";
import { parseDate } from "@/lib/utils";

const AdminDashboard = () => {
  const { user, supabase } = useUser();
  const [delegates, setDelegates] = useState<DelegateProfile[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);

  const fetchDelegates = async () => {
    const { data: applicationsRes, error: applicationsError } = await supabase
      .from("delegates")
      .select("*");

    if (applicationsError) {
      console.error(applicationsError);
      return;
    }
    setDelegates(applicationsRes);
  };

  useEffect(() => {
    fetchDelegates();
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const { data: ticketsRes, error: ticketsError } = await supabase
      .from("tickets")
      .select("*");

    if (ticketsError) {
      console.error(ticketsError);
      return;
    }
    setTickets(ticketsRes);
  };

  const combineDelegatesAndTickets = () => {
    const combined: Application[] = delegates
      .map((delegate) => {
        const ticket = tickets.find((t) => t.owner === delegate.user_id);

        if (ticket) {
          const { owner, ...ticketWithoutOwner } = ticket;

          return {
            ...delegate,
            ...ticketWithoutOwner,
          };
        }

        return delegate as Application;
      })
      .sort((a, b) => +parseDate(a.created_at) - +parseDate(b.created_at));

    console.log("Combined Dels & Tickets:", combined);
    setApplications(combined);
  };

  useEffect(() => {
    combineDelegatesAndTickets();
  }, [delegates, tickets]);

  return (
    <div className="border border-blumine-700 text-blumine-50 w-full  bg-blumine-950">
      <div className="bg-blumine-700 py-4 px-6 flex flex-row gap-6 font-semibold">
        <div>Delegate Applications</div>
      </div>
      {applications.map((application, index) => (
        <ApplicationRow
          key={index}
          application={application}
          supabase={supabase}
        />
      ))}
    </div>
  );
};

export default AdminDashboard;

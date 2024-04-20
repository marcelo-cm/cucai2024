"use client";

import React, { useState } from "react";
import { useUser } from "./template";
import ImportantResources from "../dashboard/(components)/ImportantResources";

const AcceptTicket = () => {
  const { user, ticket, supabase, masterSettings } = useUser();

  if (!user || !supabase || !ticket || !masterSettings) {
    return null;
  }

  if (ticket.status !== "Paid") {
    window.location.href = "/dashboard";
    return null;
  }

  return <div className="flex flex-col gap-2">Hotel</div>;
};

export default AcceptTicket;

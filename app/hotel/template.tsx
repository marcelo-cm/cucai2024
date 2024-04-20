"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

import { Nunito_Sans } from "next/font/google";
const NunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

interface UserContextType {
  user: User | null;
  ticket: Ticket | null;
  supabase: any;
  masterSettings: MasterSettings | null;
}

const UserContext = createContext<UserContextType>({
  user: null,
  ticket: null,
  supabase: null,
  masterSettings: null,
});

export const useUser = () => useContext(UserContext);

const DashboardTemplate = ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [masterSettings, setMasterSettings] = useState<MasterSettings | null>(
    null
  );

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error("No user found");
      window.location.href = "/login";
    } else {
      console.log("User found");
      setUser(user);

      const { data: ticketRes, error: ticketError } = await supabase
        .from("tickets")
        .select("*")
        .eq("owner", user.id)
        .single();

      if (ticketError) {
        console.error(ticketError);
        window.location.href = "/login";
      } else {
        console.log("Ticket found", ticketRes);
        setTicket(ticketRes);
        fetchMasterSettings();
      }
    }
  };

  const fetchMasterSettings = async () => {
    const { data: masterSettingsRes, error: masterSettingsError } =
      await supabase.from("master_settings").select("*").single();

    if (masterSettingsError) {
      console.error(masterSettingsError);
      return;
    }
    setMasterSettings(masterSettingsRes);
    console.log("Master Settings:", masterSettingsRes);
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, ticket, supabase, masterSettings }}>
      <div
        className={`${NunitoSans.className} h-full p-4 text-blumine-50 flex flex-col items-center gap-4 overflow-auto`}
      >
        <div className="bg-blumine-700 py-2 px-4 font-semibold leading-none flex justify-between items-center w-full">
          Canadian Undergraduate Conference on AI
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={user?.user_metadata.avatar_url}
                  alt="Avatar"
                />
                <AvatarFallback>
                  {user?.email?.slice(0, 1).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Profile</DropdownMenuLabel>
              <DropdownMenuLabel className="font-normal">
                {user?.email}
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-blumine-900" />
              <DropdownMenuItem
                onClick={async () => {
                  await supabase.auth.signOut();
                  window.location.href = "/login";
                }}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {children}
      </div>
    </UserContext.Provider>
  );
};

export default DashboardTemplate;

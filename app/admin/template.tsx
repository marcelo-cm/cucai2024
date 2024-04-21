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
import { Tabs, TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";
import { Button } from "@/components/ui/button";
import { parseDate } from "@/lib/utils";

import { Nunito_Sans } from "next/font/google";

const NunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

interface UserContextType {
  user: User | null;
  supabase: any;
  applications: Application[];
  projects: Project[];
  masterSettings: MasterSettings | null;
}

const UserContext = createContext<UserContextType>({
  user: null,
  supabase: null,
  applications: [],
  projects: [],
  masterSettings: null,
});

export const useUser = () => useContext(UserContext);

const DashboardTemplate = ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [delegates, setDelegates] = useState<DelegateProfile[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [masterSettings, setMasterSettings] = useState<MasterSettings | null>(
    null
  );
  const [projects, setProjects] = useState<Project[]>([]);

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.log("No user found");
      window.location.href = "/login";
    } else {
      console.log("User found");
      setUser(user);
      fetchMasterSettings();
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
  };

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

  const fetchProjects = async () => {
    const { data: projectsRes, error: projectsError } = await supabase
      .from("projects")
      .select("*");

    if (projectsError) {
      console.error("Error fetching projects", projectsError);
      return;
    }

    setProjects(projectsRes);
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

    setApplications(combined);
  };

  const handleTabChange = async () => {
    await fetchDelegates();
    await fetchTickets();
    await fetchProjects();
  };

  useEffect(() => {
    if (delegates.length && tickets.length && projects?.length)
      combineDelegatesAndTickets();
  }, [delegates, tickets]);

  useEffect(() => {
    checkUser();
    handleTabChange();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, supabase, applications, projects, masterSettings }}
    >
      <Tabs defaultValue="applications" onValueChange={handleTabChange}>
        <div
          className={`${NunitoSans.className} h-full p-4 text-blumine-50 flex flex-col items-center gap-4 overflow-auto`}
        >
          <div className="bg-blumine-700 pr-4 font-semibold leading-none flex justify-between items-center w-full">
            <div className="flex gap-4 items-center">
              <TabsList>
                <TabsTrigger value="applications" className="!py-6" asChild>
                  <Button variant={"secondary"}>Applications</Button>
                </TabsTrigger>
                <TabsTrigger value="projects" className="!py-6" asChild>
                  <Button variant={"secondary"}>Projects</Button>
                </TabsTrigger>
                <TabsTrigger value="acceptances" className="!py-6" asChild>
                  <Button variant={"secondary"}>Acceptances</Button>
                </TabsTrigger>
              </TabsList>
              Canadian Undergraduate Conference on AI
            </div>
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
      </Tabs>
    </UserContext.Provider>
  );
};

export default DashboardTemplate;

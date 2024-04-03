"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { Nunito_Sans } from "next/font/google";
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
const NunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

interface UserContextType {
  user: User | null;
  supabase: any;
}

const UserContext = createContext<UserContextType>({
  user: null,
  supabase: null,
});

export const useUser = () => useContext(UserContext);

const DashboardTemplate = ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);

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
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, supabase }}>
      <div
        className={`${NunitoSans.className} h-full py-4 px-24 text-blumine-50 flex flex-col items-center gap-4`}
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

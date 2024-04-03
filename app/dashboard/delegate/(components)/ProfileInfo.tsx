import { SupabaseClient, User } from "@supabase/supabase-js";
import React from "react";

const ProfileInfo = ({
  user,
  supabase,
}: {
  user: User;
  supabase: SupabaseClient;
}) => {
  return (
    <div className="border border-blumine-700 text-blumine-50 w-full max-w-[1080px]">
      <div className="bg-blumine-700 py-4 px-6 flex flex-row gap-6 font-semibold">
        <div>Profile</div>
        <div className="text-blumine-200">ID — {user.id}</div>
      </div>
      <div className="p-4">Info</div>
    </div>
  );
};

export default ProfileInfo;

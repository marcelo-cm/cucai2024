import { SupabaseClient, User } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import InfoComponent from "./InfoComponent";
import ExternalLink from "@/components/ui/external-link";

interface DelegateProfile {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  ethnicity: string;
  school: string;
  grad_year: string;
  degree_type: string;
  faculty: string;
  discipline: string;
  linkedin: string;
  student_partner: string;
  why_cucai: string;
  project_id: string | null;
}

const ProfileInfo = ({
  user,
  supabase,
}: {
  user: User;
  supabase: SupabaseClient;
}) => {
  const [delegateProfile, setDelegateProfile] =
    useState<DelegateProfile | null>(null);

  const fetchDelegateProfile = async () => {
    const { data: delegateProfileRes, error: delegateProfileError } =
      await supabase
        .from("delegates")
        .select("*")
        .eq("user_id", user.id)
        .single();

    if (delegateProfileError) {
      console.error("Error fetching delegate profile", delegateProfileError);
      return;
    }

    console.log("Delegate profile", delegateProfileRes);
    setDelegateProfile(delegateProfileRes);
  };

  useEffect(() => {
    fetchDelegateProfile();
  }, []);

  return (
    <div className="border border-blumine-700 text-blumine-50 w-full max-w-[1080px] bg-blumine-950">
      <div className="bg-blumine-700 py-4 px-6 flex flex-row gap-6 font-semibold">
        <div>Profile</div>
        <div className="text-blumine-200">ID — {user.id}</div>
      </div>
      <div className="py-4 px-6 flex flex-col md:flex-row md:gap-8">
        <div className="md:w-1/2">
          <InfoComponent label="Name">
            {delegateProfile?.first_name} {delegateProfile?.last_name}{" "}
          </InfoComponent>
          <InfoComponent label="Email">{delegateProfile?.email}</InfoComponent>
          <InfoComponent label="LinkedIn">
            <ExternalLink href={delegateProfile?.linkedin || ""}>
              {delegateProfile?.linkedin
                .replace("https://", "")
                .replace("www.", "")
                .replace("linkedin.com", "")}
            </ExternalLink>
          </InfoComponent>
          <InfoComponent label="Gender">
            {delegateProfile?.gender}
          </InfoComponent>
          <InfoComponent label="Ethnicity">
            {delegateProfile?.ethnicity}
          </InfoComponent>
        </div>
        <div className="md:w-1/2">
          <InfoComponent label="School">
            {delegateProfile?.school}, {delegateProfile?.grad_year}
          </InfoComponent>
          <InfoComponent label="Faculty">
            {delegateProfile?.degree_type}, {delegateProfile?.faculty},{" "}
            {delegateProfile?.discipline}
          </InfoComponent>
          <InfoComponent label="Student Partner">
            {delegateProfile?.student_partner}
          </InfoComponent>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;

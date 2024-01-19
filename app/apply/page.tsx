"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

function ApplyPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("https://tally.so/r/wkNMQM");
  }, [router]);

  return <div className="text-white">see u soon. redirecting...</div>;
}

export default ApplyPage;

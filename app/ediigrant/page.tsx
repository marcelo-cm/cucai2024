"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

function EDIIGrant() {
  const router = useRouter();

  useEffect(() => {
    router.push("https://tally.so/r/nrP6dL");
  }, [router]);

  return <div className="text-white">see u soon. redirecting...</div>;
}

export default EDIIGrant;

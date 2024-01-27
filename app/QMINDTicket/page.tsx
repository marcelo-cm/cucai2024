"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

function ApplyPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("https://forms.gle/s5GJwx1oYhxTSQJG7");
  }, [router]);

  return <div className="text-white">see u soon. redirecting...</div>;
}

export default ApplyPage;

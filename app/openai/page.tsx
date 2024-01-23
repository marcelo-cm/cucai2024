"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

function OpenAIPage() {
  const router = useRouter();

  useEffect(() => {
    router.push(
      "https://docs.google.com/forms/d/e/1FAIpQLSdAHPWF6l81JcDMT-g0UcteQEM5ZUvT57XAlj7TtnVKUxO8PA/viewform"
    );
  }, [router]);

  return <div className="text-white">see u soon. redirecting...</div>;
}

export default OpenAIPage;

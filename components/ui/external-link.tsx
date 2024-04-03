import { ExternalLinkIcon } from "lucide-react";
import React from "react";

const ExternalLink = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <a
      href={href}
      target="_blank"
      className="underline hover:no-underline hover:opacity-70 cursor-pointer flex flex-row gap-1 items-center"
    >
      {children}
      <ExternalLinkIcon className="h-4 w-4" />
    </a>
  );
};

export default ExternalLink;

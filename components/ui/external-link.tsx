import { ExternalLinkIcon } from "lucide-react";
import React from "react";

const ExternalLink = ({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
}) => {
  return (
    <a
      href={href}
      target="_blank"
      className={`underline underline-offset-2 hover:no-underline hover:opacity-70 cursor-pointer flex flex-row gap-1 items-center ${className}`}
    >
      {children}
      <ExternalLinkIcon className="h-4 w-4" />
    </a>
  );
};

export default ExternalLink;

import ExternalLink from "@/components/ui/external-link";
import React from "react";

const ImportantResources = () => {
  const hotLinks = [
    {
      name: "CUCAI Website",
      url: "https://cucai.ca",
    },
  ];

  return (
    <div className="border border-blumine-700 text-blumine-50 w-full max-w-[1080px] bg-blumine-950">
      <div className="bg-blumine-700 py-4 px-6 flex flex-row gap-6 font-semibold">
        Important Resources
      </div>
      <div className="py-4 px-6 text-blumine-600">
        {hotLinks.map((item) => (
          <ExternalLink href={item.url}>{item.name}</ExternalLink>
        ))}
      </div>
    </div>
  );
};

export default ImportantResources;

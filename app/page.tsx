"use client";

import Image from "next/image";
import { IBM_Plex_Sans } from "next/font/google";
import { ReactNode, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const IBMPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const BlurredText = ({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) => {
  return (
    <div className="flex justify-center relative text-center">
      <div className={`${className}`}>{children}</div>
      <div className={`absolute top-0 ${className} blur-md opacity-50`}>
        {children}
      </div>
    </div>
  );
};

const SectionTitle = ({
  children,
  className,
  colour,
}: {
  children: ReactNode;
  className?: string;
  colour?: string;
}) => {
  return (
    <div
      className={`${className} flex justify-center text-white py-3 w-full text-md tracking-[6px]`}
    >
      {children}
    </div>
  );
};

const BlurredSeperator = ({
  blur = "sm",
  className,
}: {
  blur?: string;
  className?: string;
}) => {
  return (
    <div className={`w-full`}>
      {blur == "md" ? (
        <hr
          className={`flex flex-1 border-[0.5px] border-[#55E0FF]/50 blur-${blur} ${className}`}
        />
      ) : null}
      <hr
        className={`flex flex-1 h-0 border-[0.5px] border-[#55E0FF]/50 blur-${blur} ${className}`}
      />
      <hr
        className={`flex flex-1 h-0 border-[0.5px] border-[#55E0FF]/50 ${className}`}
      />

      {blur == "md" ? (
        <hr
          className={`flex flex-1 border-[0.5px] border-[#55E0FF] blur-${blur} ${className}`}
        />
      ) : null}
      {blur == "md" ? (
        <hr
          className={`flex flex-1 border-[0.5px] border-[#55E0FF]/50 blur-${blur} ${className}`}
        />
      ) : null}
    </div>
  );
};

const LandingSponsors = [
  {
    title: "Microsoft",
    logo: "microsoft-logo.png",
  },
  {
    title: "Intel",
    logo: "intel-logo.png",
  },
  {
    title: "Accenture",
    logo: "accenture-logo.png",
  },
  {
    title: "AWS",
    logo: "aws-logo.png",
  },
  {
    title: "Borealis AI",
    logo: "borealis-ai-logo.png",
  },
  {
    title: "Cohere",
    logo: "cohere-logo.png",
  },
  {
    title: "DDQIC",
    logo: "ddqic-logo.png",
  },
  {
    title: "Deloitte",
    logo: "deloitte-logo.png",
  },
  {
    title: "Deloitte OmniaAI",
    logo: "deloitte-omnia-ai-logo.png",
  },
  {
    title: "Loblaw Digital",
    logo: "loblaw-digital-logo.png",
  },
  {
    title: "NASA",
    logo: "nasa-logo.png",
  },
  {
    title: "National Research Council",
    logo: "nrc-logo.png",
  },
  {
    title: "RBC",
    logo: "rbc-logo.png",
  },
  {
    title: "Shopify",
    logo: "shopify-logo.png",
  },
  {
    title: "Smith School of Business",
    logo: "smith-sob-logo.png",
  },
  {
    title: "TD Bank",
    logo: "td-logo.png",
  },
];

const PastSpeakers = [
  {
    name: "Ivan Zhang",
    headshot: "/headshots/ivan-zhang.png",
    titles: ["CTO & Co-Founder"],
    company: "Cohere",
    logo: "/logos/cohere-logo.png",
  },
  {
    name: "Ivan Zhang",
    headshot: "/headshots/ivan-zhang.png",
    titles: ["CTO & Co-Founder"],
    company: "Cohere",
    logo: "/logos/cohere-logo.png",
  },
  {
    name: "Ivan Zhang",
    headshot: "/headshots/ivan-zhang.png",
    titles: ["CTO & Co-Founder"],
    company: "Cohere",
    logo: "/logos/cohere-logo.png",
  },
  {
    name: "Ivan Zhang",
    headshot: "/headshots/ivan-zhang.png",
    titles: ["CTO & Co-Founder"],
    company: "Cohere",
    logo: "/logos/cohere-logo.png",
  },
  {
    name: "Ivan Zhang",
    headshot: "/headshots/ivan-zhang.png",
    titles: ["CTO & Co-Founder"],
    company: "Cohere",
    logo: "/logos/cohere-logo.png",
  },
  {
    name: "Ivan Zhang",
    headshot: "/headshots/ivan-zhang.png",
    titles: ["CTO & Co-Founder"],
    company: "Cohere",
    logo: "/logos/cohere-logo.png",
  },
  {
    name: "Ivan Zhang",
    headshot: "/headshots/ivan-zhang.png",
    titles: ["CTO & Co-Founder"],
    company: "Cohere",
    logo: "/logos/cohere-logo.png",
  },
];

let Team = [
  {
    name: "Marcelo Chaman Mallqui",
    headshot: "/headshots/marcelo-chamanmallqui.png",
    title: "President",
    linkedin: "https://www.linkedin.com/in/marc-cham/",
  },
  {
    name: "Olivia Xu",
    headshot: "/headshots/olivia-xu.png",
    title: "Advisor",
    linkedin: "https://www.linkedin.com/in/olivia-chen-xu/",
  },
  {
    name: "Rabab Azeem",
    headshot: "/headshots/rabab-azeem.png",
    title: "Advisor",
    linkedin: "https://www.linkedin.com/in/rabab-azeem/",
  },
  {
    name: "Lejla Sain",
    headshot: "/headshots/lejla-sain.png",
    title: "Director of Partnerships",
    linkedin: "https://www.linkedin.com/in/lejla-s/",
  },
  {
    name: "Daniel Wang",
    headshot: "/headshots/daniel-wang.png",
    title: "Director of Partnerships",
    linkedin: "https://www.linkedin.com/in/itsdanielwang/",
  },
  {
    name: "Rhea George",
    headshot: "/headshots/rhea-george.png",
    title: "Director of Marketing",
    linkedin: "https://www.linkedin.com/in/rhea-george-b81bab1b1/",
  },
  {
    name: "Seth Grief Albert",
    headshot: "/headshots/seth-grief-albert.png",
    title: "Director of Strat. Parternships",
    linkedin: "https://www.linkedin.com/in/sethgriefalbert/",
  },
  {
    name: "Rowan McDonald",
    headshot: "/headshots/rowan-mcdonald.png",
    title: "Director of Finance",
    linkedin: "https://www.linkedin.com/in/rowan-m/",
  },
  {
    name: "Zana Yan",
    headshot: "/headshots/zana-yan.png",
    title: "Product Designer",
    linkedin: "https://www.linkedin.com/in/zana-zhizi-yan/",
  },
  {
    name: "Skyye Lambert",
    headshot: "/headshots/skyye-lambert.png",
    title: "Product Designer",
    linkedin: "https://www.linkedin.com/in/skyye-lambert/",
  },
  {
    name: "Jasmine Zangeneh",
    headshot: "/headshots/jasmine-zangeneh.png",
    title: "Content Designer",
    linkedin: "https://www.linkedin.com/in/jasmine-zangeneh-aa5147277/",
  },
  {
    name: "Andy Huang",
    headshot: "/headshots/andy-huang.png",
    title: "Content Designer",
    linkedin: "https://www.linkedin.com/in/andy-snowflake-huang/",
  },
  {
    name: "John Warren",
    headshot: "/headshots/john-warren.png",
    title: "Community Lead",
    linkedin: "https://www.linkedin.com/in/warrenjk/",
  },
];
const carouselTeam = [...Team, ...Team];

const StudentPartners = [
  {
    name: "QMIND",
    logo: "/logos/qmind-logo.png",
    school: "Queen's University",
    instagram: "https://www.instagram.com/qmind.ai/",
    website: "https://www.qmind.ca/",
  },
  {
    name: "WAT.ai",
    logo: "/logos/wat-ai-logo.png",
    school: "University of Waterloo",
    instagram: "https://www.instagram.com/wataiteam/",
    website: "https://watai.ca/",
  },
  {
    name: "Western AI",
    logo: "/logos/wai-logo.png",
    school: "University of Western Ontario",
    instagram: "https://www.instagram.com/westernu.ai/",
    website: "https://www.westernuai.ca/",
  },
  {
    name: "McGill AI",
    logo: "/logos/mcgill-ai-logo.png",
    school: "McGill University",
    instagram: "https://www.instagram.com/mcgillaisociety/",
    website: "https://mcgillai.com/",
  },
  {
    name: "UofT AI",
    logo: "/logos/uoftai-logo.png",
    school: "University of Toronto",
    instagram: "https://www.instagram.com/uoftaigroup/",
    website: "https://www.uoft.ai/",
  },
  {
    name: "Western Cyber Society",
    logo: "/logos/wcs-logo.png",
    school: "University of Western Ontario",
    instagram: "https://www.instagram.com/westerncybersociety/",
    website: "https://www.westerncybersociety.com/items/",
  },
  {
    name: "UVic AI",
    logo: "/logos/uvic-ai-logo.png",
    school: "University of Victoria",
    instagram: "https://www.instagram.com/uvicaiclub/",
    website: "https://uvicai.ca/",
  },
  {
    name: "UdeM AI",
    logo: "/logos/udem-ai-logo.png",
    school: "Universitié de Montréal",
    instagram: "https://www.instagram.com/udem.ai/",
    website: "https://www.qmind.ca/",
  },
];

export default function Home() {
  const [position, setPosition] = useState(0);
  const controls = useAnimation();

  const resumeAnimation = () => {
    controls.start({ x: true ? -position : position });
  };
  const pauseAnimation = () => {
    controls.stop();
  };

  useEffect(() => {
    const cardsContainer = document.getElementById("oraganizing-team-id");
    const cardsWidth = cardsContainer!?.clientWidth / 2 + 24;
    setPosition(cardsWidth);
    controls.start({ x: true ? -cardsWidth : cardsWidth });
  }, []);

  const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState<string>("79D 7H 20M 20S");

    // Target date: March 2, 2024
    const targetDate: Date = new Date("2024-03-02T00:00:00");

    // Function to generate random time for initial display
    const randomTime = (): string => {
      const randomDays = Math.ceil(Math.random() * 50 + 10);
      const randomHours = Math.floor(Math.random() * 9);
      const randomMinutes = Math.ceil(Math.random() * 50 + 10);
      const randomSeconds = Math.ceil(Math.random() * 9 + 10);
      return `${randomDays}D ${randomHours}H ${randomMinutes}M ${randomSeconds}S`;
    };

    useEffect(() => {
      // Start with rapid random time updates
      const randomInterval = setInterval(() => {
        setTimeLeft(randomTime());
      }, 50); // Adjust the interval for faster/slower cycling

      const countdownInterval = setInterval(() => {
        const now = new Date();
        const difference: number = targetDate.getTime() - now.getTime();

        if (difference >= 0) {
          clearInterval(randomInterval); // Stop random cycling once actual countdown begins

          // Calculate time left
          const days: number = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours: number = Math.floor(
            (difference / (1000 * 60 * 60)) % 24
          );
          const minutes: number = Math.floor((difference / 1000 / 60) % 60);
          const seconds: number = Math.floor((difference / 1000) % 60);

          setTimeLeft(`${days}D ${hours}H ${minutes}M ${seconds}S`);
        } else {
          clearInterval(randomInterval);
          clearInterval(countdownInterval);
          setTimeLeft("Countdown ended");
        }
      }, 1000);

      return () => {
        clearInterval(randomInterval);
        clearInterval(countdownInterval);
      };
    }, []);

    return (
      <BlurredText
        className="
        text-white
        text-[20pt]
        font-bold
        tracking-[18px]
        w-[75%]
        sm:w-full"
      >
        {timeLeft}
      </BlurredText>
    );
  };

  return (
    <main
      className={`${IBMPlexSans.className} h-full w-[100dvw] overflow-x-hidden overflow-y-scroll flex flex-col items-center z-10 no-scrollbar font-light text-white pb-32`}
    >
      <div className="absolute left-[7.5dvw] h-full w-[1px] bg-[#55E0FF]/50" />
      <div className="absolute left-[7.5dvw] h-full w-[1px] bg-[#55E0FF]/50 blur-sm" />
      <div className="absolute right-[7.5dvw] h-full w-[1px] bg-[#55E0FF]/50" />
      <div className="absolute right-[7.5dvw] h-full w-[1px] bg-[#55E0FF]/50 blur-sm" />

      {/* NAV BAR */}
      <div className="w-full py-8 px-48 flex flex-row justify-between">
        <div className="flex flex-row gap-8 text-white text-sm tracking-[6px]">
          <a href="#About">ABOUT</a>
          <a href="#Speakers">SPEAKERS</a>
          <a href="#Programming">PROGRAMMING</a>
          {/* <a href="#Sponsors">SPONSORS</a> */}
          <a href="#StudentPartners">STUDENT PARTNERS</a>
        </div>
        <div className="flex flex-row gap-8 items-center justify-center">
          <a href="mailto:chair@cucai.ca">
            <img src="/email-icon.svg" className="h-4" />
          </a>
          <a href="https://www.instagram.com/cucai2024/">
            <img src="/instagram-icon.svg" className="h-5" />
          </a>
          <a href="https://www.linkedin.com/company/canadian-undergraduate-conference-on-artificial-intelligence/">
            <img src="/linkedin-icon.svg" className="h-5" />
          </a>
        </div>
      </div>
      <BlurredSeperator />
      {/* LANDING */}
      <div className="w-full flex flex-col gap-2 items-center pt-16">
        <BlurredText
          className="
          text-cyan-300
          text-[10pt]
          md:text-[2vw]
          xl:text-[1.2vw]
          font-bold
          tracking-[12px]
          md:tracking-[18px]"
        >
          MARCH 2-3, 2024{" "}
          <p className="hidden lg:inline-block">| KINGSTON, ON</p>
        </BlurredText>
        <BlurredText
          className="
          text-white
          text-[18vw]
          leading-none
          text-center
          md:text-[10vw]
          font-bold
          leading-[153px]
          tracking-[6px]"
        >
          CUCAI 2024
        </BlurredText>
        <BlurredText
          className="
          text-cyan-300
          text-[10pt]
          md:text-[2vw]
          xl:text-[1.2vw]
          font-bold
          font-['IBM
          Plex
          Sans']
          tracking-[12px]
          md:tracking-[18px]
          lg:hidden"
        >
          KINGSTON, ON
        </BlurredText>
        <CountdownTimer />
        <img className="w-3/5 pt-8" src="/ontario-hall.png" />
      </div>
      <BlurredSeperator />
      {/* LANDING SPONSORS TICKER */}
      <div className="w-full px-[7.5dvw] h-[100px]">
        <div className="flex flex-row items-center h-fit overflow-scroll no-scrollbar divide-x-[1px] divide-[#55E0FF]/50">
          {LandingSponsors.map((company, i) => (
            <img
              key={i}
              alt={company.title}
              src={`/logos/${company.logo}`}
              className="object-fit h-[105px] px-16 py-8 flex items-center "
            />
          ))}
        </div>
      </div>
      {/* BUY TICKETS */}
      <BlurredSeperator blur="md" className="!border-[#FFC24B]" />
      <SectionTitle
        colour="FFC24B"
        className="bg-gradient-to-r from-[#FFC24B]/25 to-[#FFC24B]/0"
      >
        APPLY TO CUCAI 2024 NOW!
      </SectionTitle>
      <BlurredSeperator blur="md" className="!border-[#FFC24B]" />
      {/* ABOUT */}
      <div
        id="About"
        className="py-16 px-48 flex flex-row justify-between gap-32 items-center"
      >
        <div className="flex flex-col gap-4 min-w-[475px]">
          <h1 className="text-4xl text-[#FFC24B] font-semibold">
            Canadian Undergraduate Conference on AI
          </h1>
          <p>
            We a not-for-profit conference that bring together over 320 of the
            brightest minds on AI from across the country. 100% run by
            undergraduate volunteers, out of passion.
            <br />
            <br />
            Since our inception in 2018, CUCAI has hosted distinguished
            speakers, such as Geoffrey Hinton, Shivon Zilis, and Ivan Zhang. The
            conference serves as a platform for top Canadian undergraduates in
            AI to learn, share their passion, and connect with industry leaders.
            <br />
            <br />
            Our main event is the AI project showcase where teams from all
            Canadian universities demo their project in front of recruiters,
            sponsors, speakers & their fellow delegates.
            <br />
            <br />
            CUCAI 2024 will be in Kingston, ON on March 2-3, 2024. Hotels
            included in ticket price.
          </p>
        </div>
        <div className="w-1/3 min-w-[300px] bg-gradient-to-b from-sky-200 to-sky-200/10 rounded-3xl p-2 aspect-[9/16]">
          <iframe
            className="rounded-2xl w-full h-full object-cover"
            src="https://www.youtube.com/embed/D9mYUk5Tji4?controls=0?quality=auto"
            allow="accelerometer; autoplay;"
          />
        </div>
      </div>
      {/* SPEAKERS */}
      <BlurredSeperator />
      <SectionTitle>PAST SPEAKERS</SectionTitle>
      <BlurredSeperator />
      <div id="Speakers" className="w-full px-[7.5dvw] ">
        <div className="flex flex-row items-center h-fit overflow-scroll no-scrollbar divide-x-[1px] divide-[#55E0FF]/50">
          {PastSpeakers.map((speaker, i) => (
            <div className="flex flex-col justify-center items-center py-8 px-16 gap-4 min-w-[300px]">
              <img
                src={speaker.headshot}
                alt={`Headshot of ${speaker.name}`}
                className="h-[150px] rounded-full border-[#55E0FF]/50 border-[1px] object-cover bg-gradient-to-t from-[#55E0FF]/50 to-[#55E0FF]/0"
              />
              <div className="text-center">
                <h3 className="text-2xl font-normal">{speaker.name}</h3>
                {speaker.titles.map((title) => (
                  <p className="text-sm">{title}</p>
                ))}
              </div>
              <img src={speaker.logo} className="w-3/4 h-auto mt-2" />
            </div>
          ))}
        </div>
      </div>
      {/* PROGRAMMING */}
      <BlurredSeperator />
      <SectionTitle>CUCAI 2024 PROGRAMMING</SectionTitle>
      <BlurredSeperator />
      <div
        id="Programming"
        className="w-full px-[7.5dvw] flex flex-row flex-wrap divide-x-[1px] divide-y-[1px] divide-[#55E0FF]/50"
      >
        <div className="w-1/2 h-[320px] flex flex-col relative text-center py-8 px-16 justify-center items-center gap-2">
          <img
            src="/cucai-1.png"
            className="absolute top-0 left-0 w-full h-full object-cover mix-blend-luminosity grayscale"
          />
          <h1 className="text-xl text-[#FFC24B] tracking-[8px] font-semibold">
            AI PROJECT SHOWCASE
          </h1>
          <p className="leading-tight font-regular">
            Explore 40+ design teams showcasing their groundbreaking projects.
            Want to present your project?
            <br />
            <br />
            Applied Artificial Intelligence.
            <br />
            AI Startups & Products.
            <br />
            AI Research.
            <br />
            AI Ethics.
            <br />
            More.
          </p>
        </div>{" "}
        <div className="w-1/2 h-[320px] flex flex-col relative text-center py-8 px-16 justify-center items-center gap-2">
          <img
            src="/cucai-2.png"
            className="absolute top-0 left-0 w-full h-full object-cover mix-blend-luminosity grayscale"
          />
          <h1 className="text-xl text-[#FFC24B] tracking-[8px] font-semibold">
            SPEAKER PANELS{" "}
          </h1>
          <p className="leading-tight font-regular">
            Presentations and panels from leading researchers, academics and
            industry professionals in the AI space. Learn about what it’s really
            like to movement on AI today.
          </p>
        </div>{" "}
        <div className="w-1/2 h-[320px] flex flex-col relative text-center py-8 px-16 justify-center items-center gap-2">
          <img
            src="/cucai-3.png"
            className="absolute top-0 left-0 w-full h-full object-cover mix-blend-luminosity grayscale"
          />
          <h1 className="text-xl text-[#FFC24B] tracking-[8px] font-semibold">
            INDUSTRY WORKSHOPS
          </h1>
          <p className="leading-tight font-regular">
            Experience hands-on workshops from our sponsors and partners. Learn
            from industry professionals and get a taste of what it’s like to
            work in AI.
          </p>
        </div>{" "}
        <div className="w-1/2 h-[320px] flex flex-col relative text-center py-8 px-16 justify-center items-center gap-2">
          <img
            src="/cucai-4.png"
            className="absolute top-0 left-0 w-full h-full object-cover mix-blend-luminosity grayscale"
          />
          <h1 className="text-xl text-[#FFC24B] tracking-[8px] font-semibold">
            PRIZES, PRIZES, PRIZES{" "}
          </h1>
          <p className="leading-tight font-regular">
            CUCAI traditionally hosts a Gala Dinner where all delegates,
            sponsors, speakers & organizing team comes together to watch the
            winners of the AI Project Showcase $5000 in prizes will be
            distributed to eligible projects.
          </p>
        </div>
      </div>
      {/* STUDENT PARTNERS */}
      <BlurredSeperator />
      <SectionTitle>STUDENT PARTNERS</SectionTitle>
      <BlurredSeperator />
      <div
        id="StudentPartners"
        className="w-full px-[7.5dvw] flex flex-row flex-wrap divide-x-[1px] divide-y-[1px] divide-[#55E0FF]/50"
      >
        {StudentPartners.map((partner, i) => (
          <div
            key={i}
            className="px-16 py-8 flex flex-row justify-between w-1/2 brightness-[1.2]"
          >
            <div className="flex flex-row gap-8 items-center leading-tight w-full">
              <img
                src={partner.logo}
                className="max-h-[75px] h-auto min-w-[75px]"
              />
              <div>
                <p>{partner.name}</p>
                <p>{partner.school}</p>
              </div>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <a
                className="flex h-5 hover:opacity-50"
                target="_blank"
                href={partner.instagram}
              >
                <img src="/instagram-icon.svg" />
              </a>
              {partner.website ? (
                <a className="flex h-5 hover:opacity-50" href={partner.website}>
                  <img src="/link-icon.svg" />
                </a>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      {/* ORGANIZING TEAM */}
      <BlurredSeperator />
      <SectionTitle>ORGANIZING TEAM</SectionTitle>
      <BlurredSeperator />
      <div className="flex flex-col items-start gap-[24px] w-[100%] relative">
        <div
          className={`min-h-[350px] w-[100%] text-left`}
        >
          <motion.div
            id="oraganizing-team-id"
            initial={{ x: 0 }}
            animate={controls}
            transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
            className={`flex gap-[24px] absolute ${true ? "" : "right-0"} divide-x-[1px] divide-[#55E0FF]/50`}
            onHoverStart={pauseAnimation}
            onHoverEnd={resumeAnimation}
          >
            {carouselTeam.map((person, i) => (
              <div
                className="flex flex-col justify-center items-center py-8 px-16 gap-4 min-w-[280px] xl:min-w-[320px]"
                key={i}
              >
                <img
                  src={person.headshot}
                  alt={`Headshot of ${person.name}`}
                  className="h-[150px] rounded-full border-[#55E0FF]/50 border-[1px] object-cover bg-gradient-to-t from-[#55E0FF]/50 to-[#55E0FF]/0"
                />
                <div className="text-center">
                  <p
                    className={`${
                      person.name.length > 13 ? `!text-[13pt]` : "text-2xl"
                    } font-normal`}
                  >
                    {person.name}
                  </p>
                  <p className="text-sm">{person.title}</p>
                </div>
                <a
                  target="_blank"
                  className="hover:opacity-50"
                  href={person.linkedin}
                >
                  <img src="/linkedin-icon.svg" className="h-5" />
                </a>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <BlurredSeperator />
    </main>
  );
}

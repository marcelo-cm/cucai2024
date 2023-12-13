"use client";

import Image from "next/image";
import { IBM_Plex_Sans } from "next/font/google";
import { ReactNode, useEffect, useState } from "react";

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
      <div className={`absolute top-0 ${className} blur-md opacity-80`}>
        {children}
      </div>
    </div>
  );
};

export default function Home() {
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
      className={`${IBMPlexSans.className} h-full w-[100dvw] overflow-y-scroll pt-16 lg:pt-24 gap-8 flex flex-col items-center justify-between z-10`}
    >
      <div className="flex flex-col gap-2 items-center">
        <BlurredText
          className="
          text-cyan-300
          text-[10pt]
          md:text-[2vw]
          xl:text-[1.5vw]
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
          text-[20vw]
          leading-none
          text-center
          md:text-[10vw]
          font-bold
          font-['IBM
          Plex
          Sans']
          leading-[153px]
          tracking-[8px]"
        >
          CUCAI 2024
        </BlurredText>
        <BlurredText
          className="
          text-cyan-300
          text-[10pt]
          md:text-[2vw]
          xl:text-[1.5vw]
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
        <BlurredText className="flex flex-row gap-8 items-center justify-center mt-2 md:mt-0">
          <a href="mailto:chair@cucai.ca">
            <img src="/email-icon.svg" className="h-4" />
          </a>
          <a href="https://www.instagram.com/cucai2024/">
            <img src="/instagram-icon.svg" className="h-5" />
          </a>
          <a href="https://www.linkedin.com/company/canadian-undergraduate-conference-on-artificial-intelligence/">
            <img src="/linkedin-icon.svg" className="h-5" />
          </a>
        </BlurredText>
      </div>
      <CountdownTimer />
      <div className="w-full md:w-4/5 xl:w-3/5 md:h-[60%] bg-gradient-to-b from-sky-200 to-sky-200/0 rounded-t-3xl pt-4 px-4">
        <video
          className="rounded-t-xl w-full h-full object-cover"
          src="/cucai2023-fullrecap.mp4"
          controls
          autoPlay
          loop
        />
      </div>
    </main>
  );
}

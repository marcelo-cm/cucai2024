import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Nunito_Sans } from "next/font/google";
import { useUser } from "@/app/dashboard/template";

const NunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const PayTicketPopUp = () => {
  const { ticket } = useUser();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (ticket?.status === "Accepted") {
      setIsOpen(true);
    }
  }, [ticket]);

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className={`${NunitoSans.className} text-blumine-50 flex flex-col gap-4 h-fit bg-blumine-800 p-8 border-0 !rounded-none`}
      >
        <DialogTitle className="text-blumine-50 text-2xl">
          You're in!
        </DialogTitle>
        <DialogDescription className="text-blumine-50">
          Congrats! You've been accepted to CUCAI 2025, Canada's largest
          undergraduate conference on artificial intelligence. We're pumped to
          see you. All that's left is to pay for your ticket, and you're all
          set.
        </DialogDescription>
        <Button>Purchase now!</Button>
        <DialogClose asChild>
          <Button onClick={() => setIsOpen(false)} variant={"secondary"}>
            I will purchase it before my expiration date!
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default PayTicketPopUp;

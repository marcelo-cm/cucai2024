"use client";

import React, { useState } from "react";
import { useUser } from "./template";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AcceptTicket = () => {
  const { user, ticket, supabase, masterSettings } = useUser();

  if (!user || !supabase || !ticket || !masterSettings) {
    return null;
  }

  const [hotelData, setHotelData] = useState<HotelRoom[]>([]);
  const [currentRoom, setCurrentRoom] = useState<
    [HotelRoom, number] | [null, null]
  >([null, null]);

  const fetchHotelData = async () => {
    const { data: hotelRes, error: hotelError } = await supabase
      .from("hotel")
      .select("*");

    if (hotelError) {
      console.error("Error fetching hotel data", hotelError);
      return;
    }

    const sortedHotels = hotelRes.sort((a: HotelRoom, b: HotelRoom) => {
      return a.id - b.id;
    });

    setHotelData(sortedHotels);
  };

  const fetchDelegateProfile = async () => {
    const { data: delegateProfileRes, error: delegateProfileError } =
      await supabase
        .from("delegates")
        .select("*")
        .eq("user_id", user.id)
        .single();

    if (delegateProfileError) {
      console.error("Error fetching delegate profile", delegateProfileError);
      return;
    }

    console.log("Delegate profile", delegateProfileRes);
    return delegateProfileRes;
  };

  if (ticket.status !== "Paid" || ticket.hotel_claimed) {
    window.location.href = "/dashboard";
    return null;
  } else {
    fetchHotelData();
  }

  const updateHotel = async (roomID: number | undefined) => {
    if (typeof roomID == "undefined") {
      console.error("Room ID is undefined");
      return;
    }

    const delegateProfile: DelegateProfile = await fetchDelegateProfile();

    if (!delegateProfile) {
      return;
    }

    const { data, error } = await supabase
      .from("hotel")
      .update({
        [`occupant_${currentRoom[1]}`]: {
          status: "Occupied",
          name: delegateProfile.first_name + " " + delegateProfile.last_name,
          school: delegateProfile.school,
          year: delegateProfile.grad_year,
          gender: delegateProfile.gender,
        },
      })
      .eq("id", roomID);

    if (error) {
      console.error("Error updating hotel room", error);
      return;
    }
    console.log("Hotel room updated");

    const { data: ticketRes, error: ticketError } = await supabase
      .from("tickets")
      .update({ hotel_claimed: true })
      .eq("ticket_id", ticket.ticket_id);

    if (ticketError) {
      console.error("Error updating ticket status", ticketError);
      return;
    }
    console.log("Ticket updated");

    window.location.href = "/dashboard";
  };

  return (
    <AlertDialog>
      <AlertDialogContent
        className={`text-blumine-50 flex flex-col gap-4 h-fit bg-blumine-800 p-8 border-0 !rounded-none absolute`}
      >
        <AlertDialogTitle className="text-blumine-50 text-2xl">
          Confirm Hotel Room Selection
        </AlertDialogTitle>
        <AlertDialogDescription className="text-blumine-50">
          Are you sure you want to claim Room {currentRoom[0]?.id}
          {currentRoom[0]?.occupant_1.status == "Occupied"
            ? ", with " + currentRoom[0].occupant_1.name + "as your roommate"
            : currentRoom[0]?.occupant_2.status == "Occupied"
            ? ", with " + currentRoom[0]?.occupant_1.name + "as your roommate"
            : null}
          ?
        </AlertDialogDescription>
        <Button onClick={() => updateHotel(currentRoom[0]?.id)}>
          Yes, I'm pumped!
        </Button>
        <AlertDialogCancel asChild>
          <Button
            variant={"secondary"}
            className="bg-blumine-950 border-2 border-blumine-900 text-blumine-50 font-semibold hover:bg-blumine-950/60 hover:text-white"
            onClick={() => setCurrentRoom([null, null])}
          >
            Never mind, go back!
          </Button>
        </AlertDialogCancel>
      </AlertDialogContent>
      <div className="flex flex-col gap-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Room Number</TableCell>
              <TableCell>Occupant #1</TableCell>
              <TableCell>Occupant #2</TableCell>
            </TableRow>
          </TableHeader>
          {hotelData.map((room, index) => (
            <TableRow key={index}>
              <TableCell>{room.id}</TableCell>
              <TableCell
                className={`${
                  room.occupant_1.status == "Available"
                    ? "bg-jewel-700 p-0"
                    : null
                } min-w-[200px]`}
              >
                {room.occupant_1.status === "Available" ? (
                  <AlertDialogTrigger asChild>
                    <Button
                      variant={"ghost"}
                      className="hover:bg-jewel-500 hover:text-white w-full h-full"
                      onClick={() => {
                        setCurrentRoom([room, 1]);
                      }}
                    >
                      Claim Room
                    </Button>
                  </AlertDialogTrigger>
                ) : room.occupant_1.status === "Occupied" ? (
                  <div className="p-1">
                    <div>{room.occupant_1.name}</div>
                    <div>{room.occupant_1.school}</div>
                    <div className="flex flex-row gap-2 mt-2">
                      <div className="rounded-full text-xs bg-blumine-700 w-fit h-fit px-3 py-1">
                        {room.occupant_1.gender}
                      </div>
                      <div className="rounded-full text-xs bg-blumine-700 w-fit h-fit px-3 py-1">
                        {room.occupant_1.year}
                      </div>
                    </div>
                  </div>
                ) : (
                  "Unavailable"
                )}
              </TableCell>
              <TableCell
                className={`${
                  room.occupant_2.status == "Available"
                    ? "bg-jewel-700 p-0"
                    : null
                } min-w-[200px]`}
              >
                {room.occupant_2.status === "Available" ? (
                  <AlertDialogTrigger asChild>
                    <Button
                      variant={"ghost"}
                      className="hover:bg-jewel-500 hover:text-white w-full"
                      onClick={() => {
                        setCurrentRoom([room, 2]);
                      }}
                    >
                      Claim Room
                    </Button>
                  </AlertDialogTrigger>
                ) : room.occupant_2.status === "Occupied" ? (
                  <div className="p-1">
                    <div>{room.occupant_2.name}</div>
                    <div>{room.occupant_2.school}</div>
                    <div className="flex flex-row gap-2 mt-2">
                      <div className="rounded-full text-xs bg-blumine-700 w-fit h-fit px-3 py-1">
                        {room.occupant_2.gender}
                      </div>
                      <div className="rounded-full text-xs bg-blumine-700 w-fit h-fit px-3 py-1">
                        {room.occupant_2.year}
                      </div>
                    </div>
                  </div>
                ) : (
                  "Unavailable"
                )}
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </div>
    </AlertDialog>
  );
};

export default AcceptTicket;

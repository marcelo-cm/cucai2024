import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import React from "react";

/**
 * A component that displays the status of a hotel room, whether it is available, occupied, or unavailable.
 * Allows the user to claim the room if it is available.
 * @param room the room whose status is to be displayed
 * @param occupant the occupant of the room, if any exists
 * @param setCurrentRoom a function to set the current room when the room is claimed
 * @returns a component that displays the status of a hotel room, and allows the user to claim the room if it is available
 */
const HotelRoomStatus = ({
  room,
  occupant,
  setCurrentRoom,
}: {
  room: HotelRoom;
  occupant: {
    status: "Occupied" | "Available" | "Unavailable";
    name?: string | undefined;
    school?: string | undefined;
    year?: string | undefined;
    gender?: string | undefined;
  };
  setCurrentRoom: (room: [HotelRoom, number]) => void;
}) => {
  return (
    <div>
      {occupant.status === "Available" ? (
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
      ) : occupant.status === "Occupied" ? (
        <div className="p-1">
          <div>{occupant.name}</div>
          <div>{occupant.school}</div>
          <div className="flex flex-row gap-2 mt-2">
            <div className="rounded-full text-xs bg-blumine-700 w-fit h-fit px-3 py-1">
              {occupant.gender}
            </div>
            <div className="rounded-full text-xs bg-blumine-700 w-fit h-fit px-3 py-1">
              {occupant.year}
            </div>
          </div>
        </div>
      ) : (
        "Unavailable"
      )}
    </div>
  );
};

export default HotelRoomStatus;

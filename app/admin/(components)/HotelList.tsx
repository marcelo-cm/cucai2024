import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SupabaseClient } from "@supabase/supabase-js";

/**
 * The list of hotel rooms and their occupants. Similar to HotelDashboard, but only displays status of rooms
 * and cannot edit them
 * @param supabase The Supabase client
 * @returns A component that displays the hotel room list
 */
const HotelList = ({ supabase }: { supabase: SupabaseClient }) => {
  const [hotelData, setHotelData] = useState<HotelRoom[]>([]);

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

  useEffect(() => {
    fetchHotelData();
  }, []);

  return (
    <div className="w-full flex justify-center pb-4">
      <div className="w-fit">
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
                    ? "bg-jewel-700 p-0 text-center"
                    : null
                } min-w-[200px]`}
              >
                {room.occupant_1.status === "Available" ? (
                  "Available"
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
                    ? "bg-jewel-700 p-0 text-center"
                    : null
                } min-w-[200px]`}
              >
                {room.occupant_2.status === "Available" ? (
                  "Available"
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
    </div>
  );
};

export default HotelList;

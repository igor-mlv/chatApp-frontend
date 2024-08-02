import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { CircleUserRound } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area"
import socket from '@/lib/socket';
import { updateUserRooms } from '@/redux/slices/userSlice';
import React from 'react';
import { setDisplayedRoom } from '@/redux/slices/displayedRoom';
import { RoomDataBaseType, setRooms } from '@/redux/slices/roomsSlice';

function Rooms() {
    // Initialize the dispatch function from the Redux store
    const usedispatch = useDispatch();

    const roomsDatabase = useSelector((state: RootState) => state.roomsDatabase);

    // Set up a side effect to listen for the "updateRoomsList" event from the socket
    React.useEffect(() => {
        // When the "updateRoomsList" event is received, dispatch an action to update the user rooms in the Redux store
        socket.on("updateRoomsList", (rooms: string[]) => {
            usedispatch(updateUserRooms(rooms));
        });

        // When the "updateRoomsDatabase" event is received, dispatch an action to update the rooms database in the Redux store
        socket.on("updateRoomsDatabase", (ROOMS_DATABASE: RoomDataBaseType[]) => {
            usedispatch(setRooms(ROOMS_DATABASE));
        })

        // Clean up the effect by removing the event listener when the component is unmounted or dependencies change
        return () => {
            socket.off("updateRoomsList");
        }
    }, [usedispatch]);

    // Define a function to handle room click events
    const handleRoomClick = (room: string) => {
        // Dispatch an action to set the displayed room in the Redux store
        usedispatch(setDisplayedRoom(room));
    };

    // Select the user state from the Redux store
    const currentUser = useSelector((state: RootState) => state.user);

    // If the user has only one room, automatically select it
    React.useEffect(() => {
        if (currentUser.rooms.length === 1) {
            handleRoomClick(currentUser.rooms[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);

    const handleRoomName = (room: string) => {
        const usersInCurrentRoom = roomsDatabase.find((roomData) => roomData.id === room)?.users;
        if (usersInCurrentRoom) {
            const roomName = usersInCurrentRoom.filter((user) => user !== currentUser.userName);
            return roomName.join(", ");
        }
    }

    return (
        <ScrollArea className='w-full h-full flex flex-col'>
            {currentUser.rooms.map((room) => (
                <div
                    key={room}
                    className='flex justify-between items-center bg-card border-b-4 border-background px-[20px] py-[10px] rounded-[20px] mx-[20px]'
                    onClick={() => handleRoomClick(room)}>
                    <CircleUserRound size={50} />
                    <p className='text-[20px] max-w-[330px] break-words text-right'>{handleRoomName(room)}</p>
                </div>
            ))}
        </ScrollArea>
    )
}

export default Rooms
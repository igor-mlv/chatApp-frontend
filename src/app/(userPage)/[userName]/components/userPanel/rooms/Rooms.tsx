import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { CircleUserRound } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area"
import socket from '@/lib/socket';
import { updateUserRooms } from '@/redux/slices/userSlice';
import React from 'react';
import { setDisplayedRoom } from '@/redux/slices/displayedRoom';

function Rooms() {
    // Initialize the dispatch function from the Redux store
    const usedispatch = useDispatch();

    // Set up a side effect to listen for the "updateRoomsList" event from the socket
    React.useEffect(() => {
        // When the "updateRoomsList" event is received, dispatch an action to update the user rooms in the Redux store
        socket.on("updateRoomsList", (rooms: string[]) => {
            usedispatch(updateUserRooms(rooms));
        });

        // Clean up the effect by removing the event listener when the component is unmounted or dependencies change
        return () => {
            socket.off("updateRoomsList");
        }
    }, [usedispatch]);

    // Select the user state from the Redux store
    const user = useSelector((state: RootState) => state.user);

    // Define a function to handle room click events
    const handleRoomClick = (room: string) => {
        // Dispatch an action to set the displayed room in the Redux store
        usedispatch(setDisplayedRoom(room));
    };

    return (
        <ScrollArea className='w-full h-full flex flex-col'>
            {user.rooms.map((room) => (
                <div
                    key={room}
                    className='flex justify-between items-center bg-card border-b-4 border-background px-[20px] py-[10px] rounded-[20px]'
                    onClick={() => handleRoomClick(room)}>
                    <CircleUserRound size={50} />
                    <p className='text-[20px]'>{room.substring(0, 8)}</p>
                </div>
            ))}
        </ScrollArea>
    )
}

export default Rooms
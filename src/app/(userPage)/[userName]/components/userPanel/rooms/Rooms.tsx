import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { CircleUserRound } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area"

function Rooms() {
    const user = useSelector((state: RootState) => state.user);
    return (
        <ScrollArea className='w-full h-full flex flex-col'>
            {user.rooms.map((room) => (
                <div key={room} className='flex justify-between items-center bg-card border-b-4 border-background px-[20px] py-[10px] rounded-[20px]'>
                    <CircleUserRound size={50} />
                    <p className='text-[20px]'>Friend 1</p>
                </div>
            ))}
        </ScrollArea>
    )
}

export default Rooms
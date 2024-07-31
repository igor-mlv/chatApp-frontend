import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { CircleUserRound } from 'lucide-react';

function Rooms() {
    const user = useSelector((state: RootState) => state.user);
    return (
        <div className='w-full flex flex-col'>
            {user.rooms.map((room) => (
                <div key={room} className='flex justify-around items-center bg-card border-b-4 border-background'>
                    <CircleUserRound size={50} />
                    <p className='text-[20px] bg-customGradient'>Friend 1</p>
                </div>
            ))}
        </div>
    )
}

export default Rooms
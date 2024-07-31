import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import React from 'react';
import UsersList from './dialog/UsersList';


function NewChat() {
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);

    const handleOnCancel = () => {
        setIsDialogOpen(false);
    }

    return (
        <div className='w-full flex justify-center items-center'>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
                <DialogTrigger asChild>
                    <Button className='w-[150px] text-[18px]'>
                        New Chat
                    </Button>
                </DialogTrigger>
                <DialogContent className="w-[500px] h-[85vh] gap-0 flex flex-col items-start ">
                    <DialogTitle className="w-full text-text text-[26px] text-center">
                        Create a new chat
                    </DialogTitle>
                    <DialogDescription />

                    <UsersList />

                    <div className='w-full flex flex-row justify-between'>
                        <Button
                            variant="outline"
                            className="w-[110px] h-[38px] text-[18px]"
                            onClick={handleOnCancel}>
                            CANCEL
                        </Button>

                        <Button className="w-[110px] h-[38px] text-[18px]"
                        >
                            APPLY
                        </Button>
                    </div>

                </DialogContent>
            </Dialog>
        </div>
    )
}

export default NewChat
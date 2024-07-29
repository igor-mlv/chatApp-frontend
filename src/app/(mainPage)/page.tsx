"use client"
import MainContainer from '@/components/mainContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';

export default function Home() {

  const [value, setValue] = React.useState('');

  const handleOnChange = (event: { target: { value: string; }; }) => {
    setValue(event.target.value);
  };


  return (
    <MainContainer>
      <div className="flex flex-col justify-center items-center h-[80vh]">
        <h2 className="text-[32px]">Welcome to ChatApp</h2>

        <Input
          placeholder="Type your user name"
          onChange={handleOnChange}
          className=" w-full max-w-[550px] mt-[20px]" />

        <div className='flex flex-col mt-[40px] w-[150px] space-y-6'>
          <Button variant="default">
            Register
          </Button>

          <Button variant="outline">
            Login
          </Button>
        </div>

      </div>
    </MainContainer>

  );
}

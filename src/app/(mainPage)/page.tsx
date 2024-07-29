"use client";
import MainContainer from '@/components/mainContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';
import { useRouter } from 'next/navigation';
import handleLogin from './handlers/handleLogin';
import handleRegister from './handlers/handleRegister';

export default function Home() {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState('');
  const router = useRouter();

  const handleOnChange = (event: { target: { value: string; }; }) => {
    setValue(event.target.value);
  };

  const handleRegisterClick = async () => {
    const user = await handleRegister({ value, setError });
    if (user) {
      router.push(`/${user.userName}`);
    }
  };

  const handleLoginClick = async () => {
    const user = await handleLogin({ value, setError });
    if (user) {
      router.push(`/${user.userName}`);
    }
  };

  return (
    <MainContainer>
      <div className="flex flex-col justify-center items-center h-[80vh]">
        <h2 className="text-[32px]">Welcome to ChatApp</h2>

        <Input
          placeholder="Type your user name"
          onChange={handleOnChange}
          className="w-full max-w-[550px] mt-[20px]"
        />

        {error && <p className="text-red-500 mt-[10px]">{error}</p>}

        <div className='flex flex-col mt-[40px] w-[150px] space-y-6'>
          <Button variant="default" onClick={handleRegisterClick}>
            Register
          </Button>

          <Button variant="outline" onClick={handleLoginClick}>
            Login
          </Button>
        </div>
      </div>
    </MainContainer>
  );
}

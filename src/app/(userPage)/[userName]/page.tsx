"use client";

import React from 'react'
import MainContainer from "@/components/mainContainer";
import socket from '@/lib/socket';
import UserPanel from './components/userPanel/UserPanel';
import ChatPanel from './components/chatPanel/ChatPanel';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/slices/userSlice';
import isLoggedIn from './lib/isLoggedIn';
import { useRouter } from 'next/navigation';
import { RootState } from '@/redux/store';


function UserPage({ params }: { params: { userName: string } }) {
  //provide user to redux store
  const dispatch = useDispatch();
  dispatch(setUser(params.userName))

  const user = useSelector((state: RootState) => state.user);

  //loading: true - do not show current page
  //loading: false - show current page
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    const checkLoginStatus = async () => {
      const isUserLoggedIn = await isLoggedIn(user.userName);

      if (!isUserLoggedIn) {
        router.push(`/`);
      } else {
        //user logged in

        //show user page
        setLoading(false);

        //connect socket
        socket.connect;
      }
    };

    checkLoginStatus();
  }, [user, router]);

  return (
    <MainContainer>
      {loading ? <p className='text-center mt-[40px]'>Loading...</p>
        :
        <div className='h-[100vh] flex flex-row'>
          <UserPanel />
          <ChatPanel />
        </div>
      }

    </MainContainer>
  );
}

export default UserPage;

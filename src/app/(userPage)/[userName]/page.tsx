"use client";

import React from 'react'
import MainContainer from "@/components/mainContainer";
import socket from '@/lib/socket';
import UserPanel from './components/userPanel/UserPanel';
import ChatPanel from './components/chatPanel/ChatPanel';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/slices/userSlice';
import isLoggedIn from './lib/isLoggedIn';
import { useRouter } from 'next/navigation';
import getUser from './lib/getUser';


function UserPage({ params }: { params: { userName: string } }) {
  const dispatch = useDispatch();

  //loading: true - do not show current page
  //loading: false - show current page
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    const checkLoginStatus = async () => {
      const isUserLoggedIn = await isLoggedIn(params.userName);

      if (!isUserLoggedIn) {
        router.push(`/`);
      } else {
        //user logged in

        //show user page
        setLoading(false);

        //connect socket
        socket.connect();

        try {
          // get User object from server database 
          const user = await getUser(params.userName);

          // Dispatch the user data to Redux store
          dispatch(setUser(user));
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }

      }
    };

    checkLoginStatus();
    return () => {
      socket.disconnect();
    };
  }, [params.userName, router, dispatch]);




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

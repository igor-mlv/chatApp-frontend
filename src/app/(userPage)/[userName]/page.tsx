"use client";

import React from 'react'
import MainContainer from "@/components/mainContainer";
import socket from '@/lib/socket';
import UserPanel from './components/userPanel/UserPanel';
import ChatPanel from './components/chatPanel/ChatPanel';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/slices/userSlice';
import isLoggedIn from './services/isLoggedIn';
import { useRouter } from 'next/navigation';
import getUser from './services/getUser';
import { RootState } from '@/redux/store';


function UserPage({ params }: { params: { userName: string } }) {
  const user = useSelector((state: RootState) => state.user);
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
        try {
          // get User object from server database 
          const userObject = await getUser(params.userName);

          // Dispatch the user data to Redux store
          dispatch(setUser(userObject));
        } catch (error) {
          return console.error("Failed to fetch user data:", error);
        }

        //show user page
        setLoading(false);

        //connect socket
        socket.connect();

        socket.emit("setUserIDtoSocketID", user.id);

      }
    };

    checkLoginStatus();
    return () => {
      socket.disconnect();
    };
  }, [params.userName, router, dispatch, user.id]);




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

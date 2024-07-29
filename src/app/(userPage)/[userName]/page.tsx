"use client";
import MainContainer from "@/components/mainContainer";
import { useRouter } from 'next/navigation'

function userPage({ params }: { params: { userName: string } }) {

  console.log(params);
  return (
    <MainContainer>
      <div>{params.userName}</div>
    </MainContainer>
  );
}

export default userPage;

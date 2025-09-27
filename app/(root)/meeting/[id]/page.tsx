"use client"
import { Loader } from '@/components/Loader';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetUp from '@/components/MeetingSetUp';
import { useGetCallById } from '@/hooks/getCallById';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React from 'react'
import { useState,useEffect } from 'react'
const page = ({params} : {params : {id : string}}) => {
  const {id} = params
  const {user , isLoaded} = useUser()
  const [isSetUpComplete , setIsSetUpComplete] = useState(false)
  const {call , isCallLoading} = useGetCallById(id)

  if (!isLoaded ||   isCallLoading) return <Loader />


  return (
    <main className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
          {
            ! isSetUpComplete ? (
              <MeetingSetUp setIsSetUpComplete = {setIsSetUpComplete}/>
            ) : (
              <MeetingRoom />
            )
          }
        </StreamTheme>
      </StreamCall>

    </main>
  )
}

export default page
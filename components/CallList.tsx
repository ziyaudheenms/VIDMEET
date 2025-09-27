'use client'
import { useGetCall } from '@/hooks/useGetCalls'
import { CallRecording } from '@stream-io/node-sdk'
import { Call } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import MeetingCards from './MeetingCards'
import { log } from 'console'
import { toast } from 'sonner'
import { Loader } from './Loader'

const CallList = ({type} : {type:'ended' | 'upcoming'  | 'recordings'}) => {
    const {endedCalls , upcomingCalls ,Callrecordings , isLoading} = useGetCall()
    const router = useRouter()
    const [recording , setRecording] = useState<CallRecording[]>([])

    const getCalls = () => {
        switch(type) {
            case 'ended':
                console.log(endedCalls)
                return endedCalls;
            case 'upcoming':
                return upcomingCalls;
            case 'recordings':
                return Callrecordings;
            default:
                return [];
        }
    }

    const getNoMessages = () => {
        switch(type) {
            case 'ended':
                return "No Previous Calls";
            case 'upcoming':
                return "No Upcoming Calls";
            case 'recordings':
                return 'No Recordings';
            default:
                return '';
        }
    }


    const calls = getCalls()
    const noCallMessages = getNoMessages()

    if(isLoading){
        return(
            <Loader />
        )
    }
  return (
    <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
         {calls && calls.length > 0 ? (
            calls.map((meeting: Call | CallRecording, idx: number) => {
                    return (
                <MeetingCards key={idx} 
                icon = { type === 'ended' ? 'https://img.icons8.com/?size=100&id=duNoYr3ziAM5&format=png&color=000000' : type === 'upcoming' ? 'https://img.icons8.com/?size=100&id=Hdp8yKwPRCMR&format=png&color=000000' : 'https://img.icons8.com/?size=100&id=afBn2fMYRJcD&format=png&color=000000'}
                title = {(meeting as Call).state?.custom?.desc || meeting?.filename?.substring(0,20) || "Personal Meeting"}
                date={(meeting as Call).state?.startsAt.toLocaleString()}
                isPreviousMeeting =  {type === 'ended'}
                isRecordings =  {type === 'recordings'}
                link = {type === 'recordings' ? meeting.url : `/meeting/${meeting.id}`}

                />
                )
})
         ) : (
            <h1>{noCallMessages}</h1>
         )}
    </div>
  )
}

export default CallList
"use client"
import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk'
import React from 'react'
import { useState,useEffect } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter, useSearchParams } from 'next/navigation'
import EndCallButton from './EndCallButton'
import { Loader } from './Loader'


type CallLayoutType = 'speaker-left' | 'speaker-right' | 'grid'

const MeetingRoom = () => {
    const searchParam = useSearchParams()
    const isPersonalRoom = !!searchParam.get('personal')
    const [layout ,setLayout] = useState<CallLayoutType>('speaker-left')
    const [showParticipants , setShowParticipants] = useState(false)
    const {useCallCallingState} = useCallStateHooks()
    const callingState = useCallCallingState()
    const router = useRouter()
    if (callingState !== CallingState.JOINED) {
        return <Loader />
    }
    const CallLayout = () => {
        switch (layout) {
            case 'grid':
                return <PaginatedGridLayout />
        
            case 'speaker-left':
                return <SpeakerLayout participantsBarPosition="right"/>
            default:
                return <SpeakerLayout participantsBarPosition="left"/>
        }
    }
  return (
    <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
        <div className='relative flex size-full items-center justify-center'>
            <div className='flex size-full max-w-[1000px] items-center'>
                <CallLayout />
                <div className={`h-[calc(100vh-86px)] ml-2 ${showParticipants ? 'block' : 'hidden'}`}>
                    <CallParticipantsList onClose={() => setShowParticipants(false )}/>

                </div>
            </div>
            <div className='fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap'>
                <CallControls onLeave={() => {
                    router.push('/')
                }}/>

                <DropdownMenu >

                    <div className='flex items-center'>
                        <DropdownMenuTrigger className='p-2 bg-[#19232d] rounded-full cursor-pointer'><img src="https://img.icons8.com/?size=100&id=ZeY6kfWZMM5R&format=png&color=FFFFFF" className='h-7 w-7' alt="" /></DropdownMenuTrigger>
                    </div>  
                    <DropdownMenuContent className='bg-[#19232d] text-white'>
                        <DropdownMenuLabel>Select The Layout</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => {
                            setLayout('speaker-left')
                        }}>speaker-left</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                            setLayout('speaker-right')
                        }}>speaker-right</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                            setLayout('grid')
                        }}>grid</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <CallStatsButton />
                <div className='flex p-2 bg-[#19232d] rounded-full'>
                        <img src="https://img.icons8.com/?size=100&id=cykh8BZMTKkb&format=png&color=FFFFFF" alt=""  className='text-white h-6 w-6' onClick={() => {
                            setShowParticipants(!showParticipants)
                        }}/>
                </div>
                {!isPersonalRoom && <EndCallButton />}


            </div>
        </div>
    </section>
  )
}

export default MeetingRoom
"use client"
import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

const MeetingSetUp = ({setIsSetUpComplete} : {setIsSetUpComplete : (value : boolean) => void}) => {
    const [isMicCamToggledOn , setIsMicCamToggledOn] = useState(false)

    const call = useCall()
    useEffect(() => {
        if (isMicCamToggledOn){
            call?.camera.disable()
            call?.microphone.disable()
        } 
        else{
            call?.camera.enable()
            call?.microphone.enable()
        }
    },[isMicCamToggledOn , call?.camera , call?.microphone])

    if (!call) throw new Error('Use Call must be used in the UseStreamCall component')
  return (
    <div className='h-screen w-full flex flex-col items-center justify-center xl:p-32  gap-3 text-white'>
        <h1 className='text-2xl font-bold'>SetUp</h1>
        <VideoPreview className='xl: w-[80%]'/>
        <div className='flex h-16 items-center justify-center gap-3'>
            <label className='flex items-center gap-2 font-medium justify-center'>
                <input 
                type="checkbox"
                checked={isMicCamToggledOn}
                onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
                />
                Join with mic and camera off
            </label>
            <DeviceSettings />
        </div>
        <Button className='px-20 py-5 bg-red-500' onClick={() => {
            call.join();
            setIsSetUpComplete(true)
        }}>
            Join Meeting
        </Button>
    </div>
  )
}

export default MeetingSetUp
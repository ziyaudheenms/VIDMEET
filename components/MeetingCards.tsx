'use client'

import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

interface MeetingCardsProps {
  icon : string,
  title : string,
  date:string,
  isPreviousMeeting? : boolean,
  isRecordings? : boolean
  link : string

}

const MeetingCards = ({icon, title, date, isPreviousMeeting, link , isRecordings}: MeetingCardsProps) => {
  const router = useRouter()
  return (
    <div className='bg-[#0d1221] rounded-lg px-6 py-8'>
      <div className='p-1 rounded-md bg-blue-500 inline-block'>
      <img src={icon} className='h-8 w-8 ' alt="" />
      </div>
      <div className='py-3'>
        <h1 className='font-bold text-2xl font-sans'>{title}</h1>
        <p className='font-sans py-2'>{date}</p>
      </div>
      <div className='flex items-center justify-between '>
        <div className='flex'>
          <img src="https://img.icons8.com/?size=100&id=0lg0kb05hrOz&format=png&color=000000" className='h-10 w-10 bg-white rounded-full' alt="" />
          <img src="https://img.icons8.com/?size=100&id=0lg0kb05hrOz&format=png&color=000000" className='h-10 w-10 bg-green-400 rounded-full ml-[-4px]' alt="" />
          <img src="https://img.icons8.com/?size=100&id=0lg0kb05hrOz&format=png&color=000000" className='h-10 w-10 bg-black rounded-full ml-[-4px]' alt="" />
          <img src="https://img.icons8.com/?size=100&id=0lg0kb05hrOz&format=png&color=000000" className='h-10 w-10 bg-red-400 rounded-full ml-[-4px]' alt="" />
        </div>
        {
          isPreviousMeeting ? (
            <div></div>
          ) : isRecordings ? (
            <div className='flex gap-3'>
              <Button className='bg-blue-500 font-sans' onClick={() => {
                router.push(link)
              }}>
                <img src="https://img.icons8.com/?size=100&id=AfE2E5YlZyjk&format=png&color=000000" alt="" className='h-6 w-6'/>
                Play</Button>
              <Button className='bg-gray-800 font-sans' onClick={() => {
                navigator.clipboard.writeText(link)
              }}>
                <img src="https://img.icons8.com/?size=100&id=11911&format=png&color=000000" className='h-5 w-5' alt="" />Copy Recording Link
              </Button>
            </div>
          ) :(
            <div className='flex gap-3'>
              <Button className='bg-blue-500 font-sans' onClick={() => {
                router.push(link)
              }}>Start</Button>
              <Button className='bg-gray-800 font-sans'>
                <img src="https://img.icons8.com/?size=100&id=11911&format=png&color=000000" className='h-5 w-5' alt="" />Copy Invitation
              </Button>
            </div>
          )
        }

      </div>
    </div>
  )
}

export default MeetingCards
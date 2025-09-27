"use client"
import React, { use } from 'react'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useGetCallById } from '@/hooks/getCallById'
import { useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
const Table = ({title , description} : {title:string , description:string}) => {
  return (
    <div className='flex items-center gap-2 flex-col xl:flex-row'>
    <h1 className=' text-xl font-sans'>{title}:</h1>
    <h1 className='font-medium  truncate'>{description}</h1>
    </div>
  )
}


const page = () => {
  const { user } = useUser();
  const meetingID = user?.id || "N/A"
  const meetingLink = `localhost:3000/meeting/${meetingID}?personal=true`
  const client = useStreamVideoClient()
  const {call} = useGetCallById(meetingID!)
  const router = useRouter()
   
  const startRoom = async () => {

    if (!client || !user) return;

    const newCall = client.call('default' , meetingID!)

    if (!call){
      await newCall.getOrCreate({
                data: {
                    starts_at: new Date().toISOString(),
                }
          })
    }

    router.push(`/meeting/${meetingID}?personal=true`)

    
  }
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <h1 className='text-3xl font-bold'>
      Personal Room
      </h1>
      <div className='w-full flex flex-col gap-8 xl:max-w-[900px]'>
        <Table title="Topic" description={`${user?.firstName}'s Personal Room`} />
        <Table title="Meeting ID" description={meetingID} />
        <Table title="Meeting Link" description={meetingLink} />
      </div>
      <div className='flex gap-5'>
        <Button className='bg-blue-600' onClick={startRoom}>
          Start The Meeting
        </Button>
        <Button className='bg-gray-800' onClick={() => {
          navigator.clipboard.writeText(`/meeting/${meetingID}?personal=true`)
          toast.success("Meeting Link Copied Successfully!")
        }}>
          <img src="https://img.icons8.com/?size=100&id=11911&format=png&color=000000" className='h-5 w-5' alt="" />Copy Meeting Link
        </Button>
      </div>
      </section>
  )
}

export default page
"use client"
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { toast } from "sonner"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from './ui/input'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Button } from './ui/button'
import { ChevronDownIcon } from 'lucide-react'
import { Calendar } from "@/components/ui/calendar"
import Swal from 'sweetalert2'
const MeetingList = () => {
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState(undefined)
    const [meetingLink , setMeetingLink] = useState('')
    const [meeting, Setmeeting] = useState('')
    const [desc , setDesc] = useState('')
    const [InviteMeetingLink , setInviteMeetingLink] = useState('')
    const router = useRouter()
    const { user } = useUser()
    const client = useStreamVideoClient();
    const [values, setvalues] = useState({
        dateTime: new Date(),
        description: '',
        link: ''
    })
    const [callDetails, setCallDetails] = useState()
    const startMeeting = async () => {
        if (!client || !user) return;
        try {
            const id = crypto.randomUUID();
            const call = client.call('default', id)

            if (!call) throw new Error('Failed to create the call')

            const startAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString()
            const description = values.description || "new instant meeting"

            await call.getOrCreate({
                data: {
                    starts_at: startAt,
                    custom: {
                        description
                    }
                }
            })

            setCallDetails(call)

            if (!values.description) {
                router.push(`/meeting/${call.id}`)
            }

            toast.success("Meeting Room Has created Successfully.")
        }
        catch (err) {
            console.log(err)
            toast.error("Opps ! cant able to create call.Try again later")
        }
    }

    const SheduleMeeting = async () => {
        console.log("entered")
        if (!client || !user) alert("no clinent");
        console.log("passed 1")
        try {
            const id = crypto.randomUUID();
            const call = client.call('default', id)

            if (!call) throw new Error('Failed to create the call')
            console.log("passed 2")
            
            const startAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString()
            const description = values.description || "new instant meeting"

            await call.getOrCreate({
                data: {
                    starts_at: date,
                    custom: {
                        desc
                    }
                }
            })
            console.log("passed 3")

            setCallDetails(call)
            console.log("passed 4")

            setMeetingLink(`http://localhost:3000/meeting/${call.id}`)
            
            if (meetingLink){
                Swal.fire({
                title: "Meeting Created successfully",
                text: `Your meeting for ${date}`,
                icon: "success"
                });
                navigator.clipboard.writeText(meetingLink)
            }         
            console.log("passed 5")
            console.log(meetingLink)
            toast.success("Meeting Room Has created Successfully.")
        }
        catch (err) {
            console.log(err)
            toast.error("Opps ! cant able to create call.Try again later")
        }
    }


    return (
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <div onClick={startMeeting}>
                <HomeCard icon="https://img.icons8.com/?size=100&id=Y2mKhNPGS0Cd&format=png&color=000000" title="New Meeting" disc="Start An Instant Meeting" color="bg-red-600" icon_clr='bg-red-500' handleClick={() => {
                    Setmeeting('IsInstant')
                }} /></div>
            <Popover>
                <PopoverTrigger >
                    <HomeCard icon="https://img.icons8.com/?size=100&id=LoSoc46PxwP6&format=png&color=000000" title="Schedule Meeting" disc="Plan Your Meeting" color="bg-blue-600" icon_clr='bg-blue-500' />
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <div className="grid gap-4 bg-[#0d1221]">
                        <div className="space-y-2">
                            <h4 className="leading-none font-medium">Shedule Your Meeting With Us</h4>
                            <p className="text-muted-foreground text-sm">

                            </p>
                        </div>
                        <div className="grid gap-2">
                            <div className="grid items-center gap-2">
                                <Label htmlFor="width">Description</Label>
                                <textarea
                                    id="text"   
                                    className="col-span-2 h-8 border-neutral-800 rounded-md p-1 outline-0 border-2"
                                    value={desc}
                                    onChange={(e) => {
                                        setDesc(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="grid items-center gap-2">
                                <Label htmlFor="width">Select the date</Label>
                                {/* <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        <Label htmlFor="date-picker" className="px-1">
          Date
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="w-32 justify-between font-normal"
            >
              {date ? date.toLocaleDateString() : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
           
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="time-picker" className="px-1">
          Time
        </Label>
        <Input
          type="time"
          id="time-picker"
          step="1"
          defaultValue="10:30:00"
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div> */}
                                <Popover>
                                    <PopoverTrigger>
                                        <div
                                            variant="outline"
                                            id="date-picker"
                                            className="justify-between font-normal flex"
                                        >
                                            {date ? date.toLocaleDateString() : "Select date"}
                                            <ChevronDownIcon />
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            captionLayout="dropdown"
                                            onSelect={(date) => {
                                                setDate(date)
                                                setOpen(false)
                                            }}
                                        />
                                    </PopoverContent>
                                </Popover>
                                <div onClick={SheduleMeeting}>
                                <Button className='bg-[#1b4ee7]'> <img src="https://img.icons8.com/?size=100&id=CcnMefzl28xf&format=png&color=000000" className='h-7 w-7' alt="" onClick={SheduleMeeting}/>Shedule Meeting</Button></div>
                            </div>
                        </div>
                    </div>
                </PopoverContent>

            </Popover>
            <HomeCard icon="https://img.icons8.com/?size=100&id=kZ60xjJXDztQ&format=png&color=000000" title="View Recording" disc="Check Out Your Recordings" color="bg-green-600" icon_clr='bg-green-500' handleClick={() => {
                router.push('/Recording')
            }} />
             <Popover>
                <PopoverTrigger >
                    <HomeCard icon="https://img.icons8.com/?size=100&id=m3ZGMVwfwmA4&format=png&color=000000" title="Join Meeting" disc="Start The Meeting Through Link" color="bg-yellow-600" icon_clr='bg-yellow-500' />
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <div className="grid gap-4 bg-[#0d1221]">
                        <div className="space-y-2">
                            <h4 className="leading-none font-medium">Join the meeting</h4>
                            <p className="text-muted-foreground text-sm">

                            </p>
                        </div>
                        <div className="grid gap-2">
                            <div className="grid items-center gap-2">
                                <Label htmlFor="width">Meeting Link</Label>
                                <input
                                    id="text"   
                                    className="col-span-2 h-8 border-neutral-800 rounded-md p-1 outline-0 border-2"
                                    value={InviteMeetingLink}
                                    onChange={(e) => {
                                        setInviteMeetingLink(e.target.value)
                                    }}
                                />
                            </div>
                           
                 
                                <Button className='bg-[#1b4ee7]' onClick={() => {
                                    router.push(InviteMeetingLink)
                                    toast.success("Joining The Meeting...")
                                 
                                }}> <img src="https://img.icons8.com/?size=100&id=33662&format=png&color=000000" className='h-7 w-7' alt=""/>Join The Meeting</Button>
                           </div>
                    </div>
                </PopoverContent>

            </Popover>

        </section>
    )
}

export default MeetingList
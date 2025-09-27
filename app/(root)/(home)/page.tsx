import React from 'react'
import MeetingList from '@/components/MeetingList'
function page() {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const day = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(now);
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <div className='h-[300px] w-full rounded-[20px] bg-[url("/banner.jpg")] bg-center p-3'>
        <h1 className="bg-white/20 backdrop-blur-md p-2 rounded-lg font-sans inline-block text-neutral-300 shadow-lg text-[14px] md:text-xl font-medium">
          Upcoming Meeting at: 12:30 PM
        </h1>
        <div className='xl:pt-[118px] lg:pt-[128px] pt-[128px] md:pt-[132px] text-black flex flex-col gap-2'>
          <h1 className='bg-white/20 backdrop-blur-md xl:max-w-[256px] lg:max-w-[197px] md:max-w-[164px] max-w-[135px] p-2 rounded-lg font-sans inline-block text-neutral-300 shadow-lg   text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold'>{time}</h1>
          <p className='bg-white/20 backdrop-blur-md p-2 xl:max-w-[260px] lg:max-w-[252px] md:max-w-[255px] max-w-[305px] rounded-lg font-sans inline-block text-neutral-300 shadow-lg '>{day}</p>
        </div>
      </div>
      <MeetingList />
    </section>
  )
}

export default page
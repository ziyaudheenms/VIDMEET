import React, { ReactNode } from 'react'
import Navbar from '@/components/navbar'
import SideBar from '@/components/SideBar'
const HomeLayout = ({children} : {children: ReactNode}) => {
  return (
    <main className='relative'>
      <Navbar />
    <div className='flex'>
     <SideBar />
      <section className='flex flex-col min-h-screen flex-1 px-6 pb-6 pt-28 max-md:pb-14 sm:px-14'>
        <div className='w-full'>
          {children}
        </div>
      </section>
      </div>
        </main>
  )
}

export default HomeLayout
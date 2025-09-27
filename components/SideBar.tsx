'use client'
import { sideBarLinks } from '@/constants'
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const SideBar = () => {
    const pathname = usePathname()
  return (
    <>
    <section className='sticky left-0 top-0 flex flex-col w-fit h-screen justify-between p-4 pt-28 text-white bg-[#0d1221] max-sm:hidden lg:w-[246px]'>
        <div className='flex flex-col gap-6 '>
            {
                sideBarLinks.map((link) => {
                    const isActive = pathname === link.route  || pathname.startsWith(`${link.route}/`);
                    return (
                        <Link href={link.route} key={link.label} className={`flex items-center p-3 rounded-lg justify-start gap-4 shadow-lg ${isActive ? 'bg-[#3487f1]' : 'bg-[#0d1221]'}`}>
                         {/* <Link href={link.route} key={link.label} className={`flex items-center p-3 rounded-lg justify-start gap-4 `}> */}
                            <img src={link.icon} alt=""  className='h-10 w-10 md:h-8 md:w-8 xl:h-10 xl:w-10 lg:h-10 lg:w-10'/>
                            <h5 className='font-sans text-[18px] font-medium md:hidden xl:block lg:block'>{link.label}</h5>
                        </Link>
                    )
                })
            }
        </div>
    </section>
    <section className="h-16 w-[92%] flex justify-center items-center px-4 py-2 fixed bottom-4 gap-6 left-1/2 -translate-x-1/2 bg-[#0d1221] rounded-2xl shadow-xl md:hidden lg:hidden xl:hidden z-50">
        {sideBarLinks.map((link) => {
            const isActive = pathname === link.route;
            return (
                <Link
                    href={link.route}
                    key={link.label}
                    className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 ${isActive ? 'bg-[#003ef7] shadow-lg scale-105' : 'bg-[#181c2a] hover:bg-[#23294a] hover:scale-105'}`}
                >
                    <img src={link.icon} alt="" className="h-8 w-8" />
                </Link>
            );
        })}
    </section>
    </>
  )
}

export default SideBar
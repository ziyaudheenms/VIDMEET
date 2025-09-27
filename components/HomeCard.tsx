"use client"
import React from 'react'

interface HomeCardProps {
    icon : string,
    title: string,
    disc: string,
    color: string,
    icon_clr: string,
    handleClick: () => void
}


function HomeCard({icon,title,disc,color,icon_clr,handleClick}:HomeCardProps) {
  return (
    <div
            className={`${color} backdrop-blur-lg px-4 py-6 min-h-[260px] xl:max-w-[270px] rounded-[18px] cursor-pointer shadow-2xl border text-left border-white/30 flex flex-col justify-between`}
            onClick={handleClick}
        >
            <div className={`flex items-center justify-center ${icon_clr} shadow-2xl size-12 rounded-lg`}>
                <img src={icon} alt="" className='h-12 w-12'/>
            </div>
            <div className='flex flex-col text-white'>
                <h1 className='font-bold text-2xl'>{title}</h1>
                <p className='font-medium'>{disc}</p>
            </div>
        </div>
  )
}

export default HomeCard
import { Earth, Moon, Search, Sun, WholeWord } from 'lucide-react'
import React, { useState } from 'react'
import profile from "../../assets/img/profile.png"
import world from "../../assets/svg/world.svg"
import { useTheme } from '../../context/ThemeContext'
import { useUser } from '../../context/UserContext'

export default function Header() {

  const  {theme,toggleTheme,setTheme} = useTheme()
const {user} = useUser()
  
  return (
    <header className=' h-20 flex items-center justify-between px-5 '>
      <div className='flex items-center gap-2 h-10 bg-(--text-white) p-2.5 min-w-[350px] rounded-[6px]'  >
        <Search />
        <input placeholder='Search users, tutors, payments......(⌘K)' className='w-full border-0 outline-none font-normal text-[14px]' />
      </div>
      <div className='flex items-center gap-3'>
        <div className='flex items-center gap-2 bg-(--text-white) p-[4px] pr-[16px] rounded-[100px]'>
          <img src={profile} alt='wdwd' className='w-[32px] h-[32px] rounded-full' />
          <span className='text-(--text-base) font-normal text-[14px]'>{user?.fullName}</span>
        </div>
        <div className='flex cursor-pointer items-center gap-3 '>
          <div className='w-10 h-10 rounded-full flex items-center justify-center bg-(--text-white)'>
          <Earth size={20} className='text-(--text-base)'  />
          </div>
          <div className='w-10 cursor-pointer h-10 rounded-full flex items-center justify-center bg-(--text-white)'>
            {theme == "light"
            ? <button onClick={() => {setTheme("dark")}} className='w-full h-full flex items-center justify-center'><Sun size={20} className='text-(--text-base)' /></button> 
            : <button onClick={() => {setTheme("light")}} className='w-full h-full flex items-center justify-center'><Moon size={20} className='text-(--text-base)' /></button>
            }
          </div>
        </div>
      </div>
    </header>

  )
}

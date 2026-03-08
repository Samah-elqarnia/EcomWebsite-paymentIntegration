import React from 'react'
import { assets } from '../../assets/assets'
import Image from 'next/image'
import { useAppContext } from '@/context/AppContext'

const Navbar = () => {

  const { router } = useAppContext()

  return (
    <div className='flex items-center px-4 md:px-8 py-4 justify-between bg-techBlack border-b border-techGray relative z-50'>
      <div onClick={() => router.push('/')} className='text-xl font-bold tracking-tight cursor-pointer text-techWhite hover:text-techElectric transition-colors'>
        TechPlace <span className="text-techElectric">Admin</span>
      </div>
      <div className="flex items-center gap-4">
        <button className='bg-techWhite/5 border border-techGray text-techWhite hover:bg-techWhite hover:text-techBlack transition-all px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-widest'>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar;
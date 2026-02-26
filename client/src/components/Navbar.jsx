import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const user={name: 'Neo'}
    const navigte= useNavigate()

    const logoutUser=()=>{
        navigte('/')
    }
  return (
    <div className='shadow bg-white'>
       <nav className='flex items-center justify-between max-w-7x1 mx-auto px-4 py-3.5 text-slate-800 transition-all'>

        <Link><img src="/logo.svg" alt="logo" className='h-10 w-auto'/></Link>
      <div className='flex items-center gap-4 text-sm'>
        <p className='max-sm:hidder'>Hi, {user?.name}</p>
        <button  onClick={logoutUser} className='bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 round-full active:scale-95 transition-all' >Logout</button>
      </div>
       </nav>
    </div>
  )
}

export default Navbar
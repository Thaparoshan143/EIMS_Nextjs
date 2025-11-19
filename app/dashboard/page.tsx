'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FaHandPaper } from 'react-icons/fa';

const Dashboard = () => {

    const router = useRouter();
    // this is for temporary usage..
    const adminToken = process.env.NEXT_PUBLIC_ADMIN_CRED_TOKEN;

    useEffect(() => {
        // this is temporary access logic for now.. later change auth. method..
        if (localStorage.getItem('token') == adminToken)
        {
            console.log("User verified!! giving access");
            // other logic if any..
        }
        else
        {
            console.log("bad access.. first authenticate yourself..")
            router.push('/login')
        }

    }, [])

  return (
    <div className="min-h-screen flex flex-col justify-evenly items-center">
      <div className="text-center">
        <h1 className="text-6xl font-main text-theme font-bold ">Dashboard</h1>
        <span className="p-2 font-thin">Welcome! user</span>
        <FaHandPaper size={64} className='text-theme m-auto my-10 animate-bounce' />
      </div>
    </div>
  )
}

export default Dashboard
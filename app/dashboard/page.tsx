'use client'

import { isValidAccess } from '@/lib/utils/util';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { cFetch } from '@/lib/utils/fetch';
import Table from '@/components/Table';
import Loading from '@/components/Loading';
import { IMenuItem } from '../menu/page';

const Dashboard = () => {

  const [menuItems, setMenuItems] = useState<IMenuItem[]>();
  const fetchURL = process.env.NEXT_PUBLIC_MENU_FETCH_URL;

  const fetchMenuItems = async () => {
    const items = await cFetch(fetchURL || "");
    if (items) {
      setMenuItems(items);
    }
  }

  const router = useRouter();
  useEffect(() => {
      if (isValidAccess())
      {
          console.log("User verified!! giving access");
          // other logic if any..
          fetchMenuItems();
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
        {/* <FaHandPaper size={64} className='text-theme m-auto my-10 animate-bounce' /> */}
      </div>
      {/* table show */}
      <div className="min-w-[80vw]">
        <span className="font-bold block mb-2">Currently, available in menu</span>
        {
          menuItems && <Table 
          titles={["SN", "Name", "ImgPath", "Price", "Quantity"]} 
          records={menuItems}
        />
        }
      </div>
      {
        !menuItems && <Loading text="Loading Menu..." />
      }
    </div>
  )
}

export default Dashboard
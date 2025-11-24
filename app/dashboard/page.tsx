'use client'

import { isValidAccess, showToastHelper } from '@/lib/utils/util';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { cGet, cPost } from '@/lib/utils/fetch';
import Table from '@/components/Table';
import Loading from '@/components/Loading';
import { IMenuItem } from '../menu/page';
import ThemeButton from '@/components/ThemeButton';
import AddItemForm from '@/components/AddItemForm';

const Dashboard = () => {

  const [menuItems, setMenuItems] = useState<IMenuItem[]>();
  const [formPopup, setFormPopup] = useState<boolean>(false);
  
  const fetchURL = process.env.NEXT_PUBLIC_MENU_FETCH_URL;

  const fetchMenuItems = async () => {
    const items = await cGet(fetchURL || "");
    if (items) {
      setMenuItems(items);
    }
    else {
      // console.log(items);
      showToastHelper({text: "Error connecting. Try again!", type:"error"});
    }
  }


  const addMenuItem = async (obj: IMenuItem) => {
    if (!obj.imgPath || !obj.name || !obj.price || !obj.quantity) {
      showToastHelper({text: "Form incomplete", type: "error"});
    }
    else {
      // submit to database and refetch..
      setFormPopup(false);
      showToastHelper({text: "Updating the DB entry", type: "info"});

      const item = await cPost(fetchURL || '', obj);
      if (item) {
        console.log("From post req: recieved message");
        setMenuItems(item);
      }
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

      <div>
        <ThemeButton label="Add Item" type="button" clickEvent={() => setFormPopup(true)} />
      </div>

      {/* Add Element popup container */}
      {
        formPopup && <div className="fixed z-50 bg-[#0008] w-screen h-screen flex justify-center items-center">
          <AddItemForm onFormSubmit={(obj) => addMenuItem(obj)} onFormClose={() => setFormPopup(false)} />
        </div>
      }
    </div>
  )
}



export default Dashboard
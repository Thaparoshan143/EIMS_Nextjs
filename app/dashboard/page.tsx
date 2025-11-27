'use client'

import { _fetchMenuItems, isValidAccess, showToastHelper } from '@/lib/utils/util';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { cDelete, cGet, cPost, cPut } from '@/lib/utils/fetch';
import Table from '@/components/Table';
import Loading from '@/components/Loading';
import { IMenuItem } from '../menu/page';
import ThemeButton from '@/components/ThemeButton';
import AddItemForm from '@/components/AddItemForm';
import ItemForm from '@/components/ItemForm';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import Link from 'next/link';
import { MdShoppingCart } from 'react-icons/md';

enum FormState {
  NONE,
  ADD,
  UPDATE,
};

const Dashboard = () => {

  const [menuItems, setMenuItems] = useState<IMenuItem[]>();
  const [formPopup, setFormPopup] = useState<FormState>(FormState.NONE);
  const [selectId, setSelectId] = useState<number>(-1);
  
  const fetchURL = process.env.NEXT_PUBLIC_MENU_FETCH_URL;


  const addMenuItem = async (obj: IMenuItem) => {
    if (!obj.name || !obj.price || !obj.quantity) {
      showToastHelper({text: "Form incomplete", type: "error"});
    }
    else {
      // submit to database and refetch..
      setFormPopup(FormState.NONE);
      showToastHelper({text: "Updating the DB entry", type: "info"});

      const item = await cPost(fetchURL || '', obj);
      if (item) {
        console.log("From post req: recieved message");
        setMenuItems(item);
      }
    }
  }

  const updateMenuItem = async (obj: IMenuItem) => {
    console.log("Upading of id: " + obj.id);
    console.log(obj);
    
    if (!obj.imgpath || !obj.name || !obj.price || !obj.quantity) {
      showToastHelper({text: "Form incomplete", type: "error"});
    }
    else {
      // submit to update to database and refetch..
      setFormPopup(FormState.NONE);
      showToastHelper({text: "Updating the DB entry", type: "info"});

      const res = await cPut(`${fetchURL}?id=${obj.id}` || '', obj);
      if (res) {
        console.log("From put req: recieved message");
        setMenuItems(res);
      }
    }
  }

  const deleteMenuItem = async (id: number) => {
    console.log("deleting the record id: " + id);
    setFormPopup(FormState.NONE);

    if (id == 0) {
      console.log("No entry selected!!!");
    }

    const res = await cDelete(`${fetchURL}?id=${id}` || '');
    if (res) {
      console.log("From delete req: recieved message");
      setMenuItems(res);
    }
  }

  const recordFormPopup = (id: number) => {
    showToastHelper({text: "Update the record", type: "info"});
    setSelectId(id);
    setFormPopup(FormState.UPDATE);
    // console.log(menuItems?.filter((props) => props.id == id)[0]);
  }

  const router = useRouter();
  useEffect(() => {
      if (isValidAccess())
      {
          console.log("User verified!! giving access");
          // other logic if any..
          _fetchMenuItems(setMenuItems);
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
          titles={["ID", "Name", "imgpath", "Price", "Quantity"]} 
          records={menuItems}
          onRecordClick={(id) => recordFormPopup(id)}
        />
        }
      </div>
      {
        !menuItems && <Loading text="Loading Menu..." />
      }

      <div>
        <ThemeButton label="Add Item" type="button" clickEvent={() => setFormPopup(FormState.ADD)} />
      </div>

      {/* for POS link */}
      <Link href="/pos" className="fixed z-50 bottom-10 right-10 text-xl bg-theme-cont p-2 px-4 gap-2 rounded-xl text-theme-w hover:shadow-xl hover:bg-theme-cont-alt hover:scale-[105%] transition-all duration-300">
        <span className="font-semibold mr-2">Launch POS</span><MdShoppingCart className="inline-block " />
      </Link>

      {/* Add Element popup container */}
      {
        formPopup != FormState.NONE &&
        <div className="fixed z-50 bg-[#0008] w-screen h-screen flex justify-center items-center">
          {
            formPopup == FormState.ADD ? 
              <AddItemForm 
                onFormSubmit={(obj) => addMenuItem(obj)} 
                onFormClose={() => setFormPopup(FormState.NONE)} 
              />
              : formPopup == FormState.UPDATE ?
              <div className="relative">
                <ItemForm
                  btnLabel="Update"
                  iniState={menuItems && menuItems?.filter((props) => props.id == selectId)[0]}
                  onFormSubmit={(obj) => updateMenuItem(obj)} 
                  onFormClose={() => setFormPopup(FormState.NONE)} 
                />

                <RiDeleteBin5Fill 
                  className="absolute top-1.5 left-1.5 cursor-pointer text-theme-alt hover:text-theme-w hover:bg-theme-alt text-3xl hover:scale-110 p-0.5 rounded-sm transition-all duration-300"
                  onClick={() => deleteMenuItem(selectId)}
                />
              </div>
              : 
              <></>
          }
        </div>
      }
    </div>
  )
}



export default Dashboard
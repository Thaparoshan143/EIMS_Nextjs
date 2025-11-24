'use client'

import React, { useState } from 'react'
import ThemeButton from './ThemeButton';
import { IoClose } from 'react-icons/io5';
import { IMenuItem } from '@/app/menu/page';


const AddItemForm = ({onFormSubmit, onFormClose}: {onFormSubmit: (obj: IMenuItem) => void, onFormClose: () => void}) => {

  const [itemEntry, setItemEntry] = useState<IMenuItem>({
    name: '',
    imgPath: '',
    price: 0,
    quantity: 0,
  });

  const setItemName = (n: string) => {
    setItemEntry((prev) => ({...prev, name: n}));
  }
  const setItemImgPath = (ip: string) => {
    setItemEntry((prev) => ({...prev, imgPath: ip}));
  }
  const setItemPrice = (p: number) => {
    setItemEntry((prev) => ({...prev, price: p}));
  }
  const setItemQuantity = (q: number) => {
    setItemEntry((prev) => ({...prev, quantity: q}));
  }

  const addMenuItem = (e: any) => {
    e.preventDefault();
    // if only itemEntry available..
    itemEntry && onFormSubmit(itemEntry);
  }

  const formCStyle = "w-full outline-none border-2 border-transparent focus:border-theme focus:text-theme border-b-theme focus:rounded-md transition-all duration-200 p-2 text-md"

  return (
    <form className="relative flex flex-col justify-evenly items-center m-auto gap-2 w-lg min-h-[25%] border bg-theme-w p-10 rounded-xl" onSubmit={(e) => addMenuItem(e)}>
      <IoClose 
        className="absolute top-0 right-0 text-3xl text-theme cursor-pointer hover:rotate-90 transition-all duration-300"
        onClick={() => onFormClose()}
      />

      <h1 className="text-theme-w font-bold text-2xl w-full bg-theme py-5 text-center">Item Description</h1>
      
      <input 
        type="text"
        required
        className={`${formCStyle}`}
        placeholder="Enter the item name..." 
        onChange={(e) => setItemName(e.target.value)}
        />
      <input 
        type="text"
        required
        className={`${formCStyle}`}
        placeholder="Enter img path/url..." 
        onChange={(e) => setItemImgPath(e.target.value)}
      />
      <div className="w-full flex flex-row gap-4">
        <input 
          type="number"
          required
          min={1}
          max={10000}
          className={`${formCStyle}`}
          placeholder="Price here.." 
          onChange={(e) => setItemPrice(Number(e.target.value))}
          />
        <input 
          type="number"
          required
          min={1}
          max={1000}
          className={`${formCStyle}`}
          placeholder="Quantity here.." 
          onChange={(e) => setItemQuantity(Number(e.target.value))}
        />
      </div>

      <div className="w-full flex flex-row justify-evenly items-center mt-10">
        <ThemeButton label="Add" type="submit" />
        <ThemeButton label="Reset" type="reset" />
      </div>
    </form>
  )
}

export default AddItemForm
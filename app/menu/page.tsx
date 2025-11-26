'use client'

import { ItemCard } from "@/components/ItemCard";
import Loading from "@/components/Loading";
import { _fetchMenuItems } from "@/lib/utils/util";
import { useEffect, useState } from "react";

export interface IMenuItem {
  id?: number,
  name: string,
  imgpath?: string,  // or maybe url..?
  price: number,
  quantity: number,
}

export default function Menu() {

  const [menuItems, setMenuItems] = useState<IMenuItem[]>();

  useEffect(() => {
      _fetchMenuItems(setMenuItems);
  }, [])

  return (
    <div className="min-h-screen flex flex-col justify-evenly items-center pt-32">
        <h1 className="text-6xl font-main text-theme font-bold mb-8">Menu</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-[80%] gap-8">
          {
            menuItems && menuItems.map((props) => {
              return <ItemCard key={props.name} {...props} />
            })
          }
        </div>
        {
          !menuItems && <Loading text="Loading Menu..." />
        }
        <span className="text-theme-alt my-16"><span className="text-2xl font-semibold">Other Items</span> comming soon!!!</span>
    </div>
  );
}

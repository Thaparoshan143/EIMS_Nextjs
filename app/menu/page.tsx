'use client'

import ItemCard from "@/components/ItemCard";
import Loading from "@/components/Loading";
import PageConstruction from "@/components/PageConstruction";
import { getRandomFoodItems } from "@/lib/data/_foodItems";
import { useEffect, useState } from "react";

interface IMenuItem {
  name: string,
  imgPath: string, // or maybe url..?
  price: number,
  quantity: number
};

export default function Menu() {

  const [menuItems, setMenuItems] = useState<IMenuItem[]>();
  const fetchURL = process.env.NEXT_PUBLIC_MENU_FETCH_URL;

  async function fetchMenuItems() {

    try {
        const res = await fetch(fetchURL || "");

        if (!res.ok) {
          setMenuItems(getRandomFoodItems());
          console.error("Failed to fetch data!! rolling to fallback.." + res.status);
          return;
        }

        const data = await res.json();

        console.log(data);
        setMenuItems(data);

    } catch (error) {
      setMenuItems(getRandomFoodItems());
      console.error(error);
    }
  }


  useEffect(() => {
    // console.log(fetchURL);

    if (!fetchURL) {
      console.log("Unable to retrieve fetch url from .env file");
      setMenuItems(getRandomFoodItems());
      // return; // required ? or default to fallback methods..
    }
    else {
      fetchMenuItems();
    }
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
        {/* <PageConstruction /> */}
    </div>
  );
}

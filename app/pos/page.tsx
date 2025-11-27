'use client'

import React, { useEffect, useState } from 'react'
import { IMenuItem } from '../menu/page';
import { _fetchMenuItems, _updatePOSMenuItems, isValidAccess, showToastHelper } from '@/lib/utils/util';
import ThemeButton from '@/components/ThemeButton';
import POSTable from '@/components/POSTable';
import SearchTable from '@/components/SearchTable';
import Link from 'next/link';
import { MdSpaceDashboard } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { commitTransToMongoDB, setLastTransId } from '@/lib/utils/mongodbutil';
import { FaFileInvoice } from 'react-icons/fa';

// little modified of IMenuItem version without imagepath
export interface ITransItem {
  id?: number,
  name: string,
  price: number,
  quantity: number,
};

export interface ITransactionInfo {
  tid: number,
  total?: number,
  discount?: number, // is in PERCENTAGE
  gTotal?: number,
  items?: ITransItem[]
  date?: string
};

const POS = () => {
  const [menuItemList, setMenuItemList] = useState<IMenuItem[]>([]);
  const [activeItemList, setActiveItemList] = useState<IMenuItem[]>([]);
  const [activeTransaction, setActiveTransaction] = useState<ITransactionInfo>({
    tid: 1,
    items: []
  });
  const [addItemPopup, setAddItemPopup] = useState<boolean>(false);
  // this is helper function to prevent from multiple confirm/buy
  const [confirmable, setConfirmable] = useState<boolean>(true);

  const paymentOptSrc: string[] = [
    "https://yt3.googleusercontent.com/7peNpfVRa3bFg2Mt-vEdZI7O5HOuLv_HTEhgltS7oJUKZmEhxnerPTcaIqXvv9dGT9-jLx9S5A=s900-c-k-c0x00ffffff-no-rj",
    "https://play-lh.googleusercontent.com/MRzMmiJAe0-xaEkDKB0MKwv1a3kjDieSfNuaIlRo750_EgqxjRFWKKF7xQyRSb4O95Y",
    "https://www.extravelmoney.com/images/currency/nepalese-rupee.jpg",
    "https://techpana.prixacdn.net/media/albums/online-mobile-banking_ePzpSnwcaC.jpg"
  ];


  // pass the menu item index to 
  const addItemToActive = (ind: number) => {
    setAddItemPopup(false);
    const selectedItem = menuItemList.filter((i) => i.id == ind)[0];
    if (selectedItem) {
      if (selectedItem.quantity <= 0) {
        showToastHelper({text: `Item (${selectedItem.name}) is out of stock!!`, type: "error"});
        return;
      }
      else if (activeItemList.filter((i) => i.id == ind).length == 0) {
        itemQuantityChange(ind, 1);
        // making new copy such that old values is not modified..
        const newItem = {...selectedItem};
        newItem.quantity = 1;
        setActiveItemList((prev) => ([...prev, newItem]));
        showToastHelper({text: `Item (${selectedItem.name}) added!`, type: "success"})
      }
      else {
        showToastHelper({text: `Item (${selectedItem.name}) already added!`, type: "error"});
      }
    }
  }


  const getDiscountForTotal = (t: number) => {
    if (t > 5000) {
      return 0.015; // i.e 1.5% discount on total
    }
    else if (t > 2500) {
      return 0.01; 
    }
    else if (t > 1000) {
      return 0.005; 
    }
    return 0;
  }

  const itemQuantityChange = (ind: number, delta: number) => {

    const curActive = activeItemList.filter((i) => i.id == ind)[0];
    const menuActive = menuItemList.filter((i) => i.id == ind)[0];

    if (menuActive) {
      // only intended to be used with +1 or -1 case..
      switch (delta) {
        case 1:
          if (menuActive.quantity <= 0) {
            showToastHelper({text: "Quantity not available in menu to add", type: "error"});
            return;
          }
          break;
        case -1:
          if (curActive.quantity <= 0) {
            const newActiveItemList = activeItemList.filter((prev) => prev.id != ind);
            setActiveItemList(newActiveItemList);
            showToastHelper({text: "Quantity not available to deduct! Removing Item", type: "error"});
            return;
          }
        break;
        default:
          console.error("unknown dir! or delta! ");
          return;
      }
      
      curActive && showToastHelper({text: `${curActive.quantity + delta} Item (${curActive.name}) into list!`,type: "success"})
      setMenuItemList((prev) => 
        prev.map((i) => (
          i.id == ind ? {...i, quantity: (i.quantity + (delta * -1))} : {...i}
        ))
      )
      setActiveItemList((prev) => 
        prev.map((i) => (
          i.id == ind ? {...i, quantity: (i.quantity + delta)} : {...i}
        ))
      )
    }
  }

  const clearActiveItems = () => {

    if (activeItemList.length == 0) {
      showToastHelper({text: "No items in active list to clear", type: "error"});
      return;
    }
    showToastHelper({text: "Active list cleared", type: "success"});

    activeItemList.forEach((ai) => (
      setMenuItemList((mi) => (
        mi.map((i) => 
          i.id == ai.id ? {...i, quantity: i.quantity + (ai.quantity >=0 ? ai.quantity : 0)} : {...i}
        )
      ))
      )
    )

    setActiveItemList([]);
  }

  const buyActiveItems = async () => {

    if (!confirmable) {
      showToastHelper({text: "Already processing order! Please wait..", type: "error"});
      return;
    }
    setConfirmable(false);

    if (activeItemList.length == 0) {
      showToastHelper({text: "No items in active list to buy!", type: "error"});
      return;
    }

    const transObj = {...activeTransaction};
    // transObj.total = transObj.total?.toPrecision(2);
    const transItems: ITransItem[] = [];
    activeItemList.forEach((item) => {
      if (item.quantity == 0)
        return;
      transItems.push({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })
    })

    transObj.items = transItems;
    transObj.date = (new Date()).toLocaleString();

    console.log(transObj);
    const res1 = await commitTransToMongoDB(transObj);

    if (res1) {

      const updatableList: IMenuItem[] = [];
      activeItemList.forEach((ai) => {
        if (ai.quantity)
          updatableList.push(menuItemList.filter((mi) => mi.id == ai.id)[0])
      })
      
      const res2 = await _updatePOSMenuItems(updatableList);
      if (res2) {
        showToastHelper({text: `Tid: ${transObj.tid} succesful! || Item count: ${transObj.items?.length} || Total: ${transObj.gTotal}`, type: "success" })

        setActiveTransaction((prev) => ({...prev, tid: prev.tid + 1}));
        setActiveItemList([]);
      }
      else {
        showToastHelper({text: "Error commiting the transaction changes. Try again!", type:"error"});
      }

    }
    else {
      showToastHelper({text: `Tid: ${transObj.tid} unsuccesful! || Item count: ${transObj.items?.length} || Total: ${transObj.gTotal} || Try again`, type: "error" })
    }

    setConfirmable(true);
  }

  const router = useRouter();

  useEffect(() => {

    if (isValidAccess()) 
    {
      console.log("User verified!! giving access");
      // other logic if any..
      _fetchMenuItems(setMenuItemList);
      setLastTransId((tid) => setActiveTransaction((prev) => ({...prev, tid: tid + 1})));
    }
    else
    {
      console.log("bad access.. first authenticate yourself..")
      router.push('/login')
    }

  }, [])


  useEffect(() => {
    let total = 0;

    activeItemList.forEach((props, ind) => {
      const pxq = props.price * props.quantity
      total += pxq;
    })

    const disc = getDiscountForTotal(total);
    setActiveTransaction((prev) => ({...prev,
      total: total,
      gTotal: total * (1-disc),
      discount: disc * total
    }))
  }, [activeItemList])


  return (
    <div className="w-screen min-h-screen flex flex-col justify-evenly items-center py-20">
      <Link href="/dashboard" className="fixed z-50 top-20 left-10 text-sm bg-theme-cont p-2 px-4 gap-2 rounded-xl text-theme-w hover:shadow-md hover:bg-theme-cont-alt hover:scale-[102%] transition-all duration-300">
        <span className="font-semibold mr-2">Dashboard</span><MdSpaceDashboard className="inline-block " />
      </Link>
      <Link href="/pos/invoice" className="fixed z-50 top-20 right-10 text-sm bg-theme-cont p-2 px-4 gap-2 rounded-xl text-theme-w hover:shadow-md hover:bg-theme-cont-alt hover:scale-[102%] transition-all duration-300">
        <span className="font-semibold mr-2">Invoices</span><FaFileInvoice className="inline-block " />
      </Link>

      <h1 className="text-3xl text-theme-cont font-extrabold uppercase">Point of Sale (POS)</h1>
      
      <div className="max-w-[90%] xl:min-w-6xl p-8 bg-theme-w-alt rounded-md shadow-md">
        <h1 className="font-bold text-xl text-theme mb-4">Active Items in List (Transaction id: {activeTransaction.tid})</h1>
        <POSTable 
          records={activeItemList}
          oClassName="text-md"
          onQtyChange={itemQuantityChange}
        />

        <div className="w-full flex-col justify-center items-center gap-y-4 text-right font-semibold my-5">
          <div className=''>
            <span>Total: </span>
            <span>{activeTransaction?.total?.toFixed(2) || 0}</span>
          </div>
          <div className=''>
            <span>Discount: </span>
            <span>{activeTransaction?.discount?.toFixed(2) || 0}</span>
          </div>
          <hr />
          <div className='font-extrabold'>
            <span>Grand Total: </span>
            <span>{activeTransaction?.gTotal?.toFixed(2) || 0}</span>
          </div>

        </div>

        <div className="grid grid-cols-2 mt-10">
          <div>
            <b>Payment Options</b>
            <div className="w-fit grid grid-cols-2 gap-2 my-2">
              {
                paymentOptSrc?.map((src, ind) => {
                  return <img key={ind} className="max-w-24 max-h-24 rounded-xl border-2 border-transparent hover:border-theme" src={src} alt={src} />
                })
              }
            </div>
          </div>
          <div className="h-full flex flex-col justify-between items-end">
            <div className="w-full flex lg:flex-row flex-col justify-end lg:items-end items-center gap-4">
              <ThemeButton label="Clear All" clickEvent={clearActiveItems} oClassName="bg-theme-alt hover:shadow-xl" />
              {/* <ThemeButton label="Cancel" clickEvent={() => {alert("Cancel order")}} oClassName="bg-theme-alt hover:shadow-xl" /> */}
              {
                confirmable ? 
                  <ThemeButton label="Confirm" clickEvent={buyActiveItems} oClassName="hover:bg-theme-cont" />
                  :
                  <ThemeButton label="Processing" oClassName="opacity-50" />
              }
            </div>
            <div>
              <ThemeButton label="Add Item +" clickEvent={() => setAddItemPopup(true)} oClassName="hover:bg-theme-cont"/>
            </div>
          </div>
        </div>
      </div>

      {/* Add Item Popup (List all the menu item with search options) */}
      {
        addItemPopup && 
        <div 
          className="fixed z-50 w-screen h-screen bg-[#0008] flex flex-row justify-evenly items-center"
          onClick={() => setAddItemPopup(false)}
        >
          <div className="max-w-[80%] flex flex-col justify-center items-center gap-4 p-4 rounded-xl bg-theme-w-alt" onClick={(e) => e.stopPropagation()}>
            <SearchTable 
              records={menuItemList}
              onRecordClick={(id) => {addItemToActive(id)}}
            />
            <ThemeButton label="Close" clickEvent={() => setAddItemPopup(false)}/>
          </div>
        </div>
      }
      
    </div>
  )
}

export default POS
'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { MdShoppingCart, MdSpaceDashboard } from 'react-icons/md'
import { ITransactionInfo, ITransItem } from '../page'
import { _fetchInvoiceList, isValidAccess } from '@/lib/utils/util'
import { useRouter } from 'next/navigation'
import { FaAngleDoubleDown, FaAngleDoubleUp } from 'react-icons/fa'

const Invoice = () => {

    const [invoiceList, setInvoiceList] = useState<ITransactionInfo[]>([]);
    const router = useRouter();

    useEffect(() => {

        if (isValidAccess()) 
        {
            console.log("User verified!! giving access");
            // other logic if any..
            _fetchInvoiceList(setInvoiceList);
        }
        else
        {
            console.log("bad access.. first authenticate yourself..")
            router.push('/login')
        }

    }, [])

    const invoiceTitle = ["Tid", "Total", "Discount", "G.Total", "Date", "Item Count"];

  return (
    <div className="w-screen min-h-screen flex flex-col justify-evenly items-center py-20">
        <Link href="/pos" className="fixed z-50 top-20 left-8 text-sm bg-theme-cont p-2 px-4 gap-2 rounded-xl text-theme-w hover:shadow-md hover:bg-theme-cont-alt hover:scale-[102%] transition-all duration-300">
            <span className="font-semibold mr-2">POS</span><MdShoppingCart className="inline-block " />
        </Link>
        <Link href="/dashboard" className="fixed z-50 bottom-20 left-8 text-md bg-theme-cont p-2 px-4 gap-2 rounded-xl text-theme-w hover:shadow-md hover:bg-theme-cont-alt hover:scale-[102%] transition-all duration-300">
            <span className="font-semibold mr-2">Das.</span><MdSpaceDashboard className="inline-block " />
        </Link>

        <div className="ml-48 w-[80%]">
            <h1 className="font-light text-sm my-2">Previous Invoices</h1>
            <div className="text-center flex flex-col justify-evenly items-center bg-theme-w-alt p-4 rounded-xl gap-3">
                <div className="w-full grid grid-cols-6 font-bold text-theme gap-2 text-sm">
                    {
                        invoiceTitle.map((t, ind) => {
                            return <span key={ind}>{t}</span>
                        })
                    }
                </div>
                {
                    invoiceList.map((inv, ind) => {
                        return <InvoiceRecord key={ind} record={inv} />
                    })
                }
            </div>
        </div>

    </div>
  )
}

const InvoiceRecord = ({record}: {record: ITransactionInfo}) => {

    const [expandItems, setExpandItems] = useState<boolean>(false);

    return (
        <>
        <div className={`w-full grid grid-cols-6 font-semibold gap-2 hover:opacity-100 ${expandItems ? "opacity-100" : "opacity-50"}`}>
            <h1 className="">
                <button className="hover:text-theme cursor-pointer mr-4" onClick={()=>setExpandItems(!expandItems)}>
                    {
                        expandItems ? <FaAngleDoubleUp /> : <FaAngleDoubleDown />
                    }
                </button>
                {record.tid}
            </h1>
            <span>{record.total?.toFixed(2)}</span>
            <span>{record.discount?.toFixed(2)}</span>
            <span>{record.gTotal?.toFixed(2)}</span>
            <span className='text-vs'>{record.date}</span>
            <span>{record.items?.length}</span>
        </div>
        {
            expandItems && 
            <div className="w-full flex flex-col text-vse9 p-3 mx-5 bg-theme-w rounded-xl gap-2">
                <div className="w-full grid grid-cols-5 text-theme font-semibold">
                    <span>Product ID</span>
                    <span>Name</span>
                    <span>Price</span>
                    <span>Quantity</span>
                    <span>Subtotal</span>
                </div>
                {
                    record.items?.map((i, ind) => {
                        return <ItemRecord key={ind} item={i} />
                    })
                }
            </div>
        }
        </>
    )
}

const ItemRecord = ({item}: { item: ITransItem }) => {
    return (
        <div className="w-full grid grid-cols-5">
            <span>{item.id}</span>
            <span>{item.name}</span>
            <span>{item.price}</span>
            <span>{item.quantity}</span>
            <span>{item.quantity * item.price}</span>
        </div>
    )
}

export default Invoice
'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { MdPrint, MdShoppingCart, MdSpaceDashboard } from 'react-icons/md'
import { ITransactionInfo, ITransItem } from '../page'
import { _fetchInvoiceList, isValidAccess } from '@/lib/utils/util'
import { useRouter } from 'next/navigation'
import { FaAngleDoubleDown, FaAngleDoubleUp } from 'react-icons/fa'
import { useReactToPrint } from 'react-to-print'

const Invoice = () => {

    const [invoiceList, setInvoiceList] = useState<ITransactionInfo[]>([]);
    const router = useRouter();

    const componentRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: 'Invoices',
    })

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

        <button onClick={handlePrint} className="fixed z-50 top-20 right-8 text-md bg-theme-cont p-2 px-4 gap-2 rounded-xl text-theme-w hover:shadow-md hover:bg-theme-cont-alt hover:scale-[102%] transition-all duration-300">
            <span className="font-semibold mr-2">Print Invoices</span><MdPrint className="inline-block " />
        </button>

        <div ref={componentRef} className="lg:ml-48 w-[80%] print:w-[90%] print:m-auto flex flex-col justify-evenly items-center">
            <h1 className="font-light text-sm my-2">Previous Invoices<span className='hidden px-2 print:inline-block'>(Total records: {invoiceList.length})</span></h1>
            <div className="text-center flex flex-col justify-evenly items-center bg-theme-w-alt p-4 rounded-xl gap-3">
                <div className="w-full grid grid-cols-7 font-bold text-theme gap-2 text-sm">
                    {
                        invoiceTitle.map((t, ind) => {
                            return <span className={`${t=="Date" ? "col-span-2" : ""}`} key={ind}>{t}</span>
                        })
                    }
                </div>
                {
                    invoiceList.map((inv, ind) => {
                        return <InvoiceRecord key={ind} record={inv} />
                    })
                }

                <hr className="w-full border border-theme" />
                <div className="w-full grid grid-cols-7 font-bold text-theme gap-2 text-vs">
                    <span></span>
                    <span>All Total: {(() => {
                        let allTotal = 0;
                        invoiceList.forEach((val) => allTotal += val.total || 0)
                        return allTotal;
                    })()}</span>
                    <span>All Discount: {(() => {
                        let allDisc = 0;
                        invoiceList.forEach((val) => allDisc += val.discount || 0)
                        return allDisc
                    })()}</span>
                    <span>All G.Total: {(() => {
                        let allGTotal = 0;
                        invoiceList.forEach((val) => allGTotal += val.gTotal || 0)
                        return allGTotal
                    })()}</span>
                    <span className='col-span-2'></span>
                    <span>All Item count: {(() => {
                        let itemsCountTotal = 0;
                        invoiceList.forEach((val) => itemsCountTotal += val.items?.length || 0)
                        return itemsCountTotal;
                    })()}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

const InvoiceRecord = ({record}: {record: ITransactionInfo}) => {

    const [expandItems, setExpandItems] = useState<boolean>(false);

    return (
        <>
        <div className={`w-full grid grid-cols-7 font-semibold gap-2 hover:opacity-100 print:opacity-100 print:text-[10px] ${expandItems ? "opacity-100" : "opacity-50"}`}>
            <h1 className="">
                <button className="hover:text-theme cursor-pointer mr-4 print:hidden" onClick={()=>setExpandItems(!expandItems)}>
                    {
                        expandItems ? <FaAngleDoubleUp /> : <FaAngleDoubleDown />
                    }
                </button>
                {record.tid}
            </h1>
            <span>{record.total?.toFixed(2)}</span>
            <span>{record.discount?.toFixed(2)}</span>
            <span>{record.gTotal?.toFixed(2)}</span>
            <span className='text-vse9 col-span-2'>{record.date}</span>
            <span>{record.items?.length}</span>
        </div>
        {
            <div className={`w-full flex flex-col text-vse9 print:text-[8px] p-2 px-4 mx-5 bg-theme-w rounded-xl gap-2 ${expandItems ? "" : "hidden"} print:block`}>
                <table className="w-full print:table-fixed table:auto text-left">
                    <thead className="text-theme font-semibold">
                        <tr>
                            <td>ID</td>
                            <td>Name</td>
                            <td>Price</td>
                            <td>Quantity</td>
                            <td>Subtotal</td>
                        </tr>
                    </thead>
                    <tbody className='w-full'>
                    {
                        record.items?.map((i, ind) => {
                            return <ItemRecord key={ind} item={i} />
                        })
                    }
                    </tbody>
                </table>
            </div>
        }
        </>
    )
}

const ItemRecord = ({item}: { item: ITransItem }) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{item.quantity}</td>
            <td>{(item.quantity * item.price)}</td>
        </tr>
    )
}

export default Invoice
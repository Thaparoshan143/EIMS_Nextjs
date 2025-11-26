import { IMenuItem } from '@/app/menu/page'
import React, { useState } from 'react'

// component specific to the pos menu item..
interface ISearchTableProps {
    oClassName?: string,
    records?: IMenuItem[]
    onRecordClick?: (id: number) => void // callback on tr/record click
};

const SearchTable = (props: ISearchTableProps) => {
    
    const titles = ["ID", "Product Name", "Price (per)", "Qty(R.)"];
    const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <>
    <input 
        className="w-full lg:min-w-xl p-2 rounded-md text-md outline-none font-semibold focus:text-theme border focus:border-theme bg-theme-w" 
        type="text" 
        placeholder="Enter item name here to search.." 
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        autoFocus
    />
    <table className={`w-full lg:min-w-xl table-auto text-left text-md border rounded-md bg-theme-w border-gray-500 border-separate border-spacing-4 ${props.oClassName}`}>
        <thead className="text-theme">
            <tr>
            {
                titles?.map((tit) => {
                    return <TableHead key={tit} text={tit} />
            })
            }
            </tr>
        </thead>
        <tbody className="border-separate border-spacing-y-8">
            {
            !searchTerm ? props.records?.sort((a, b) => ((a?.id && b?.id && a.id - b.id) || 0))?.map((record, ind) => {
                return <TableRecord key={ind} rowItem={record} onRecordClick={props.onRecordClick} />
            }) : props.records?.filter((r, ind) => r.name.toLowerCase().includes(searchTerm.toLowerCase())).sort((a, b) => ((a?.id && b?.id && a.id - b.id) || 0))?.map((record, ind) => {
                return <TableRecord key={ind} rowItem={record} onRecordClick={props.onRecordClick} />
            }) 
            }
        </tbody>
    </table>
    </>
  )
}

const TableHead = ({text} : {text: string}) => {
  return (
    <th className="font-bold uppercase">
      {text}
    </th>
  )
}

const TableRecord = ({rowItem, onRecordClick}: {rowItem: IMenuItem, onRecordClick?: (ind: number) => void}) => {
  return (
    <tr className={`hover:text-theme-alt ${onRecordClick && "hover:cursor-pointer"} ${rowItem.quantity == 0 && "opacity-40 hover:line-through"}`} title={`${rowItem.quantity == 0 ? "Item Not available" : ""}`} onClick={() => onRecordClick && onRecordClick(rowItem.id || -1)}>
      <td>{rowItem.id}</td>
      <td className="font-semibold">{rowItem.name}</td>
      <td>{rowItem.price}</td>
      <td>{rowItem.quantity}</td>
    </tr>
  )
}

export default SearchTable
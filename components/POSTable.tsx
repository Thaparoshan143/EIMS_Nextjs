import React from 'react'
import { IMenuItem } from '@/app/menu/page'
import { FaMinus, FaPlus } from 'react-icons/fa'

// this is fixed/specific to meni items..
interface IPOSTableProps {
  oClassName?: string,
  records?: IMenuItem[],
  onQtyChange?: (ind: number, delta: number) => void // when the + or - clicked from quantity
};

const POSTable = (props: IPOSTableProps) => {

    const titles = ["ID", "Name", "Price", "Quantity", "Subtotal"]

  return (
    <table className={`w-full text-right text-md table-auto border rounded-md bg-theme-w border-gray-500 border-separate border-spacing-4 ${props.oClassName}`}>
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
          props.records?.map((record, ind) => {
            return <TableRecord key={ind} rowItem={record} onQtyChange={props.onQtyChange} />
          })
        }
      </tbody>
    </table>
  )
}

const TableHead = ({text} : {text: string}) => {
  return (
    <th className="font-bold uppercase">
      {text}
    </th>
  )
}

const TableRecord = ({rowItem, onQtyChange}: {rowItem: IMenuItem, onQtyChange?: (ind: number, delta: number) => void}) => {

  const iconStyle = "text-theme font-bold text-2xl border border-gray-200 hover:bg-theme hover:text-theme-w p-1 rounded-md transition-all duration-300";

  return (
    <tr className={`hover:text-theme-alt `}>
      <td>{rowItem.id}</td>
      <td className="font-semibold">{rowItem.name}</td>
      <td>{rowItem.price}</td>
      <td className="flex flex-row justify-end items-center gap-2">
        <FaMinus className={iconStyle} onClick={() => onQtyChange && onQtyChange(rowItem.id || -1, -1)} />
        <span>{rowItem.quantity}</span>
        <FaPlus className={iconStyle} onClick={() => onQtyChange && onQtyChange(rowItem.id || -1, 1)} />
      </td>
      <td className="font-semibold">{rowItem.quantity * rowItem.price}</td>
    </tr>
  )
}

export default POSTable
import React from 'react'

interface ITableProps {
  titles: string[],
  oClassName?: string,
  records?: Object[]
  onRecordClick?: (id: number) => void // callback on tr/record click
};

const Table = (props: ITableProps) => {
  return (
    <table className={`w-full text-left table-auto border rounded-md bg-theme-w-alt border-gray-500 border-separate border-spacing-4 ${props.oClassName}`}>
      <thead className="text-theme">
        <tr>
        {
          props.titles?.map((tit) => {
            return <TableHead key={tit} text={tit} />
          })
        }
        </tr>
      </thead>
      <tbody className="border-separate border-spacing-y-8">
        {
          props.records?.map((record, ind) => {
            return <TableRecord key={ind} rowObj={record} onRowClick={props?.onRecordClick} />
          })
        }
      </tbody>
    </table>
  )
}

const TableHead = ({text} : {text: string}) => {
  return (
    <th className="text-xl font-bold">
      {text}
    </th>
  )
}

const TableRecord = ({rowObj, onRowClick}: {rowObj: Object, onRowClick?: (id: number) => void}) => {
  return (
    <tr className={`hover:text-theme-alt ${onRowClick ? 'cursor-pointer' : ''}`} onClick={() => onRowClick && onRowClick(Number(Object.values(rowObj)[0]))}>
      {
        Object.values(rowObj).map((val, ind) => {
          return <TableData key={ind} data={val} /> 
        })
      }
    </tr>
  )
}

const TableData = ({data}: {data: string | number}) => {
  return (
    <td className="text-xl">
      {data}
    </td>
  )
}

export default Table
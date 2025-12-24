// This is specific to the menuItem..
import React from 'react'
import Card from './Card'
import { IMenuItem } from '@/app/menu/page'

interface IItemProps extends IMenuItem {

};

const ItemElements = ( { name, imgpath, price, quantity }: IItemProps ) => {
    return (
        <div className="flex flex-col justify-between items-center min-w-64 min-h-32 h-full gap-2">
            <h1 className="font-bold text-xl text-theme">{name}</h1>
            <img src={imgpath} alt={name} className="min-w-32 min-h-32 max-w-64 max-h-64"/>
            <div className='flex flex-col gap-2'>
                <div>
                    <span className="font-semibold">Price: </span>
                    <span>{price}</span>
                </div>
                <div>
                    <span className="font-semibold">Quantity: </span>
                    <span>{quantity}</span>
                </div>
            </div>
        </div>
    )
}

export const ItemCard = ( props : IItemProps ) => {
  return (
    <Card 
        props={<ItemElements {...props} />}
    />
  )
}
import React from 'react'
import Card from './Card'

interface IItemProps {
    name: string,
    imgPath: string,
    price: number,
    quantity: number,
};

const ItemElements = ( { name, imgPath, price, quantity }: IItemProps ) => {
    return (
        <div className="flex flex-col justify-evenly items-center min-w-64 min-h-32 gap-2">
            <h1 className="font-bold text-xl text-theme">{name}</h1>
            <img src={imgPath} alt={name} className="min-w-32 min-h-32"/>
            <div>
                <span className="font-semibold">Price: </span>
                <span>{price}</span>
            </div>
            <div>
                <span className="font-semibold">Quantity: </span>
                <span>{quantity}</span>
            </div>
        </div>
    )
}

const ItemCard = ( props : IItemProps ) => {
  return (
    <Card 
        props={<ItemElements {...props} />}
    />
  )
}

export default ItemCard
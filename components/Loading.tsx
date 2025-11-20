import React from 'react'

// for now simple interface props..
interface ILoadingProps {
    text: string,
    oClassName?: string,
};

const Loading = (props: ILoadingProps) => {
  return (
    <div className={`w-full text-center text-theme text-4xl font-bold uppercase animate-pulse ${props.oClassName}`}>
        {props.text}
    </div>
  )
}

export default Loading
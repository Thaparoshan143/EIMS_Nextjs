import React from 'react'

const Card = ({ props } : any) => {
  return (
    <div className="shadow-md rounded-xl p-4 m-4 border border-gray-200 hover:scale-[103%] hover:border-gray-400 transition-all duration-300">
        {props}
    </div>
  )
}

export default Card
import Link from 'next/link'
import { LuConstruction } from "react-icons/lu";
 
export default function PageConstruction() 
{
  return (
    <div className="flex flex-col justify-between items-center min-h-[50vh] my-[5rem] w-full text-center">
        <hr className="w-[90%] border-theme border-[1.25px] rounded-xl my-2"/>
        <h1 className="text-2xl text-black font-bold font-main uppercase">OOPS! <span className="text-theme text-4xl">Page Under Construction</span></h1>
        <LuConstruction className="text-theme text-[8rem] md:text-[12rem] m-4" />
        <hr className="w-[30%] border-theme border-[1.25px] rounded-xl my-2"/>
        <span className="font-bold font-main-alt">Something might be broken here!</span>
        <Link href={"/"} className="text-xl text-white font-bold bg-theme inline-block p-2 px-4 rounded-lg hover:scale-[105%] transition-all duration-200 ">Home</Link>
    </div>
  )
}
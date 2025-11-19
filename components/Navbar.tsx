import { _navItems } from '@/lib/data/_navItems'
import Link from 'next/link'
import React from 'react'

interface INavItem {
    title: string,
    url: string
};

const Navbar = () => {
  return (
    <nav className="z-50 flex flex-row justify-evenly items-center bg-white shadow-md text-theme font-bold px-[10%] fixed w-full">
        {
            _navItems.map((props, ind) => {
                return <NavItem key={ind} {...props} />
            })
        }
    </nav>
  )
}

const NavItem = ({title, url}: INavItem) => {
    return (
        <Link href={url} className="p-2 m-2 rounded-md hover:bg-theme-w-alt transition-colors duration-300">
            {title}
        </Link>
    )
}

export default Navbar
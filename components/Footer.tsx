import { _footerItems, _socialLinks } from '@/lib/data/_footerItems'
import Link from 'next/link';
import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'

interface IFooterItem {
    title: string,
    url: string,
};

interface ISocialLink {
    media: string,
    url: string,
};

const getIcon = (media: string) => {

    const iconStyle = "inline-block h-8 w-8";

    switch(media)
    {
        case "Facebook":
            return <FaFacebook className={iconStyle} />
        case "Instagram":
            return <FaInstagram className={iconStyle} />
        case "Linkedin":
            return <FaLinkedin className={iconStyle} />
        case "Youtube":
            return <FaYoutube className={iconStyle} />

        default:
            return;
    }
}

const Footer = () => {
  return (
    <footer className="w-full flex flex-col justify-between py-5 items-center min-h-52 bg-theme text-theme-w">
        <div className="flex flex-col justify-start items-center text-sm">
            <span className="font-bold text-lg">Other Links</span>
            {
            _footerItems.map((props, ind) => {
                return <FooterItem key={ind} {...props} />
            })
            } 
        </div>
        <hr className="text-theme-cont border-2 border-r-4 w-[50%]"/>
        {/* <div className="flex flex-row justify-evenly items-center w-[50%]">
            {
            _socialLinks.map((props, ind) => {
                return <SocialItem key={ind} {...props} />
            })
            }
        </div> */}
        <div className="text-[0.7rem] text-center">
            <p>All rights reserved | @{new Date().getFullYear()}</p>
            <p>Powered by Next.js</p>
        </div>
    </footer>
  )
}

const FooterItem = ({title, url}: IFooterItem) => {
    return (
        <Link href={url} className="my-1 hover:underline hover:opacity-80">
            {title}
        </Link>
    )
}

const SocialItem = ({media, url}: ISocialLink) => {
    return (
        <Link href={url} className="text-white hover:text-theme-w-alt">
            {getIcon(media)}
        </Link>
    )
}

export default Footer
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
    <footer className="w-full flex flex-col justify-between py-5 items-center min-h-16 bg-theme text-theme-w">
        <div className="w-full flex flex-row justify-center items-center text-sm gap-10">
            <span className="font-bold text-md">Quick Links:</span>
            {
            _footerItems.map((props, ind) => {
                return <FooterItem key={ind} {...props} />
            })
            } 
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
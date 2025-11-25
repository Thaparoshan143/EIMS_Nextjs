import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_ADMIN_CRED_USER: process.env.NEXT_PUBLIC_ADMIN_CRED_USER,
    NEXT_PUBLIC_ADMIN_CRED_PASSWORD: process.env.NEXT_PUBLIC_ADMIN_CRED_PASSWORD,
    NEXT_PUBLIC_ADMIN_CRED_TOKEN: process.env.NEXT_PUBLIC_ADMIN_CRED_TOKEN,

    NEXT_PUBLIC_MENU_FETCH_URL: process.env.NEXT_PUBLIC_MENU_FETCH_URL,
    NEXT_PUBLIC_DB_URL: process.env.NEXT_PUBLIC_DB_URL,
  }
};

export default nextConfig;

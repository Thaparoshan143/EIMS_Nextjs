'use client'

import ThemeButton from "@/components/ThemeButton";
import { verifyUser } from "@/lib/utils/util";
import { useRouter } from "next/navigation";
import { showToast, ToastOptions } from "nextjs-toast-notify";
import { useEffect, useState } from "react";

interface IUserCred {
  user: string,
  password: string
};

interface ILoginMsg
{
  type: "error" | "info" | "success" | "warning",
  text?: string,
};

export default function Login() {

  const [cred, setCred] = useState<IUserCred>({ user: '', password: '' });
  const router = useRouter();
  const [msg, setMsg] = useState<ILoginMsg>(); // this is toast message..
  let adminToken = process.env.NEXT_PUBLIC_ADMIN_CRED_TOKEN;

  const setUser = (val: string) => {
    setCred((prev) => ({...prev, user: val}))
  }
  
  const setPassword = (val: string) => {
    setCred((prev) => ({...prev, password: val}))
  }

  const toastOtherArgs: ToastOptions = {
    duration: 4000,
    progress: true,
    position: "top-right",
    transition: "fadeIn",
    icon: '',
    sound: true,
  };

  const showToastHelper = () => {
    switch(msg?.type)
    {
      case "success":
        showToast.success(msg?.text || "Success", toastOtherArgs);
      break;
      case "error":
        showToast.error(msg?.text || "Error", toastOtherArgs);
      break;
      case "warning":
        showToast.success(msg?.text || "Warning", toastOtherArgs);
      break;
      case "info":
        showToast.success(msg?.text || "Info", toastOtherArgs);
      break;
      default:
        showToast.error("Unknown Error!! try again!", toastOtherArgs);
      break;
    }
  }

  const authUser = (e: any) => {
    console.log("Submit clicked!! autheticating..");
    e.preventDefault();
    console.log(cred);

    // #warn: this is temporary authentication for testing only...
    if (verifyUser(cred))
    {
      console.log("Admin verified...");
      setMsg(() => ({ type: "success", text: "Admin verified.."}))

      localStorage.setItem("token", adminToken || "")
      router.push('/dashboard');
    }
    else
    {
      setMsg(() => ({ type: "error", text: "Invalid Cred.."}))

      console.log("Cred. don't match for admin..");
    }
  }

  useEffect(() => {
    showToastHelper();
  }, [msg])

  useEffect(() => {
    if (localStorage.getItem('token') == adminToken)
    {
      // already verified user trying to go to login page..
      router.push("/dashboard");
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col justify-evenly items-center py-32">
      <form 
        onSubmit={(e) => authUser(e)} 
        onReset={(o) => setCred({user: '', password: ''})} 
        className="flex flex-col justify-between items-center min-w-100 min-h-100 bg-theme-w border border-gray-300 rounded-xl shadow-md pb-8 gap-4"
      >
        <h1 className="text-theme-w font-bold text-2xl w-full bg-theme py-10 text-center">Welcome to EIMS</h1>
        <div className="w-full flex flex-row justify-between items-center px-4">
          <label className="text-theme inline-block">User: </label>
          <input 
            onChange={(e) => setUser(e.target.value)} 
            type="text" 
            value={cred?.user} 
            className="min-w-[60%] text-theme outline-none border-2 border-transparent focus:border-theme border-b-theme focus:rounded-md transition-all duration-200 p-2 text-md" 
            placeholder="Enter username here..." 
          />
        </div>
        <div className="w-full flex flex-row justify-between items-center px-4">
          <label className="text-theme inline-block">Password: </label>
          <input 
            onChange={(e) => setPassword(e.target.value)} 
            type="password" 
            value={cred?.password} 
            className="min-w-[60%] text-theme outline-none border-2 border-transparent focus:border-theme border-b-theme focus:rounded-md transition-all duration-200 p-2 text-md" 
            placeholder="Enter password here..." 
          />
        </div>
        <div className="flex flex-row w-full justify-evenly items-center">
          <ThemeButton label="Login" type={"submit"} />
          <ThemeButton label="Reset" type={"reset"} />
        </div>
      </form>
    </div>
  );
}

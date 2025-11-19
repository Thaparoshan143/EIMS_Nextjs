'use client'

import ThemeButton from "@/components/ThemeButton";
import { useState } from "react";

interface IUserCred {
  user: string,
  password: string
};

export default function Login() {

  const [cred, setCred] = useState<IUserCred>({ user: '', password: '' });

  const setUser = (val: string) => {
    setCred((prev) => {
      const nV = {...prev};
      nV.user = val;
      return nV;
    })
  }
  
  const setPassword = (val: string) => {
    setCred((prev) => {
      const nV = {...prev};
      nV.password = val;
      return nV;
    })
  }

  const authUser = (e: any) => {
    console.log("Submit clicked!! autheticating..");
    e.preventDefault();
    // console.log(cred);
    // authetication logic below...for dashboard access..
  }

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

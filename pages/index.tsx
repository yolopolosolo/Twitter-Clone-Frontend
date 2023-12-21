import React, { useCallback } from 'react';
import Image from 'next/image'
import { FaXTwitter ,FaPeopleLine } from "react-icons/fa6";
import { GoHome,GoSearch,GoBell,GoMail ,GoPerson } from "react-icons/go";
import { CgMoreO } from "react-icons/cg";
import { PiNotebook } from "react-icons/pi";
import { link } from 'fs';
import FeedCard from "@/components/FeedCard"
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';
import { graphqlClient } from '@/clients/api';
import { verifyGoogleTokenQuery } from '@/graphql/query/user';



interface TwitterSidebarButton{
  title:string
  icon:React.ReactNode
}

const sideBarItems: TwitterSidebarButton[] = [
  {
    title:"Home",
    icon:<GoHome />
  },
  {
    title:"Explore",
    icon:<GoSearch />
  },
  {
    title:"Notifications",
    icon: <GoBell/>
  },
  {
    title:"Messages",
    icon: <GoMail/>
  },
  {
    title:"Lists",
    icon: <PiNotebook/>
  },
  {
    title:"Communities",
    icon: <FaPeopleLine/>
  },
  {
    title:"Premium",
    icon: <FaXTwitter/>
  },
  {
    title:"Profile",
    icon: <GoPerson/>
  },
  {
    title:"More",
    icon: <CgMoreO/>
  }
];

export default function Home() {

  const handleGoogleLogin = useCallback(async (cred:CredentialResponse)=>{
    const googleTokenId = cred.credential;
    console.log(`GoogleTokenID + ${googleTokenId}`);
    if(!googleTokenId) return toast.error("Google Login Failed");

    const {verifyGoogleToken} = await graphqlClient.request(
      verifyGoogleTokenQuery,
      {token:googleTokenId}
    );
    
    toast.success("Login Success");
    console.log(verifyGoogleToken);

    if(verifyGoogleToken){
      window.localStorage.setItem('__twitter__token', verifyGoogleToken)
    }

  },[])

  return (
    <div>
      <div className='grid grid-cols-12 h-screen w-screen px-40 pt-8 overflow-auto'>
        <div className="col-span-3">
          <div className="text-3xl h-fit w-fit hover:bg-gray-800 rounded-full p-3 cursor-pointer transition-all  ml-4">
          <FaXTwitter />
          </div>
          <div className='mt-1 text-xl px-5'>
            <ul>
            {sideBarItems.map(item=> 
              <li className='flex justify-start items-center gap-4 hover:bg-gray-800 hover:font-bold  rounded-full cursor-pointer transition-all px-3 py-2 w-fit' key={item.title}>
                <span className='text-2xl'>{item.icon}</span> 
                <span>{item.title}</span> 
              </li>
              )
            }
            </ul>
            <div className=' mt-4 pr-4'>
              <button className=' bg-[#1D9BF0] py-3  rounded-full w-full text-white hover:bg-sky-600 font-semibold text-lg'>Post</button>
            </div>  
          </div>
        </div>
        <div className="col-span-5 overflow-scroll no-scrollbar">
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
        </div>
        <div className=' col-span-3 p-5'>
          <div className=" p-5 bg-slate-950 rounded-lg">
            <h1 className='my-2 text-xl'>New To Twitter ?</h1>
          <GoogleLogin onSuccess={handleGoogleLogin} />
          </div>
        </div>
      </div> 
    </div>
  )
}

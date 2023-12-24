import React, { useCallback, useState } from 'react';
import Image from 'next/image'
import { FaXTwitter ,FaPeopleLine } from "react-icons/fa6";
import { GoHome,GoSearch,GoBell,GoMail ,GoPerson } from "react-icons/go";
import { RiImageAddLine } from "react-icons/ri";
import { CgMoreO } from "react-icons/cg";
import { PiNotebook } from "react-icons/pi";
import { link } from 'fs';
import FeedCard from "@/components/FeedCard"
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';
import { graphqlClient } from '@/clients/api';
import { verifyGoogleTokenQuery } from '@/graphql/query/user';
import { useCurrentUser } from '@/hooks/user';
import { useQueryClient } from '@tanstack/react-query';
import { QueryDocumentKeys } from 'graphql/language/ast';
import { useCreateTweet, useGetAllTweets } from '@/hooks/tweet';
import { Tweet } from '@/gql/graphql';



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

  const {user} = useCurrentUser();
  const {tweets = []} = useGetAllTweets();
  const {mutate} = useCreateTweet();
  const queryClient = useQueryClient();

  const [content,setContent] = useState('')

  ///Handle image add 
  const handleImageAddClick = useCallback(()=>{
    const input = document.createElement('input');
    input.setAttribute('type','file');
    input.setAttribute('accept','image/*');
    input.click();
  },[]);

  ///Handle  Google login
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

    await queryClient.invalidateQueries({queryKey:["current-user"]});

  },[queryClient])

  ///Create Tweet Callback
  const handleCreateTweet = useCallback(()=>{
    mutate({
      content
    });
  },[content,mutate])

  return (
    <div>
      <div className='grid grid-cols-12 h-screen w-screen px-40 pt-8 overflow-auto'>
        <div className="col-span-3 relative">
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
            <div className=' mt-4 pr-10'>
              <button className=' bg-[#1D9BF0] py-2  rounded-full w-full text-white hover:bg-sky-600 font-semibold text-xl'>Post</button>
            </div>  
            {
              user &&
              <div className='absolute bottom-5 flex gap-2 items-center hover:bg-gray-800 transition-all cursor-pointer p-2 rounded-full w-60'>
                {
                user &&
                user.profileImageUrl &&
                (
                <Image className='rounded-full' src={user.profileImageUrl} alt='user-image' height={50} width={50} />
                )
                }
                <div className='flex'>
                <h3 className='text-xl'>{user.firstName} {user.lastName}</h3>
                </div>
                
              </div>
            }
          </div>
        </div>
        <div className="col-span-5 overflow-scroll no-scrollbar">
          <div>
            <div className="border-b border-slate-900 p-5">
              <div className="grid grid-cols-12 gap-3">
                <div className=" col-span-1">
                  {
                    user?.profileImageUrl &&
                    (
                    <Image
                    className='rounded-full'
                    src={user.profileImageUrl} 
                    alt="user-image" 
                    height={50} 
                    width={50}/>
                    )
                  }
                </div>
                <div className='col-span-11'>
                  <textarea 
                    value = {content}
                    onChange={(e)=> setContent(e.target.value)}
                    className=' w-full bg-transparent text-xl px-2 border-b border-slate-900 outline-none' 
                    rows={2}
                    placeholder="What's happening?" 
                  ></textarea>
                  <div className='mt-1 flex justify-between items-center'>
                    <RiImageAddLine onClick={handleImageAddClick} className="text-xl"/>
                    <button
                      onClick={handleCreateTweet}
                      className=' bg-[#1D9BF0] rounded-full text-white hover:bg-sky-600 font-semibold py-1 px-4 text-sm'>Post</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {tweets &&
            tweets.map(tweet=> tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet}/> : null)
          }
        </div>
        <div className=' col-span-3 p-5'>
          {!user &&
          <div className=" p-5 bg-slate-950 rounded-lg">
            <h1 className='my-2 text-xl'>New To Twitter ?</h1>
            <GoogleLogin onSuccess={handleGoogleLogin} />
          </div>
          } 
        </div>
      </div> 
    </div>
  )
}

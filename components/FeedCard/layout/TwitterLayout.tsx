import { useCurrentUser } from "@/hooks/user";
import React, { useCallback, useMemo } from "react";
import { CgMoreO } from "react-icons/cg";
import { FaPeopleLine, FaXTwitter } from "react-icons/fa6";
import { GoBell, GoHome, GoMail, GoPerson, GoSearch } from "react-icons/go";
import { PiNotebook } from "react-icons/pi";
import Image from 'next/image'
import Link from "next/link";
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyGoogleTokenQuery } from "@/graphql/query/user";
import { useQueryClient } from "@tanstack/react-query";

interface TwitterSidebarButton{
    title:string
    icon:React.ReactNode
    link:string
  }
  
  

interface TwitterLayoutProps{
    children: React.ReactNode
}



const TwitterLayout: React.FC<TwitterLayoutProps> = (props)=>{
    const {user} = useCurrentUser();
    const queryClient = useQueryClient();

    const sideBarItems:TwitterSidebarButton[] = useMemo(()=> [
        {
          title:"Home",
          icon:<GoHome />,
          link:'/'
          
        },
        {
          title:"Explore",
          icon:<GoSearch />,
          link:'/'
        },
        {
          title:"Notifications",
          icon: <GoBell/>,
          link:'/'
        },
        {
          title:"Messages",
          icon: <GoMail/>,
          link:'/'
        },
        {
          title:"Lists",
          icon: <PiNotebook/>,
          link:'/'
        },
        {
          title:"Communities",
          icon: <FaPeopleLine/>,
          link:'/'
        },
        {
          title:"Premium",
          icon: <FaXTwitter/>,
          link:'/'
        },
        {
          title:"Profile",
          icon: <GoPerson/>,
          link:`/${user?.id}`
        },
        {
          title:"More",
          icon: <CgMoreO/>,
          link:'/'
        }
      ],[user?.id])

    ///Handle  Google login
    const handleGoogleLogin = useCallback(async (cred: CredentialResponse) => {
        const googleTokenId = cred.credential;
        console.log(`GoogleTokenID + ${googleTokenId}`);
        if (!googleTokenId) return toast.error("Google Login Failed");

        const {
            verifyGoogleToken
        } = await graphqlClient.request(
            verifyGoogleTokenQuery, {
                token: googleTokenId
            }
        );

        toast.success("Login Success");
        console.log(verifyGoogleToken);

        if (verifyGoogleToken) {
            window.localStorage.setItem('__twitter__token', verifyGoogleToken)
        }

        await queryClient.invalidateQueries({
            queryKey: ["current-user"]
        });

    }, [queryClient])
  
    return (

        <div>
            <div className='grid grid-cols-12 h-screen w-screen sm:px-40 pt-8 overflow-auto'>
                <div className="col-span-2 sm:col-span-3 relative flex sm:justify-end pr-4 mr-2">
                    <div>
                        <div
                            className="text-3xl h-fit w-fit hover:bg-gray-800 rounded-full p-3 cursor-pointer transition-all  ml-4">
                            <FaXTwitter />
                        </div>
                        <div className='mt-1 text-xl px-5'>
                            <ul>
                                {sideBarItems.map(item=>
                                <li 
                                    key={item.title}>
                                    <Link className='flex justify-start items-center gap-4 hover:bg-gray-800 hover:font-bold rounded-full cursor-pointer transition-all px-3 py-2 w-fit'
                                    href={item.link}>
                                    <span className='text-2xl'>{item.icon}</span>
                                    <span className="hidden sm:inline">{item.title}</span>
                                    </Link>
                                </li>
                                )
                                }
                            </ul>
                            <div className=' mt-4 pr-10'>
                                <button
                                    className=' bg-[#1D9BF0] py-2  rounded-full w-full text-white hover:bg-sky-600 font-semibold text-xl'>Post</button>
                            </div>
                            {
                        user &&
                        <div
                            className='absolute bottom-5 flex gap-2 items-center cursor-pointer pr-3 rounded-full w-50'>
                            {
                            user &&
                            user.profileImageUrl &&
                            (
                            <Image className='rounded-full' src={user.profileImageUrl} alt='user-image' height={40}
                                width={40} />
                            )
                            }
                            <div className='flex'>
                                <h3 className='hidden sm:inline text-lg'>{user.firstName} {user.lastName}</h3>
                            </div>

                        </div>
                    }
                        </div>
                    </div>
                    
                </div>
                <div className="col-span-10 sm:col-span-5 overflow-scroll no-scrollbar">
                    {props.children}
                </div>
                <div className='col-span-0 sm:col-span-3 p-5'>
                    {
                    !user ?
                    (<div className=" p-5 bg-slate-950 rounded-lg">
                        <h1 className='my-2 text-xl'>New To Twitter ?</h1>
                        <GoogleLogin onSuccess={handleGoogleLogin} />
                    </div>
                    ) :
                    <div className="  ml-8  p-5 bg-slate-900 rounded-lg">
                        <h1 className='my-2 mb-3 text-xl'>Users You May Know</h1>
                        {
                        user?.recommendedUsers?.map(x =>
                        <div className="flex items-center gap-3 mt-2 p-1" key={x?.id}>
                            {
                            x?.profileImageUrl &&
                            <Image className='rounded-full' src={x?.profileImageUrl} alt="recommended-user-image" height={60}
                                width={60}></Image>
                            }
                            <div>
                                <div className="text-md">
                                {x?.firstName} {x?.lastName}
                                </div>
                                <Link href={`/${x?.id}`} className="bg-white text-black text-md px-4 py-1 rounded-lg "> View</Link>
                            </div>
                            
                        </div>
                        )}
                    </div>
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default TwitterLayout;
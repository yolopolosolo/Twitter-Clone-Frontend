import { useRouter } from "next/router";
import TwitterLayout from "@/components/FeedCard/layout/TwitterLayout";
import type { GetServerSideProps, NextPage } from "next";
import { IoIosArrowRoundBack } from "react-icons/io";
import { TbUserPlus } from "react-icons/tb";
import { BiUserMinus } from "react-icons/bi";
import Image from 'next/image'
import { resolveTypeReferenceDirective } from "typescript";
import { useCurrentUser, useUserById } from "@/hooks/user";
import FeedCard from "@/components/FeedCard";
import { Tweet, User } from '@/gql/graphql';
import { graphqlClient } from "@/clients/api";
import { getUserByIdQuery } from "@/graphql/query/user";
import { useCallback } from "react";
import { followUserMutation, unFollowUserMutation } from "@/graphql/mutations/user";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

interface ServerProps{
    user?:User
}


const UserProfilePage: NextPage<ServerProps>= (props :ServerProps)=>{
    const router = useRouter();
    const {user:currentUser} = useCurrentUser();
    const userId = router.query.id as string;
    const {userById = props.user as User} = useUserById(userId);

    const queryClient =  useQueryClient();
    const handleBackClick = useCallback(()=>{
        router.back()
    },[router])

    //unfollow
    const handleUnfollowUser = useCallback(async ()=>{
        if(!userById?.id) return;
        await graphqlClient.request(
            unFollowUserMutation,
            {to:userById?.id}
        )

        await queryClient.invalidateQueries({queryKey:['current-user']});
        await queryClient.invalidateQueries({queryKey:['user-by-id']});
    },[userById?.id, queryClient])

    //follow
    const handleFollowUser = useCallback(async ()=>{
        if(!userById?.id) return;
        await graphqlClient.request(
            followUserMutation,
            {to:userById?.id}
        )

        await queryClient.invalidateQueries({queryKey:['current-user']});
        await queryClient.invalidateQueries({queryKey:['user-by-id']});
    },[userById?.id, queryClient])

    return(
        <div>
            <TwitterLayout>
                <div>
                    <nav className=" flex items-center gap-3 py-1">
                    <IoIosArrowRoundBack className="text-3xl cursor-pointer" onClick={handleBackClick}/>
                    <div>
                        <h1 className="text-xl font-bold">{userById?.firstName} {userById?.lastName}</h1>
                        <h1 className=" text-gray-500 text-sm">{userById?.tweets?.length} Tweets </h1>
                    </div>
                    </nav>
                    <div className="p-3 border-b border-slate-800">{
                    userById?.profileImageUrl &&
                    <Image className='rounded-full ml-3' src={userById?.profileImageUrl} alt="user-image" height={100} width={100} />
                    }
                    <h1 className="text-lg ml-3 mt-2">{userById?.firstName} {userById?.lastName}</h1>
                   <div className="flex justify-between items-center">
                        <div className="ml-3 flex gap-4 text-sm mt-2 text-gray-500">
                            <span>{userById?.follower?.length} Followers</span>
                            <span>{userById?.following?.length} Following</span>
                        </div>
                        {
                        currentUser 
                        &&
                        currentUser?.id !== userById?.id &&
                        (
                            <>
                            {
                                currentUser.following?.findIndex(x=>x?.id == userById?.id) !== -1?
                                <button onClick={handleUnfollowUser} className="bg-white text-black rounded-full text-sm px-3 py-1 flex justify-between items-center gap-1"><BiUserMinus />Unfollow</button>:
                                <button onClick={handleFollowUser} className="bg-white text-black rounded-full text-sm px-3 py-1 flex justify-between items-center gap-1"><TbUserPlus />Follow</button> 
                                
                            }
                            </>
                            
                            
                        )
                        
                        }   
                   </div>
                    </div>
                    {
                        userById?.tweets && userById.tweets.map(tweet => tweet ? <FeedCard key={tweet.id} data={tweet as Tweet} /> : null)
                        
                    }
                </div>
            </TwitterLayout>
        </div>
    )
}

export const getServerSideProps : GetServerSideProps<ServerProps> = async(context)=>{
    const id = context.query.id as string | undefined;

    if(!id) return {notFound: true, props:{user:undefined}}

    const userInfo =await graphqlClient.request(
        getUserByIdQuery,{id:id}
    )

    if(!userInfo?.getUserById) return {notFound:true}

    return{
        props:{
            user: userInfo.getUserById as User
        }
    }
}

export default UserProfilePage;
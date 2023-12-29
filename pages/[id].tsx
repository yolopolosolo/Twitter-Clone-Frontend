import { useRouter } from "next/router";
import TwitterLayout from "@/components/FeedCard/layout/TwitterLayout";
import type { GetServerSideProps, NextPage } from "next";
import { IoIosArrowRoundBack } from "react-icons/io";
import Image from 'next/image'
import { resolveTypeReferenceDirective } from "typescript";
import { useCurrentUser } from "@/hooks/user";
import FeedCard from "@/components/FeedCard";
import { Tweet, User } from '@/gql/graphql';
import { graphqlClient } from "@/clients/api";
import { getUserByIdQuery } from "@/graphql/query/user";

interface ServerProps{
    user?:User
}


const UserProfilePage: NextPage<ServerProps>= (props)=>{
    const router = useRouter();
    return(
        <div>
            <TwitterLayout>
                <div>
                    <nav className=" flex items-center gap-3 py-1">
                    <IoIosArrowRoundBack className="text-3xl"/>
                    <div>
                        <h1 className="text-xl font-bold">{props.user?.firstName} {props.user?.lastName}</h1>
                        <h1 className=" text-gray-500 text-sm">{props.user?.tweets?.length} Tweets </h1>
                    </div>
                    </nav>
                    <div className="p-3 border-b border-slate-800">{
                    props.user?.profileImageUrl &&
                    <Image className='rounded-full ml-3' src={props.user?.profileImageUrl} alt="user-image" height={100} width={100} />
                    }
                    <h1 className="text-lg ml-3 mt-2">{props.user?.firstName} {props.user?.lastName}</h1>
                    </div>
                    {
                        props.user?.tweets && props.user.tweets.map(tweet => tweet ? <FeedCard key={tweet.id} data={tweet as Tweet} /> : null)
                        
                    }
                </div>
            </TwitterLayout>
        </div>
    )
}

export const getServerSideProps : GetServerSideProps<ServerProps> = async(context)=>{
    const id = context.query.id as string | undefined;
    console.log(id);

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
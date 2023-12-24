import React from "react";
import Image from "next/image";
import { LiaReplySolid } from "react-icons/lia";
import { AiOutlineRetweet } from "react-icons/ai";
import { LuHeart, LuShare2  } from "react-icons/lu";
import { Tweet } from "@/gql/graphql";

interface FeedCardProps{
    data: Tweet
}


const FeedCard: React.FC<FeedCardProps> = (props) => {
    const {data} = props
    return <div className="border-b border-slate-900 p-5 hover:bg-slate-800 transition-all cursor-pointer">
        <div className="grid grid-cols-12 gap-3">
            <div className=" col-span-1">{
                data.author?.profileImageUrl &&
                (<Image src={data.author?.profileImageUrl} alt="user-image" height={50} width={50}/>)
            }
            </div>
            <div className=" col-span-11">
                <h5>{data.author?.firstName} {data.author?.lastName}</h5>
                <p>{data.content}</p>

                <div className="flex justify-between mt-5 text-xl p-3 w-[90%]">
                    <div> <LiaReplySolid/></div>
                    <div> <AiOutlineRetweet/></div>
                    <div> <LuHeart/></div>
                    <div> <LuShare2 /></div>
                </div>
                
            </div>
        </div>
    </div>
}

export default FeedCard;
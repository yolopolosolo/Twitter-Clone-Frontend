import React from "react";
import Image from "next/image";
import { LiaReplySolid } from "react-icons/lia";
import { AiOutlineRetweet } from "react-icons/ai";
import { LuHeart, LuShare2  } from "react-icons/lu";

const FeedCard: React.FC = () => {
    return <div className="border-b border-slate-900 p-5 hover:bg-slate-800 transition-all cursor-pointer">
        <div className="grid grid-cols-12 gap-3">
            <div className=" col-span-1">
                <Image src="https://avatars.githubusercontent.com/u/55348394?v=4" alt="user-image" height={50} width={50}/>
            </div>
            <div className=" col-span-11">
                <h5>Sarvesh Makane</h5>
                <p>
                Hello 𝕏 ,<br/>
                Message me for adaasdasdasdadadsasdasdasdasdadsasdadsasdad adwqffascascasdcadsdasdasdasd :<br/>
                - abc<br/>
                - abc<br/>
                - abc<br/>

                Lets Connect!<br/>
                Retweets Appreciated :)<br/>
                </p>

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
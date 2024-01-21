import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image'
import { RiImageAddLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import FeedCard from "@/components/FeedCard";
import { useCurrentUser } from '@/hooks/user';
import { useCreateTweet, useGetAllTweets } from '@/hooks/tweet';
import { Tweet } from '@/gql/graphql';
import TwitterLayout from '@/components/FeedCard/layout/TwitterLayout';
import { GetServerSideProps } from 'next';
import { graphql } from '@/gql';
import { graphqlClient } from '@/clients/api';
import { getAllTweetsQuery, getSignedURLForTweetImageQuery } from '@/graphql/query/tweet';
import axios from 'axios';
import toast from 'react-hot-toast';


interface HomeProps{
  tweets?:Tweet[]
}


export default function Home(props:HomeProps) {
  const {user} = useCurrentUser();
  const {mutateAsync} = useCreateTweet();
  const {tweets=props.tweets as Tweet[]} = useGetAllTweets()


  const [content,setContent] = useState('');
  const [ImageURL,setImageURL] = useState('');

  const handleInputFileChange = useCallback((input:HTMLInputElement) =>{
    return async (event:Event)=>{
      event.preventDefault();
      const file: File | null | undefined = input.files?.item(0);
      if(!file) return

      const {getSignedURLForTweet} = await graphqlClient.request(
        getSignedURLForTweetImageQuery,
        {
          imageName:file.name,
          imageType:file.type
        }
      )

      if(getSignedURLForTweet){
        toast.loading('image uploading.....',{id:'2'})
        await axios.put(getSignedURLForTweet,file,{
          headers:{
            'Content-Type': file.type
          }
        })

        toast.success('Done',{id:'2'})
        const url = new URL(getSignedURLForTweet);
        const myUploadedFilePath = `${url.origin}${url.pathname}`; 
        setImageURL(myUploadedFilePath)
      }
    }
  },[])

  ///Handle image add 
  const handleImageAddClick = useCallback(()=>{
    const input = document.createElement('input');
    input.setAttribute('type','file');
    input.setAttribute('accept','image/*');

    const handlerFn = handleInputFileChange(input)

    input.addEventListener('change',handlerFn)

    input.click();
  },[handleInputFileChange]);

  const handleImageRemoval = useCallback(()=>{
    setImageURL('');
  },[])

  ///Create Tweet Callback
  const handleCreateTweet = useCallback(async ()=>{
    await mutateAsync({
      content,
      ImageURL,
    });

    setContent('')
    setImageURL('')
  },[mutateAsync,content,ImageURL])

  return (
    <div>
      <TwitterLayout>
        {user?.id &&
        <div>
          <div className="border-b border-slate-900 p-5">
            <div className="grid grid-cols-12 gap-3">
              <div className=" col-span-1">
                {
                user?.profileImageUrl &&
                (
                <Image className='rounded-full' src={user.profileImageUrl} alt="user-image" height={50} width={50} />
                )
                }
              </div>
              <div className='col-span-11'>
                <textarea value={content} onChange={(e)=> setContent(e.target.value)}
                    className=' w-full bg-transparent text-xl px-2 border-b border-slate-900 outline-none' 
                    rows={2}
                    placeholder="What's happening?" 
                  ></textarea>
                  {
                    ImageURL &&
                    <div className='flex'>
                      <Image
                    src={ImageURL}
                    alt='tweet-image'
                    width={250}
                    height={250}
                    /> 
                    <IoMdClose onClick={handleImageRemoval} className=' hover:bg-slate-600 cursor-pointer '/>
                    </div>
                    

                  }
                <div className='mt-1 flex justify-between items-center'>
                  <RiImageAddLine onClick={handleImageAddClick} className="text-xl" />
                  <button onClick={handleCreateTweet}
                    className=' bg-[#1D9BF0] rounded-full text-white hover:bg-sky-600 font-semibold py-1 px-4 text-sm'>Post</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        }
        {tweets &&
        tweets.map(tweet=> tweet ?
        <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null)
        }
      </TwitterLayout>
    </div>
  )
}

export const getServerSideProps : GetServerSideProps<HomeProps> = async(context)=>{
  const tweets = await graphqlClient.request(
    getAllTweetsQuery
  );

  return{
    props:{
      tweets: tweets.getAllTweets as Tweet[]
    }
  }
}
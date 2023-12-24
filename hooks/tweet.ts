import { graphqlClient } from "@/clients/api"
import { getAllTweetsQuery } from "@/graphql/query/tweet"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {createTweetMutation} from "../graphql/mutations/tweet"
import { CreateTweetData } from "@/gql/graphql"
import toast from "react-hot-toast"

export const useCreateTweet = ()=>{
    const queryClient = useQueryClient();
    const mutation = useMutation(
        {
            mutationFn: (paylaod:CreateTweetData)=> graphqlClient.request(
                createTweetMutation,
                {paylaod}
                ),
            onMutate:(paylaod)=> toast.loading("Creating a Post...",{id:"1"}),
            onSuccess: async (paylaod)=> {

                await queryClient.invalidateQueries({queryKey:["all-tweets"]})
                toast.success('Success',{id:"1"})
            },

        }
    )

    return mutation;
}

export const useGetAllTweets = ()=>{
    const query = useQuery(
        {
            queryKey:['all-tweets'],
            queryFn:()=> graphqlClient.request(getAllTweetsQuery)
        })
    
        return {...query,tweets:query.data?.getAllTweets}
}
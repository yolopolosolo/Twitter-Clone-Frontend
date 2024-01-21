import { graphqlClient } from "@/clients/api"
import { getLoggedInUserQuery, getUserByIdQuery } from "@/graphql/query/user"
import { useQuery } from "@tanstack/react-query"

export const useCurrentUser = () =>{
    const query = useQuery(
        {
            queryKey:['current-user'],
            queryFn:()=> graphqlClient.request(
                getLoggedInUserQuery
            )
        }
    )

    return {...query, user:query.data?.getCurrentUser}
};

export const useUserById = (ID:string)=>{
    const query = useQuery(
        {
            queryKey:['user-by-id'],
            queryFn:()=>graphqlClient.request(
                getUserByIdQuery,{id:ID}
            )
        }
    )

    return {...query, userById:query.data?.getUserById}
}


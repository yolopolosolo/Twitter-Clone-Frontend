import { graphqlClient } from "@/clients/api"
import { getLoggedInUserQuery } from "@/graphql/query/user"
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
import { GraphQLClient } from "graphql-request";

const isClient = typeof window !== 'undefined';

export const graphqlClient = new GraphQLClient(
    'https://twitter-clone-backend-g7sr.onrender.com/graphql',
    {
        headers: ()=>({
            Authorization: 
            isClient 
            ? `Bearer ${window.localStorage.getItem("__twitter__token")}`
            : "" 
        })
    }
);

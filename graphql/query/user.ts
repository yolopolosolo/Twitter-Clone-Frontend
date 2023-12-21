import {graphql} from "../../gql";

export const verifyGoogleTokenQuery = graphql(`#graphql
query verifyUserWithGoogleToken($token: String!){
    verifyGoogleToken(token: $token)
}
`);
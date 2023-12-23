import {graphql} from "../../gql";

export const verifyGoogleTokenQuery = graphql(`#graphql
query verifyUserWithGoogleToken($token: String!){
    verifyGoogleToken(token: $token)
}
`);

export const getLoggedInUserQuery = graphql(`#graphql
query GetUser {
  getCurrentUser {
    id,
    firstName,
    lastName,
    profileImageUrl,
    email
  }
}
`);
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
    follower {
      id
      firstName
      lastName,
      profileImageUrl,
    }
    following {
      id
      firstName
      lastName,
      profileImageUrl
    }
    recommendedUsers {
      id,
      firstName,
      lastName,
      profileImageUrl
    }
    tweets{
      id
      content
      ImageURL
      author{
        id,
        firstName,
        lastName,
        profileImageUrl
      }
    }
  }
}
`);

export const getUserByIdQuery = graphql(`#graphql
query GetUserById($id: ID!) {
  getUserById(id: $id) {
    id,
    firstName,
    lastName,
    profileImageUrl,
    email
    follower {
      id
      firstName
      lastName,
      profileImageUrl
    }
    following {
      id
      firstName
      lastName,
      profileImageUrl
    }
    tweets{
      id
      content
      ImageURL
      author{
        id,
        firstName,
        lastName,
        profileImageUrl
      }
    }
  }
}
`);
import { graphql } from "@/gql";

export const getAllTweetsQuery = graphql(`#graphql

    query GetAllTweets{
    getAllTweets {
    id,
    content,
    ImageURL,
    author {
    id,
    firstName,
    lastName,
    profileImageUrl
    }
  }
    }
`);
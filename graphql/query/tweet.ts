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

export const getSignedURLForTweetImageQuery = graphql(`#graphql
query GetSignedURL($imageName: String!, $imageType: String!) {
  getSignedURLForTweet(imageName: $imageName, imageType: $imageType)
}
`)
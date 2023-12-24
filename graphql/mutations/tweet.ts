import { graphql } from "@/gql";

export const createTweetMutation = graphql(`#graphql
    mutation CreateTweet($paylaod: CreateTweetData!) {
    createTweet(paylaod: $paylaod) {
    id
    }
    }
`);
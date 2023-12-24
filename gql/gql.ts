/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "#graphql\n    mutation CreateTweet($paylaod: CreateTweetData!) {\n    createTweet(paylaod: $paylaod) {\n    id\n    }\n    }\n": types.CreateTweetDocument,
    "#graphql\n\n    query GetAllTweets{\n    getAllTweets {\n    id,\n    content,\n    ImageURL,\n    author {\n    firstName,\n    lastName,\n    profileImageUrl\n    }\n  }\n    }\n": types.GetAllTweetsDocument,
    "#graphql\nquery verifyUserWithGoogleToken($token: String!){\n    verifyGoogleToken(token: $token)\n}\n": types.VerifyUserWithGoogleTokenDocument,
    "#graphql\nquery GetUser {\n  getCurrentUser {\n    id,\n    firstName,\n    lastName,\n    profileImageUrl,\n    email\n  }\n}\n": types.GetUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    mutation CreateTweet($paylaod: CreateTweetData!) {\n    createTweet(paylaod: $paylaod) {\n    id\n    }\n    }\n"): (typeof documents)["#graphql\n    mutation CreateTweet($paylaod: CreateTweetData!) {\n    createTweet(paylaod: $paylaod) {\n    id\n    }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n\n    query GetAllTweets{\n    getAllTweets {\n    id,\n    content,\n    ImageURL,\n    author {\n    firstName,\n    lastName,\n    profileImageUrl\n    }\n  }\n    }\n"): (typeof documents)["#graphql\n\n    query GetAllTweets{\n    getAllTweets {\n    id,\n    content,\n    ImageURL,\n    author {\n    firstName,\n    lastName,\n    profileImageUrl\n    }\n  }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\nquery verifyUserWithGoogleToken($token: String!){\n    verifyGoogleToken(token: $token)\n}\n"): (typeof documents)["#graphql\nquery verifyUserWithGoogleToken($token: String!){\n    verifyGoogleToken(token: $token)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\nquery GetUser {\n  getCurrentUser {\n    id,\n    firstName,\n    lastName,\n    profileImageUrl,\n    email\n  }\n}\n"): (typeof documents)["#graphql\nquery GetUser {\n  getCurrentUser {\n    id,\n    firstName,\n    lastName,\n    profileImageUrl,\n    email\n  }\n}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
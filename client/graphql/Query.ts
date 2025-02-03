import { graphql } from "@/gql";

export const USER_FRAGMENT = graphql(`
  fragment TUser on User {
    id
    firstName
    lastName
    level
    managerId
    path
  }
`);

export const GET_USER_TREE = graphql(`
  query GetUserTree {
    getUserTree {
      ...TUser
      #      x @client
      #      y @client
    }
  }
`);

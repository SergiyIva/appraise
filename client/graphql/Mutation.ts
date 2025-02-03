import { graphql } from "@/gql";

export const CREATE_USER = graphql(`
  mutation CreateUser(
    $firstName: String!
    $lastName: String!
    $managerId: Int!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      managerId: $managerId
    ) {
      id
      firstName
      lastName
      managerId
    }
  }
`);

export const CHANGE_MANAGER = graphql(`
  mutation ChangeManager($managerId: Int!, $userId: Int!) {
    changeManager(managerId: $managerId, userId: $userId) {
      ...TUser
    }
  }
`);

export const REMOVE_USER = graphql(`
  mutation RemoveUser($id: Int!) {
    removeUser(id: $id) {
      ...TUser
    }
  }
`);

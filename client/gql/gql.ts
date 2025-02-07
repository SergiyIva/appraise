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
    "\n  mutation CreateUser(\n    $firstName: String!\n    $lastName: String!\n    $managerId: Int!\n  ) {\n    createUser(\n      firstName: $firstName\n      lastName: $lastName\n      managerId: $managerId\n    ) {\n      id\n      firstName\n      lastName\n      managerId\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation ChangeManager($managerId: Int!, $userId: Int!) {\n    changeManager(managerId: $managerId, userId: $userId) {\n      ...TUser\n    }\n  }\n": types.ChangeManagerDocument,
    "\n  mutation RemoveUser($id: Int!) {\n    removeUser(id: $id) {\n      ...TUser\n    }\n  }\n": types.RemoveUserDocument,
    "\n  fragment TUser on User {\n    id\n    firstName\n    lastName\n    level\n    managerId\n    path\n  }\n": types.TUserFragmentDoc,
    "\n  query GetUserTree {\n    getUserTree {\n      ...TUser\n    }\n  }\n": types.GetUserTreeDocument,
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
export function graphql(source: "\n  mutation CreateUser(\n    $firstName: String!\n    $lastName: String!\n    $managerId: Int!\n  ) {\n    createUser(\n      firstName: $firstName\n      lastName: $lastName\n      managerId: $managerId\n    ) {\n      id\n      firstName\n      lastName\n      managerId\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser(\n    $firstName: String!\n    $lastName: String!\n    $managerId: Int!\n  ) {\n    createUser(\n      firstName: $firstName\n      lastName: $lastName\n      managerId: $managerId\n    ) {\n      id\n      firstName\n      lastName\n      managerId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ChangeManager($managerId: Int!, $userId: Int!) {\n    changeManager(managerId: $managerId, userId: $userId) {\n      ...TUser\n    }\n  }\n"): (typeof documents)["\n  mutation ChangeManager($managerId: Int!, $userId: Int!) {\n    changeManager(managerId: $managerId, userId: $userId) {\n      ...TUser\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveUser($id: Int!) {\n    removeUser(id: $id) {\n      ...TUser\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveUser($id: Int!) {\n    removeUser(id: $id) {\n      ...TUser\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TUser on User {\n    id\n    firstName\n    lastName\n    level\n    managerId\n    path\n  }\n"): (typeof documents)["\n  fragment TUser on User {\n    id\n    firstName\n    lastName\n    level\n    managerId\n    path\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserTree {\n    getUserTree {\n      ...TUser\n    }\n  }\n"): (typeof documents)["\n  query GetUserTree {\n    getUserTree {\n      ...TUser\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
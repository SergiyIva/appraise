
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface IMutation {
    __typename?: 'IMutation';
    changeManager(managerId: number, userId: number): User[] | Promise<User[]>;
    createUser(firstName: string, lastName: string, managerId: number): User | Promise<User>;
    removeUser(id: number): User[] | Promise<User[]>;
}

export interface IQuery {
    __typename?: 'IQuery';
    getUserTree(): Nullable<User[]> | Promise<Nullable<User[]>>;
}

export interface User {
    __typename?: 'User';
    firstName: string;
    id: number;
    lastName: string;
    level: number;
    managerId?: Nullable<number>;
    path: number[];
}

type Nullable<T> = T | null;

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type AuthResponse = {
  __typename?: "AuthResponse";
  login: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  role: Scalars["String"]["output"];
  token: Scalars["String"]["output"];
};

export type Credentials = {
  login: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type Query = {
  __typename?: "Query";
  authenticate: AuthResponse;
};

export type QueryAuthenticateArgs = {
  credentials: Credentials;
};

export type AuthenticateQueryVariables = Exact<{
  credentials: Credentials;
}>;

export type AuthenticateQuery = {
  __typename?: "Query";
  authenticate: {
    __typename?: "AuthResponse";
    token: string;
    name: string;
    login: string;
    role: string;
  };
};

export const AuthenticateDocument = gql`
  query Authenticate($credentials: Credentials!) {
    authenticate(credentials: $credentials) {
      token
      name
      login
      role
    }
  }
`;

/**
 * __useAuthenticateQuery__
 *
 * To run a query within a React component, call `useAuthenticateQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthenticateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthenticateQuery({
 *   variables: {
 *      credentials: // value for 'credentials'
 *   },
 * });
 */
export function useAuthenticateQuery(
  baseOptions: Apollo.QueryHookOptions<
    AuthenticateQuery,
    AuthenticateQueryVariables
  > &
    (
      | { variables: AuthenticateQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AuthenticateQuery, AuthenticateQueryVariables>(
    AuthenticateDocument,
    options,
  );
}
export function useAuthenticateLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AuthenticateQuery,
    AuthenticateQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AuthenticateQuery, AuthenticateQueryVariables>(
    AuthenticateDocument,
    options,
  );
}
export function useAuthenticateSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        AuthenticateQuery,
        AuthenticateQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<AuthenticateQuery, AuthenticateQueryVariables>(
    AuthenticateDocument,
    options,
  );
}
export type AuthenticateQueryHookResult = ReturnType<
  typeof useAuthenticateQuery
>;
export type AuthenticateLazyQueryHookResult = ReturnType<
  typeof useAuthenticateLazyQuery
>;
export type AuthenticateSuspenseQueryHookResult = ReturnType<
  typeof useAuthenticateSuspenseQuery
>;
export type AuthenticateQueryResult = Apollo.QueryResult<
  AuthenticateQuery,
  AuthenticateQueryVariables
>;

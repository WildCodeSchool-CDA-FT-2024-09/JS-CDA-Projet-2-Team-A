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
  DateTimeISO: { input: Date; output: Date };
};

export type CreateUserInput = {
  email: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  roleName: Scalars["String"]["input"];
};

export type Employee = {
  __typename?: "Employee";
  email: Scalars["String"]["output"];
  id: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
  phone_number: Scalars["String"]["output"];
  products: Product;
  supplier: Supplier;
};

export type Message = {
  __typename?: "Message";
  created_at: Scalars["DateTimeISO"]["output"];
  id: Scalars["Int"]["output"];
  message: Scalars["String"]["output"];
  message_status: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
  user: User;
};

export type Mutation = {
  __typename?: "Mutation";
  createUser: Scalars["String"]["output"];
};

export type MutationCreateUserArgs = {
  body: CreateUserInput;
};

export type Order = {
  __typename?: "Order";
  created_at: Scalars["DateTimeISO"]["output"];
  id: Scalars["Int"]["output"];
  products: Product;
  status: Scalars["String"]["output"];
};

export type Product = {
  __typename?: "Product";
  active: Scalars["Boolean"]["output"];
  category: Scalars["String"]["output"];
  color: Scalars["String"]["output"];
  commentary: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
  employee: Employee;
  id: Scalars["Int"]["output"];
  image: Scalars["String"]["output"];
  material: Scalars["String"]["output"];
  min_quantity: Scalars["Float"]["output"];
  orders: Order;
  product: Scalars["String"]["output"];
  stock: Scalars["Float"]["output"];
  supplier: Supplier;
};

export type Query = {
  __typename?: "Query";
  allProducts: Array<Product>;
  allUsers: Array<User>;
  countDistinctCategories: Scalars["Float"]["output"];
  getAllRoles: Array<Role>;
};

export type Role = {
  __typename?: "Role";
  id: Scalars["Int"]["output"];
  role: Scalars["String"]["output"];
};

export type Supplier = {
  __typename?: "Supplier";
  active: Scalars["Boolean"]["output"];
  address: Scalars["String"]["output"];
  city: Scalars["String"]["output"];
  commentary: Scalars["String"]["output"];
  country: Scalars["String"]["output"];
  delay: Scalars["Float"]["output"];
  description: Scalars["String"]["output"];
  employees: Employee;
  id: Scalars["Int"]["output"];
  logo: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  postcode: Scalars["String"]["output"];
  products: Product;
};

export type User = {
  __typename?: "User";
  activationDate: Scalars["DateTimeISO"]["output"];
  email: Scalars["String"]["output"];
  id: Scalars["Int"]["output"];
  isActive: Scalars["Boolean"]["output"];
  messages?: Maybe<Array<Message>>;
  name: Scalars["String"]["output"];
  password: Scalars["String"]["output"];
  role: Role;
};

export type CreateUserMutationVariables = Exact<{
  body: CreateUserInput;
}>;

export type CreateUserMutation = {
  __typename?: "Mutation";
  createUser: string;
};

export type GetAllRolesQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllRolesQuery = {
  __typename?: "Query";
  getAllRoles: Array<{ __typename?: "Role"; id: number; role: string }>;
};

export type AllProductsQueryVariables = Exact<{ [key: string]: never }>;

export type AllProductsQuery = {
  __typename?: "Query";
  allProducts: Array<{
    __typename?: "Product";
    category: string;
    product: string;
    material: string;
    color: string;
    description: string;
    min_quantity: number;
    stock: number;
    supplier: { __typename?: "Supplier"; name: string };
  }>;
};

export type CountDistinctCategoriesQueryVariables = Exact<{
  [key: string]: never;
}>;

export type CountDistinctCategoriesQuery = {
  __typename?: "Query";
  countDistinctCategories: number;
};

export type AllUsersQueryVariables = Exact<{ [key: string]: never }>;

export type AllUsersQuery = {
  __typename?: "Query";
  allUsers: Array<{
    __typename?: "User";
    name: string;
    email: string;
    activationDate: Date;
    isActive: boolean;
    role: { __typename?: "Role"; role: string };
  }>;
};

export const CreateUserDocument = gql`
  mutation CreateUser($body: CreateUserInput!) {
    createUser(body: $body)
  }
`;
export type CreateUserMutationFn = Apollo.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      body: // value for 'body'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUserMutation,
    CreateUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
    options,
  );
}
export type CreateUserMutationHookResult = ReturnType<
  typeof useCreateUserMutation
>;
export type CreateUserMutationResult =
  Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>;
export const GetAllRolesDocument = gql`
  query GetAllRoles {
    getAllRoles {
      id
      role
    }
  }
`;

/**
 * __useGetAllRolesQuery__
 *
 * To run a query within a React component, call `useGetAllRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllRolesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllRolesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAllRolesQuery,
    GetAllRolesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllRolesQuery, GetAllRolesQueryVariables>(
    GetAllRolesDocument,
    options,
  );
}
export function useGetAllRolesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllRolesQuery,
    GetAllRolesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAllRolesQuery, GetAllRolesQueryVariables>(
    GetAllRolesDocument,
    options,
  );
}
export function useGetAllRolesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetAllRolesQuery,
        GetAllRolesQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetAllRolesQuery, GetAllRolesQueryVariables>(
    GetAllRolesDocument,
    options,
  );
}
export type GetAllRolesQueryHookResult = ReturnType<typeof useGetAllRolesQuery>;
export type GetAllRolesLazyQueryHookResult = ReturnType<
  typeof useGetAllRolesLazyQuery
>;
export type GetAllRolesSuspenseQueryHookResult = ReturnType<
  typeof useGetAllRolesSuspenseQuery
>;
export type GetAllRolesQueryResult = Apollo.QueryResult<
  GetAllRolesQuery,
  GetAllRolesQueryVariables
>;
export const AllProductsDocument = gql`
  query AllProducts {
    allProducts {
      category
      product
      material
      color
      description
      min_quantity
      stock
      supplier {
        name
      }
    }
  }
`;

/**
 * __useAllProductsQuery__
 *
 * To run a query within a React component, call `useAllProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllProductsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    AllProductsQuery,
    AllProductsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AllProductsQuery, AllProductsQueryVariables>(
    AllProductsDocument,
    options,
  );
}
export function useAllProductsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AllProductsQuery,
    AllProductsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AllProductsQuery, AllProductsQueryVariables>(
    AllProductsDocument,
    options,
  );
}
export function useAllProductsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        AllProductsQuery,
        AllProductsQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<AllProductsQuery, AllProductsQueryVariables>(
    AllProductsDocument,
    options,
  );
}
export type AllProductsQueryHookResult = ReturnType<typeof useAllProductsQuery>;
export type AllProductsLazyQueryHookResult = ReturnType<
  typeof useAllProductsLazyQuery
>;
export type AllProductsSuspenseQueryHookResult = ReturnType<
  typeof useAllProductsSuspenseQuery
>;
export type AllProductsQueryResult = Apollo.QueryResult<
  AllProductsQuery,
  AllProductsQueryVariables
>;
export const CountDistinctCategoriesDocument = gql`
  query CountDistinctCategories {
    countDistinctCategories
  }
`;

/**
 * __useCountDistinctCategoriesQuery__
 *
 * To run a query within a React component, call `useCountDistinctCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountDistinctCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountDistinctCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCountDistinctCategoriesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    CountDistinctCategoriesQuery,
    CountDistinctCategoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    CountDistinctCategoriesQuery,
    CountDistinctCategoriesQueryVariables
  >(CountDistinctCategoriesDocument, options);
}
export function useCountDistinctCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CountDistinctCategoriesQuery,
    CountDistinctCategoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    CountDistinctCategoriesQuery,
    CountDistinctCategoriesQueryVariables
  >(CountDistinctCategoriesDocument, options);
}
export function useCountDistinctCategoriesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        CountDistinctCategoriesQuery,
        CountDistinctCategoriesQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    CountDistinctCategoriesQuery,
    CountDistinctCategoriesQueryVariables
  >(CountDistinctCategoriesDocument, options);
}
export type CountDistinctCategoriesQueryHookResult = ReturnType<
  typeof useCountDistinctCategoriesQuery
>;
export type CountDistinctCategoriesLazyQueryHookResult = ReturnType<
  typeof useCountDistinctCategoriesLazyQuery
>;
export type CountDistinctCategoriesSuspenseQueryHookResult = ReturnType<
  typeof useCountDistinctCategoriesSuspenseQuery
>;
export type CountDistinctCategoriesQueryResult = Apollo.QueryResult<
  CountDistinctCategoriesQuery,
  CountDistinctCategoriesQueryVariables
>;
export const AllUsersDocument = gql`
  query AllUsers {
    allUsers {
      name
      email
      activationDate
      isActive
      role {
        role
      }
    }
  }
`;

/**
 * __useAllUsersQuery__
 *
 * To run a query within a React component, call `useAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<AllUsersQuery, AllUsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AllUsersQuery, AllUsersQueryVariables>(
    AllUsersDocument,
    options,
  );
}
export function useAllUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AllUsersQuery,
    AllUsersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AllUsersQuery, AllUsersQueryVariables>(
    AllUsersDocument,
    options,
  );
}
export function useAllUsersSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<AllUsersQuery, AllUsersQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<AllUsersQuery, AllUsersQueryVariables>(
    AllUsersDocument,
    options,
  );
}
export type AllUsersQueryHookResult = ReturnType<typeof useAllUsersQuery>;
export type AllUsersLazyQueryHookResult = ReturnType<
  typeof useAllUsersLazyQuery
>;
export type AllUsersSuspenseQueryHookResult = ReturnType<
  typeof useAllUsersSuspenseQuery
>;
export type AllUsersQueryResult = Apollo.QueryResult<
  AllUsersQuery,
  AllUsersQueryVariables
>;

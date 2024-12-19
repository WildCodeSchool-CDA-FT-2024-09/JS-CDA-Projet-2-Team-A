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

export type AuthResponse = {
  __typename?: "AuthResponse";
  email: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  role: Scalars["String"]["output"];
  token: Scalars["String"]["output"];
};

export type CreateUserInput = {
  email: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  roleName: Scalars["String"]["input"];
};

export type Credentials = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type Employee = {
  __typename?: "Employee";
  email: Scalars["String"]["output"];
  id: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
  phone_number: Scalars["String"]["output"];
  products?: Maybe<Array<Product>>;
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
  orderProduct: Array<OrderProduct>;
  status: Scalars["String"]["output"];
  supplier: Supplier;
};

export type OrderProduct = {
  __typename?: "OrderProduct";
  id: Scalars["Int"]["output"];
  order: Order;
  product: Product;
  quantity: Scalars["Float"]["output"];
};

export type Product = {
  __typename?: "Product";
  active: Scalars["Boolean"]["output"];
  category: Scalars["String"]["output"];
  color?: Maybe<Scalars["String"]["output"]>;
  commentary?: Maybe<Scalars["String"]["output"]>;
  description: Scalars["String"]["output"];
  employee: Employee;
  id: Scalars["Int"]["output"];
  image: Scalars["String"]["output"];
  material?: Maybe<Scalars["String"]["output"]>;
  min_quantity: Scalars["Float"]["output"];
  orderProduct?: Maybe<Array<OrderProduct>>;
  product: Scalars["String"]["output"];
  stock: Scalars["Float"]["output"];
  supplier: Supplier;
};

export type Query = {
  __typename?: "Query";
  allProducts: Array<Product>;
  allUsers: Array<User>;
  authenticate: AuthResponse;
  countDistinctCategories: Scalars["Float"]["output"];
  getAllMessages: Array<Message>;
  getAllRoles: Array<Role>;
  getAllSuppliersWithEmployees: Array<Supplier>;
  productById?: Maybe<Product>;
  totalStockProduct: Scalars["Float"]["output"];
  whoAmI: WhoAmIResponse;
};

export type QueryAuthenticateArgs = {
  credentials: Credentials;
};

export type QueryProductByIdArgs = {
  id: Scalars["Float"]["input"];
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
  commentary?: Maybe<Scalars["String"]["output"]>;
  country: Scalars["String"]["output"];
  delay: Scalars["Float"]["output"];
  description: Scalars["String"]["output"];
  employees: Array<Employee>;
  id: Scalars["Int"]["output"];
  logo: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  order?: Maybe<Array<Order>>;
  postcode: Scalars["String"]["output"];
  products?: Maybe<Array<Product>>;
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

export type WhoAmIResponse = {
  __typename?: "WhoAmIResponse";
  login: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  role: Scalars["String"]["output"];
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

export type GetAllMessagesQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllMessagesQuery = {
  __typename?: "Query";
  getAllMessages: Array<{
    __typename?: "Message";
    id: number;
    title: string;
    message: string;
    message_status: string;
  }>;
};

export type AllProductsQueryVariables = Exact<{ [key: string]: never }>;

export type AllProductsQuery = {
  __typename?: "Query";
  allProducts: Array<{
    __typename?: "Product";
    category: string;
    product: string;
    material?: string | null;
    color?: string | null;
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

export type TotalStockProductQueryVariables = Exact<{ [key: string]: never }>;

export type TotalStockProductQuery = {
  __typename?: "Query";
  totalStockProduct: number;
};

export type ProductByIdQueryVariables = Exact<{
  productByIdId: Scalars["Float"]["input"];
}>;

export type ProductByIdQuery = {
  __typename?: "Query";
  productById?: {
    __typename?: "Product";
    id: number;
    product: string;
    image: string;
    material?: string | null;
    min_quantity: number;
    category: string;
    color?: string | null;
    description: string;
    employee: {
      __typename?: "Employee";
      id: number;
      name: string;
      email: string;
      phone_number: string;
    };
    supplier: { __typename?: "Supplier"; id: number; name: string };
  } | null;
};

export type SuppliersWithEmployeesQueryVariables = Exact<{
  [key: string]: never;
}>;

export type SuppliersWithEmployeesQuery = {
  __typename?: "Query";
  getAllSuppliersWithEmployees: Array<{
    __typename?: "Supplier";
    id: number;
    name: string;
    address: string;
    city: string;
    country: string;
    employees: Array<{
      __typename?: "Employee";
      id: number;
      name: string;
      phone_number: string;
      email: string;
    }>;
  }>;
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
    email: string;
    role: string;
  };
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

export type WhoAmIQueryVariables = Exact<{ [key: string]: never }>;

export type WhoAmIQuery = {
  __typename?: "Query";
  whoAmI: {
    __typename?: "WhoAmIResponse";
    name: string;
    login: string;
    role: string;
  };
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
export const GetAllMessagesDocument = gql`
  query GetAllMessages {
    getAllMessages {
      id
      title
      message
      message_status
    }
  }
`;

/**
 * __useGetAllMessagesQuery__
 *
 * To run a query within a React component, call `useGetAllMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllMessagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllMessagesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAllMessagesQuery,
    GetAllMessagesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllMessagesQuery, GetAllMessagesQueryVariables>(
    GetAllMessagesDocument,
    options,
  );
}
export function useGetAllMessagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllMessagesQuery,
    GetAllMessagesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAllMessagesQuery, GetAllMessagesQueryVariables>(
    GetAllMessagesDocument,
    options,
  );
}
export function useGetAllMessagesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetAllMessagesQuery,
        GetAllMessagesQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetAllMessagesQuery,
    GetAllMessagesQueryVariables
  >(GetAllMessagesDocument, options);
}
export type GetAllMessagesQueryHookResult = ReturnType<
  typeof useGetAllMessagesQuery
>;
export type GetAllMessagesLazyQueryHookResult = ReturnType<
  typeof useGetAllMessagesLazyQuery
>;
export type GetAllMessagesSuspenseQueryHookResult = ReturnType<
  typeof useGetAllMessagesSuspenseQuery
>;
export type GetAllMessagesQueryResult = Apollo.QueryResult<
  GetAllMessagesQuery,
  GetAllMessagesQueryVariables
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
export const TotalStockProductDocument = gql`
  query totalStockProduct {
    totalStockProduct
  }
`;

/**
 * __useTotalStockProductQuery__
 *
 * To run a query within a React component, call `useTotalStockProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useTotalStockProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTotalStockProductQuery({
 *   variables: {
 *   },
 * });
 */
export function useTotalStockProductQuery(
  baseOptions?: Apollo.QueryHookOptions<
    TotalStockProductQuery,
    TotalStockProductQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    TotalStockProductQuery,
    TotalStockProductQueryVariables
  >(TotalStockProductDocument, options);
}
export function useTotalStockProductLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TotalStockProductQuery,
    TotalStockProductQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    TotalStockProductQuery,
    TotalStockProductQueryVariables
  >(TotalStockProductDocument, options);
}
export function useTotalStockProductSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        TotalStockProductQuery,
        TotalStockProductQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    TotalStockProductQuery,
    TotalStockProductQueryVariables
  >(TotalStockProductDocument, options);
}
export type TotalStockProductQueryHookResult = ReturnType<
  typeof useTotalStockProductQuery
>;
export type TotalStockProductLazyQueryHookResult = ReturnType<
  typeof useTotalStockProductLazyQuery
>;
export type TotalStockProductSuspenseQueryHookResult = ReturnType<
  typeof useTotalStockProductSuspenseQuery
>;
export type TotalStockProductQueryResult = Apollo.QueryResult<
  TotalStockProductQuery,
  TotalStockProductQueryVariables
>;
export const ProductByIdDocument = gql`
  query ProductById($productByIdId: Float!) {
    productById(id: $productByIdId) {
      id
      product
      image
      material
      min_quantity
      category
      color
      employee {
        id
        name
        email
        phone_number
      }
      supplier {
        id
        name
      }
      description
    }
  }
`;

/**
 * __useProductByIdQuery__
 *
 * To run a query within a React component, call `useProductByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductByIdQuery({
 *   variables: {
 *      productByIdId: // value for 'productByIdId'
 *   },
 * });
 */
export function useProductByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    ProductByIdQuery,
    ProductByIdQueryVariables
  > &
    (
      | { variables: ProductByIdQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProductByIdQuery, ProductByIdQueryVariables>(
    ProductByIdDocument,
    options,
  );
}
export function useProductByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProductByIdQuery,
    ProductByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProductByIdQuery, ProductByIdQueryVariables>(
    ProductByIdDocument,
    options,
  );
}
export function useProductByIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        ProductByIdQuery,
        ProductByIdQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<ProductByIdQuery, ProductByIdQueryVariables>(
    ProductByIdDocument,
    options,
  );
}
export type ProductByIdQueryHookResult = ReturnType<typeof useProductByIdQuery>;
export type ProductByIdLazyQueryHookResult = ReturnType<
  typeof useProductByIdLazyQuery
>;
export type ProductByIdSuspenseQueryHookResult = ReturnType<
  typeof useProductByIdSuspenseQuery
>;
export type ProductByIdQueryResult = Apollo.QueryResult<
  ProductByIdQuery,
  ProductByIdQueryVariables
>;
export const SuppliersWithEmployeesDocument = gql`
  query SuppliersWithEmployees {
    getAllSuppliersWithEmployees {
      id
      name
      address
      city
      country
      employees {
        id
        name
        phone_number
        email
      }
    }
  }
`;

/**
 * __useSuppliersWithEmployeesQuery__
 *
 * To run a query within a React component, call `useSuppliersWithEmployeesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSuppliersWithEmployeesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSuppliersWithEmployeesQuery({
 *   variables: {
 *   },
 * });
 */
export function useSuppliersWithEmployeesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    SuppliersWithEmployeesQuery,
    SuppliersWithEmployeesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SuppliersWithEmployeesQuery,
    SuppliersWithEmployeesQueryVariables
  >(SuppliersWithEmployeesDocument, options);
}
export function useSuppliersWithEmployeesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SuppliersWithEmployeesQuery,
    SuppliersWithEmployeesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SuppliersWithEmployeesQuery,
    SuppliersWithEmployeesQueryVariables
  >(SuppliersWithEmployeesDocument, options);
}
export function useSuppliersWithEmployeesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        SuppliersWithEmployeesQuery,
        SuppliersWithEmployeesQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    SuppliersWithEmployeesQuery,
    SuppliersWithEmployeesQueryVariables
  >(SuppliersWithEmployeesDocument, options);
}
export type SuppliersWithEmployeesQueryHookResult = ReturnType<
  typeof useSuppliersWithEmployeesQuery
>;
export type SuppliersWithEmployeesLazyQueryHookResult = ReturnType<
  typeof useSuppliersWithEmployeesLazyQuery
>;
export type SuppliersWithEmployeesSuspenseQueryHookResult = ReturnType<
  typeof useSuppliersWithEmployeesSuspenseQuery
>;
export type SuppliersWithEmployeesQueryResult = Apollo.QueryResult<
  SuppliersWithEmployeesQuery,
  SuppliersWithEmployeesQueryVariables
>;
export const AuthenticateDocument = gql`
  query Authenticate($credentials: Credentials!) {
    authenticate(credentials: $credentials) {
      token
      name
      email
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
export const WhoAmIDocument = gql`
  query WhoAmI {
    whoAmI {
      name
      login
      role
    }
  }
`;

/**
 * __useWhoAmIQuery__
 *
 * To run a query within a React component, call `useWhoAmIQuery` and pass it any options that fit your needs.
 * When your component renders, `useWhoAmIQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWhoAmIQuery({
 *   variables: {
 *   },
 * });
 */
export function useWhoAmIQuery(
  baseOptions?: Apollo.QueryHookOptions<WhoAmIQuery, WhoAmIQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<WhoAmIQuery, WhoAmIQueryVariables>(
    WhoAmIDocument,
    options,
  );
}
export function useWhoAmILazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<WhoAmIQuery, WhoAmIQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<WhoAmIQuery, WhoAmIQueryVariables>(
    WhoAmIDocument,
    options,
  );
}
export function useWhoAmISuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<WhoAmIQuery, WhoAmIQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<WhoAmIQuery, WhoAmIQueryVariables>(
    WhoAmIDocument,
    options,
  );
}
export type WhoAmIQueryHookResult = ReturnType<typeof useWhoAmIQuery>;
export type WhoAmILazyQueryHookResult = ReturnType<typeof useWhoAmILazyQuery>;
export type WhoAmISuspenseQueryHookResult = ReturnType<
  typeof useWhoAmISuspenseQuery
>;
export type WhoAmIQueryResult = Apollo.QueryResult<
  WhoAmIQuery,
  WhoAmIQueryVariables
>;

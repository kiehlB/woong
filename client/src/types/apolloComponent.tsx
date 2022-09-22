import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Comments = {
  __typename?: 'Comments';
  created_at: Scalars['DateTime'];
  deleted?: Maybe<Scalars['Boolean']>;
  has_replies?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  post_id?: Maybe<Scalars['Int']>;
  reply?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
  user?: Maybe<User>;
  user_id?: Maybe<Scalars['Int']>;
};

export type GetUserInfoResponse = {
  __typename?: 'GetUserInfoResponse';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  user?: Maybe<UserInfo>;
};

export type GetUsersInfoResponse = {
  __typename?: 'GetUsersInfoResponse';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  users?: Maybe<Array<UserInfo>>;
};

export type InputSignin = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  PostLike: PostLike;
  createAndUpdateProfile: ProfileResponse;
  createComment: Comments;
  createPost: Post;
  editComment: Comments;
  editPost: Post;
  register: RegisterResponse;
  removeComment: Scalars['Boolean'];
  removePost: Scalars['Boolean'];
  signin: SigninResponse;
};

export type MutationPostLikeArgs = {
  input: CreatePostLike;
};

export type MutationCreateAndUpdateProfileArgs = {
  input: CreateProfile;
};

export type MutationCreateCommentArgs = {
  input: CreateComment;
};

export type MutationCreatePostArgs = {
  input: CreatePost;
};

export type MutationEditCommentArgs = {
  input: EditComment;
};

export type MutationEditPostArgs = {
  input: EditPost;
};

export type MutationRegisterArgs = {
  input: RegisterInput;
};

export type MutationRemoveCommentArgs = {
  input: DeleteComment;
};

export type MutationRemovePostArgs = {
  input: RemovePost;
};

export type MutationSigninArgs = {
  input: InputSignin;
};

export type Post = {
  __typename?: 'Post';
  body?: Maybe<Scalars['String']>;
  comments?: Maybe<Array<Comments>>;
  created_at: Scalars['DateTime'];
  difficulty?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  likes?: Maybe<Scalars['Int']>;
  post_likes?: Maybe<Array<PostLike>>;
  posts_tags?: Maybe<Array<PostsTags>>;
  tags?: Maybe<Array<Tag>>;
  thumbnail?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
  user?: Maybe<User>;
  user_id?: Maybe<Scalars['Int']>;
};

export type PostLike = {
  __typename?: 'PostLike';
  created_at?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  post_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['DateTime']>;
  user_id?: Maybe<Scalars['Int']>;
};

export type PostsTags = {
  __typename?: 'PostsTags';
  created_at?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  post?: Maybe<Array<Post>>;
  post_id?: Maybe<Scalars['Int']>;
  tag?: Maybe<Tag>;
  tag_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['String']>;
};

export type ProfileResponse = {
  __typename?: 'ProfileResponse';
  bio: Scalars['String'];
  id: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  findAllComments: Array<Comments>;
  findAllPost: Array<Post>;
  findByIdTag: Array<Tag>;
  findSinglePost?: Maybe<Post>;
  getAllPostTags: Array<PostsTags>;
  getAllTags: Array<Tag>;
  getAllTagsCount: Array<Tag>;
  getAllUser?: Maybe<GetUsersInfoResponse>;
  getTrendingPosts: Array<Post>;
  getUser: GetUserInfoResponse;
  whoAmI: GetUserInfoResponse;
};

export type QueryFindByIdTagArgs = {
  id: Scalars['Int'];
};

export type QueryFindSinglePostArgs = {
  input: GetPost;
};

export type QueryGetUserArgs = {
  input: GetUserInfo;
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  email: Scalars['String'];
  email_verified: Scalars['Boolean'];
  id: Scalars['Int'];
};

export type SigninResponse = {
  __typename?: 'SigninResponse';
  token: Scalars['String'];
};

export type Tag = {
  __typename?: 'Tag';
  created_at: Scalars['DateTime'];
  id: Scalars['Int'];
  name: Scalars['String'];
  name_filtered: Scalars['String'];
  updated_at: Scalars['DateTime'];
};

export type User = {
  __typename?: 'User';
  created_at?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  email_verified?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  password?: Maybe<Scalars['String']>;
  profile?: Maybe<UserProfile>;
  updated_at?: Maybe<Scalars['DateTime']>;
  username?: Maybe<Scalars['String']>;
};

export type UserInfo = {
  __typename?: 'UserInfo';
  id: Scalars['Int'];
};

export type UserProfile = {
  __typename?: 'UserProfile';
  bio?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  id?: Maybe<Scalars['Int']>;
  updated_at: Scalars['DateTime'];
  user?: Maybe<User>;
  user_id?: Maybe<Scalars['String']>;
};

export type CreateComment = {
  comment_id?: Maybe<Scalars['Int']>;
  post_id: Scalars['Float'];
  text: Scalars['String'];
};

export type CreatePost = {
  body?: Maybe<Scalars['String']>;
  difficulty?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  thumbnail?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type CreatePostLike = {
  id?: Maybe<Scalars['Int']>;
};

export type CreateProfile = {
  bio: Scalars['String'];
};

export type DeleteComment = {
  comment_id?: Maybe<Scalars['Int']>;
};

export type EditComment = {
  comment_id?: Maybe<Scalars['Int']>;
  text: Scalars['String'];
};

export type EditPost = {
  body?: Maybe<Scalars['String']>;
  difficulty?: Maybe<Scalars['String']>;
  post_id?: Maybe<Scalars['Int']>;
  tags?: Maybe<Array<Scalars['String']>>;
  thumbnail?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['Int']>;
};

export type GetPost = {
  id?: Maybe<Scalars['Int']>;
};

export type GetUserInfo = {
  id: Scalars['Int'];
};

export type RegisterInput = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type RemovePost = {
  post_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

export type FindAllCommentsQueryVariables = Exact<{ [key: string]: never }>;

export type FindAllCommentsQuery = { __typename?: 'Query' } & {
  findAllComments: Array<
    { __typename?: 'Comments' } & Pick<
      Comments,
      'created_at' | 'id' | 'post_id' | 'reply' | 'deleted' | 'text' | 'user_id'
    >
  >;
};

export type CreateCommentMutationVariables = Exact<{
  input: CreateComment;
}>;

export type CreateCommentMutation = { __typename?: 'Mutation' } & {
  createComment: { __typename?: 'Comments' } & Pick<Comments, 'id' | 'text'>;
};

export type CreatePostMutationVariables = Exact<{
  input: CreatePost;
}>;

export type CreatePostMutation = { __typename?: 'Mutation' } & {
  createPost: { __typename?: 'Post' } & Pick<Post, 'id' | 'body'>;
};

export type FindAllPostQueryVariables = Exact<{ [key: string]: never }>;

export type FindAllPostQuery = { __typename?: 'Query' } & {
  findAllPost: Array<
    { __typename?: 'Post' } & Pick<
      Post,
      'id' | 'body' | 'title' | 'created_at' | 'difficulty'
    > & {
        post_likes?: Maybe<
          Array<
            { __typename?: 'PostLike' } & Pick<PostLike, 'id' | 'post_id' | 'user_id'>
          >
        >;
        posts_tags?: Maybe<
          Array<
            { __typename?: 'PostsTags' } & {
              tag?: Maybe<
                { __typename?: 'Tag' } & Pick<Tag, 'id' | 'name' | 'name_filtered'>
              >;
            }
          >
        >;
      }
  >;
};

export type FindSinglePostQueryVariables = Exact<{
  input: GetPost;
}>;

export type FindSinglePostQuery = { __typename?: 'Query' } & {
  findSinglePost?: Maybe<
    { __typename?: 'Post' } & Pick<Post, 'id' | 'body' | 'title' | 'difficulty'> & {
        post_likes?: Maybe<
          Array<
            { __typename?: 'PostLike' } & Pick<PostLike, 'id' | 'post_id' | 'user_id'>
          >
        >;
        posts_tags?: Maybe<
          Array<
            { __typename?: 'PostsTags' } & {
              tag?: Maybe<
                { __typename?: 'Tag' } & Pick<Tag, 'id' | 'name' | 'name_filtered'>
              >;
            }
          >
        >;
      }
  >;
};

export type GetAllTagsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllTagsQuery = { __typename?: 'Query' } & {
  getAllTags: Array<
    { __typename?: 'Tag' } & Pick<Tag, 'id' | 'name' | 'name_filtered' | 'updated_at'>
  >;
};

export type SigninMutationVariables = Exact<{
  input: InputSignin;
}>;

export type SigninMutation = { __typename?: 'Mutation' } & {
  signin: { __typename?: 'SigninResponse' } & Pick<SigninResponse, 'token'>;
};

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;

export type RegisterMutation = { __typename?: 'Mutation' } & {
  register: { __typename?: 'RegisterResponse' } & Pick<RegisterResponse, 'id'>;
};

export type WhoAmIQueryVariables = Exact<{ [key: string]: never }>;

export type WhoAmIQuery = { __typename?: 'Query' } & {
  whoAmI: { __typename?: 'GetUserInfoResponse' } & Pick<
    GetUserInfoResponse,
    'error' | 'ok'
  > & { user?: Maybe<{ __typename?: 'UserInfo' } & Pick<UserInfo, 'id'>> };
};

export const FindAllCommentsDocument = gql`
  query FindAllComments {
    findAllComments {
      created_at
      id
      post_id
      reply
      deleted
      text
      user_id
    }
  }
`;

/**
 * __useFindAllCommentsQuery__
 *
 * To run a query within a React component, call `useFindAllCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllCommentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAllCommentsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FindAllCommentsQuery,
    FindAllCommentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindAllCommentsQuery, FindAllCommentsQueryVariables>(
    FindAllCommentsDocument,
    options,
  );
}
export function useFindAllCommentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindAllCommentsQuery,
    FindAllCommentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindAllCommentsQuery, FindAllCommentsQueryVariables>(
    FindAllCommentsDocument,
    options,
  );
}
export type FindAllCommentsQueryHookResult = ReturnType<typeof useFindAllCommentsQuery>;
export type FindAllCommentsLazyQueryHookResult = ReturnType<
  typeof useFindAllCommentsLazyQuery
>;
export type FindAllCommentsQueryResult = Apollo.QueryResult<
  FindAllCommentsQuery,
  FindAllCommentsQueryVariables
>;
export const CreateCommentDocument = gql`
  mutation CreateComment($input: createComment!) {
    createComment(input: $input) {
      id
      text
    }
  }
`;
export type CreateCommentMutationFn = Apollo.MutationFunction<
  CreateCommentMutation,
  CreateCommentMutationVariables
>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(
    CreateCommentDocument,
    options,
  );
}
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<
  CreateCommentMutation,
  CreateCommentMutationVariables
>;
export const CreatePostDocument = gql`
  mutation CreatePost($input: createPost!) {
    createPost(input: $input) {
      id
      body
    }
  }
`;
export type CreatePostMutationFn = Apollo.MutationFunction<
  CreatePostMutation,
  CreatePostMutationVariables
>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePostMutation,
    CreatePostMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(
    CreatePostDocument,
    options,
  );
}
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<
  CreatePostMutation,
  CreatePostMutationVariables
>;
export const FindAllPostDocument = gql`
  query FindAllPost {
    findAllPost {
      id
      body
      title
      created_at
      difficulty
      post_likes {
        id
        post_id
        user_id
      }
      posts_tags {
        tag {
          id
          name
          name_filtered
        }
      }
    }
  }
`;

/**
 * __useFindAllPostQuery__
 *
 * To run a query within a React component, call `useFindAllPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllPostQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAllPostQuery(
  baseOptions?: Apollo.QueryHookOptions<FindAllPostQuery, FindAllPostQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindAllPostQuery, FindAllPostQueryVariables>(
    FindAllPostDocument,
    options,
  );
}
export function useFindAllPostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FindAllPostQuery, FindAllPostQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindAllPostQuery, FindAllPostQueryVariables>(
    FindAllPostDocument,
    options,
  );
}
export type FindAllPostQueryHookResult = ReturnType<typeof useFindAllPostQuery>;
export type FindAllPostLazyQueryHookResult = ReturnType<typeof useFindAllPostLazyQuery>;
export type FindAllPostQueryResult = Apollo.QueryResult<
  FindAllPostQuery,
  FindAllPostQueryVariables
>;
export const FindSinglePostDocument = gql`
  query FindSinglePost($input: getPost!) {
    findSinglePost(input: $input) {
      id
      body
      title
      difficulty
      post_likes {
        id
        post_id
        user_id
      }
      posts_tags {
        tag {
          id
          name
          name_filtered
        }
      }
    }
  }
`;

/**
 * __useFindSinglePostQuery__
 *
 * To run a query within a React component, call `useFindSinglePostQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindSinglePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindSinglePostQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindSinglePostQuery(
  baseOptions: Apollo.QueryHookOptions<FindSinglePostQuery, FindSinglePostQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindSinglePostQuery, FindSinglePostQueryVariables>(
    FindSinglePostDocument,
    options,
  );
}
export function useFindSinglePostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindSinglePostQuery,
    FindSinglePostQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindSinglePostQuery, FindSinglePostQueryVariables>(
    FindSinglePostDocument,
    options,
  );
}
export type FindSinglePostQueryHookResult = ReturnType<typeof useFindSinglePostQuery>;
export type FindSinglePostLazyQueryHookResult = ReturnType<
  typeof useFindSinglePostLazyQuery
>;
export type FindSinglePostQueryResult = Apollo.QueryResult<
  FindSinglePostQuery,
  FindSinglePostQueryVariables
>;
export const GetAllTagsDocument = gql`
  query GetAllTags {
    getAllTags {
      id
      name
      name_filtered
      updated_at
    }
  }
`;

/**
 * __useGetAllTagsQuery__
 *
 * To run a query within a React component, call `useGetAllTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllTagsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetAllTagsQuery, GetAllTagsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllTagsQuery, GetAllTagsQueryVariables>(
    GetAllTagsDocument,
    options,
  );
}
export function useGetAllTagsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetAllTagsQuery, GetAllTagsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAllTagsQuery, GetAllTagsQueryVariables>(
    GetAllTagsDocument,
    options,
  );
}
export type GetAllTagsQueryHookResult = ReturnType<typeof useGetAllTagsQuery>;
export type GetAllTagsLazyQueryHookResult = ReturnType<typeof useGetAllTagsLazyQuery>;
export type GetAllTagsQueryResult = Apollo.QueryResult<
  GetAllTagsQuery,
  GetAllTagsQueryVariables
>;
export const SigninDocument = gql`
  mutation Signin($input: InputSignin!) {
    signin(input: $input) {
      token
    }
  }
`;
export type SigninMutationFn = Apollo.MutationFunction<
  SigninMutation,
  SigninMutationVariables
>;

/**
 * __useSigninMutation__
 *
 * To run a mutation, you first call `useSigninMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSigninMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signinMutation, { data, loading, error }] = useSigninMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSigninMutation(
  baseOptions?: Apollo.MutationHookOptions<SigninMutation, SigninMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SigninMutation, SigninMutationVariables>(
    SigninDocument,
    options,
  );
}
export type SigninMutationHookResult = ReturnType<typeof useSigninMutation>;
export type SigninMutationResult = Apollo.MutationResult<SigninMutation>;
export type SigninMutationOptions = Apollo.BaseMutationOptions<
  SigninMutation,
  SigninMutationVariables
>;
export const RegisterDocument = gql`
  mutation Register($input: registerInput!) {
    register(input: $input) {
      id
    }
  }
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options,
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const WhoAmIDocument = gql`
  query WhoAmI {
    whoAmI {
      error
      ok
      user {
        id
      }
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
  return Apollo.useQuery<WhoAmIQuery, WhoAmIQueryVariables>(WhoAmIDocument, options);
}
export function useWhoAmILazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<WhoAmIQuery, WhoAmIQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<WhoAmIQuery, WhoAmIQueryVariables>(WhoAmIDocument, options);
}
export type WhoAmIQueryHookResult = ReturnType<typeof useWhoAmIQuery>;
export type WhoAmILazyQueryHookResult = ReturnType<typeof useWhoAmILazyQuery>;
export type WhoAmIQueryResult = Apollo.QueryResult<WhoAmIQuery, WhoAmIQueryVariables>;

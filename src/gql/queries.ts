import { gql } from "@apollo/client";

export const CREATE_USER = gql`
    mutation CreateUser($auth0Id:String!,$username:String!,$email:String!,$profilePicture:String!) {
        createUser(auth0Id:$auth0Id,username:$username,email:$email,profilePicture:$profilePicture) {
            id
            auth0Id
            username
        }
    }
`;

export const CREATE_POST = gql`
    mutation CreatePost($author:ID!,$title:String!,$content:String!,$imageUrl:String!){
        createPost(author:$author,title:$title,content:$content,imageUrl:$imageUrl){
            title
        }
    }
`



export const FOLLOW_USER = gql`
    mutation FollowUser($userId: ID!, $userToFollowId: ID!){
    followUser(userId: $userId, userToFollowId: $userToFollowId) {
        username
    }
    }
`;

export const UNFOLLOW_USER = gql`
    mutation UnfollowUser($userId: ID!, $userTounfollowId: ID!){
    unfollowUser(userId: $userId, userTounfollowId: $userTounfollowId) {
        username
    }
    }
`


export const GET_USERS_TO_FOLLOW = gql`
    query test($authId: String!){
        getPeopleToFollow(id: $authId) {
            id,
            username,
            email,
            profilePicture,
    }
}
`;


export const GET_FEED = gql`
   query test($userId: ID!){
    getFeed(userId: $userId) {
        id,
    title,
    content,
    imageUrl
    author {
      profilePicture,
      username,
      email
    }
  }
}
`;
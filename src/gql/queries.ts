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
    mutation CreatePost($author:String!,$title:String!,$content:String!,$imageUrl:String!){
        createPost(author:$author,title:$title,content:$content,imageUrl:$imageUrl){
            title
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
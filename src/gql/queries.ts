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
            username,
            email,
            profilePicture,
    }
}
`;
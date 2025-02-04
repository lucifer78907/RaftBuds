// GLOBAL TYPES FILE

// POST
type mentionObj = {
    username:string,
}

interface PostProps {
    id: string,
    title: string,
    content: string,
    imageUrl: string,
    author: {
        username: string,
        profilePicture: string,
        email: string
    }
    mentions: mentionObj[];
}

type PostInput = {
    title: string,
    content: string,
    imageUrl: string,
}

interface Tag {
    username:string,
    id:string,
}

// USER 
interface User {
    username: string;
    email: string;
    profilePicture: string;
    followers: [{
        id:string,
        username:string,
        email:string
    }]
    following:[{
        id:string,
        username:string,
        email:string
    }],
}

// FRIENDS
interface FriendCardDetails {
    id: string,
    username: string,
    email: string,
    profilePicture: string,
    isFollowing:boolean,
}



// MODAL
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}
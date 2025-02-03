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
    name: string;
    email: string;
    picture: string;
    followers?: number | 0;
    following?: number | 0;
    handleLogout: () => void;
}

// FRIENDS
interface FriendCardDetails {
    id: string,
    username: string,
    email: string,
    profilePicture: string,
}



// MODAL
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}
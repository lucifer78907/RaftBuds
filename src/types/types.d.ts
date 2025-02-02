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
}


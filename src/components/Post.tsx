function Post({ post }: { post: PostProps }) {

    return (
        <article className="flex flex-col gap-4 mt-8 shadow-lg p-4 bg-neutral-50 rounded-xl">
            <header className="flex gap-4 items-center">
                <img src={post.author.profilePicture} alt={post.author.username} className="w-12 h-12 rounded-full shadow-md" />
                <div>
                    <h2 className="text-xl text-neutral-700 font-semibold">{post.author.username}</h2>
                    <p className="text-neutral-500">{post.author.email}</p>
                </div>
            </header>
            <main className="flex flex-col gap-4">
                <p className="text-lg text-neutral-800 font-medium">{post.title}
                    {post.mentions.length > 0 &&
                        <span className='text-blue-500'> {post.mentions.length > 2 ? `with ${post.mentions.length} others` : `with ${post.mentions.map((mention) => mention.username).join(' & ')}`} </span>
                    }
                </p>
                <p className="text-lg text-neutral-800">{post.content}</p>
                <img src={post.imageUrl} alt={post.title} className="rounded-lg shadow-lg" />
            </main>
        </article >
    )
}

export default Post

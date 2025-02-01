import React from 'react'

function Post({ user, post }) {

    return (
        <article className="flex flex-col gap-4 mt-8 shadow-lg p-4 bg-neutral-50 rounded-xl">
            <header className="flex gap-4 items-center">
                <img src={user.picture} alt={user.name} className="w-12 h-12 rounded-full shadow-md" />
                <div>
                    <h2 className="text-xl text-neutral-700 font-semibold">{user.name}</h2>
                    <p className="text-neutral-500">React.js developer</p>
                </div>
            </header>
            <main className="flex flex-col gap-4">
                <p className="text-lg text-neutral-800 font-medium">{post.title} with  <span className='text-blue-500'>
                    {post.tags.length > 2 ? `${post.tags.length} others` : `${post.tags.join(' & ')}`}
                </span></p>
                <p className="text-lg text-neutral-800">{post.description}</p>
                <img src={post.imageUrl} alt={post.title} className="rounded-lg shadow-lg" />
            </main>
        </article>
    )
}

export default Post

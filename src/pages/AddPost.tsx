import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, gql } from "@apollo/client"
import React, { useState } from "react";
import { CREATE_POST } from "../gql/queries";
import { useDebouncedCallback } from "use-debounce";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

type Post = {
    title: string,
    content: string,
    imageUrl: string,
}

function AddPost() {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const [createPost] = useMutation(CREATE_POST);
    const [post, setPost] = useState<Post>({ title: '', imageUrl: '', content: '' })


    const handlePostSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (user && isAuthenticated) {
            const token = await getAccessTokenSilently();

            await createPost({
                variables: {
                    author: user.sub,
                    title: post.title,
                    content: post.content,
                    imageUrl: post.imageUrl
                },
                context: {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            });

            alert('Post created')
            navigate('/')
        }
    }

    const handleInputChange = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const id = e.target.id;
        const value = e.target.value;
        setPost({ ...post, [id]: value })
    }, 200)

    return (
        <section className="p-6">
            <header className="flex justify-between items-start gap-8">
                <div>
                    <h1 className="text-3xl text-orange-500 font-bold">Add post</h1>
                    <p className="text-lg text-neutral-500">Share something exiciting with your friends!</p>
                </div>
                <aside className="flex items-center gap-4">
                    <p onClick={() => navigate('/')} className="flex items-center gap-2 bg-orange-100 rounded-full shadow-md px-4 py-2 text-orange-600 cursor-pointer"><FaHome size={'1.4em'} />Home</p>
                </aside>
            </header>
            <main>
                <form onSubmit={handlePostSubmit} className="flex flex-col gap-4 mt-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="title" className="text-lg text-neutral-700 font-medium">Title</label>
                        <input onChange={handleInputChange} type="text" id="title" name="title" className="p-2 border border-neutral-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="imageUrl" className="text-lg text-neutral-700 font-medium">Image URL</label>
                        <input onChange={handleInputChange} type="text" id="imageUrl" name="imageUrl" className="p-2 border border-neutral-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="content" className="text-lg text-neutral-700 font-medium">Content</label>
                        <textarea onChange={handleInputChange} id="content" name="content" rows="4" className="p-2 border border-neutral-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"></textarea>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="tags" className="text-lg text-neutral-700 font-medium">Tags</label>
                        <input onChange={handleInputChange} type="text" id="tags" name="tags" placeholder="Tag people (comma separated)" className="p-2 border border-neutral-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
                    </div>
                    <button type="submit" className="px-4 py-2 text-lg rounded-xl shadow-md font-medium bg-orange-500 text-neutral-50">Submit</button>
                </form>
            </main>
        </section>
    )
}

export default AddPost
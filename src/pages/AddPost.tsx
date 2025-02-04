import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery } from "@apollo/client"
import React, { useState } from "react";
import { CREATE_POST, GET_FOLLOWING_LIST } from "../gql/queries";
import { useDebouncedCallback } from "use-debounce";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import useLocalStorage from "../hooks/useLocalStorage";
import TagPeople from "../components/TagPeople";



function AddPost() {
    // State
    const [post, setPost] = useState<PostInput>({ title: '', imageUrl: '', content: '' })
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    // User
    const { userId } = useLocalStorage();
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    // Requests
    const [createPost] = useMutation(CREATE_POST);
    const { data } = useQuery(GET_FOLLOWING_LIST, { variables: { userId: userId } })
    // Navigation
    const navigate = useNavigate();


    // Submit post handler
    const handlePostSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // only submit if the user is there and authenticated
        if (user && isAuthenticated) {
            const token = await getAccessTokenSilently();

            await createPost({
                variables: {
                    author: userId,
                    title: post.title,
                    content: post.content,
                    imageUrl: post.imageUrl,
                    tags: selectedTags.map((tag: Tag) => tag.id)
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

    // In case of any input change , this is handled by this function (except the tags)
    const handleInputChange = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const id = e.target.id;
        const value = e.target.value;
        setPost({ ...post, [id]: value })
    }, 200)



    // Add / Remove tag handler
    const addTagValueHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const [newTag, tagId] = e.target.value.split("-");
        if (selectedTags.some(tag => tag.id === tagId)) return;
        const newSelectedTags = [...selectedTags, { id: tagId, username: newTag }];
        setSelectedTags(newSelectedTags);
    };

    const removeTagHandler = (tag: string) => {
        const newSelectedTags = selectedTags.filter(
            (product) => product.username !== tag,
        );
        setSelectedTags(newSelectedTags);
    };



    return (
        <section className="p-6">
            <header className="flex flex-col gap-4 sm:flex-row justify-between items-start md:gap-8">
                <div>
                    <h1 className="text-2xl md:text-3xl text-orange-500 font-bold">Add post</h1>
                    <p className="text-sm md:text-lg text-neutral-500">Share something exiciting with your friends!</p>
                </div>
                <aside className="flex items-center gap-4">
                    <p onClick={() => navigate('/')} className="text-sm sm:text-base flex items-center gap-2 bg-orange-100 rounded-full shadow-md px-4 py-2 text-orange-600 cursor-pointer"><FaHome size={'1.4em'} />Home</p>
                </aside>
            </header>
            <main className="my-10">
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
                        <textarea onChange={handleInputChange} id="content" name="content" className="p-2 border border-neutral-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"></textarea>
                    </div>
                    <TagPeople data={data} tags={selectedTags} addTagsHandler={addTagValueHandler} removeTagHandler={removeTagHandler} />
                    <button type="submit" className="px-4 py-2 text-lg rounded-xl shadow-md font-medium bg-orange-500 text-neutral-50">Submit</button>
                </form>
            </main>
        </section>
    )
}

export default AddPost
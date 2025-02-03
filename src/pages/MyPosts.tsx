import { useQuery } from "@apollo/client";
import { FaHome } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import useLocalStorage from "../hooks/useLocalStorage";
import { GET_USER_POSTS } from "../gql/queries";
import Post from "../components/Post";


function MyPosts() {
    const { userId } = useLocalStorage();
    const navigate = useNavigate();
    const { data } = useQuery(GET_USER_POSTS, { variables: { userId: userId } })

    console.log(data?.getUserPosts)


    return (
        <section className="p-6" >
            <header className="flex justify-between items-start gap-8">
                <div>
                    <h1 className="text-3xl text-orange-500 font-bold">My posts</h1>
                    <p className="text-lg text-neutral-500">View your posts</p>
                </div>
                <aside className="flex items-center gap-4">
                    <p onClick={() => navigate('/')} className="flex items-center gap-2 bg-orange-100 rounded-full shadow-md px-4 py-2 text-orange-600 cursor-pointer"><FaHome size={'1.4em'} />Home</p>
                </aside>
            </header>
            <main>
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {data?.getUserPosts.map((post: PostProps) => {
                        return <Post key={post.id} post={post} />
                    }
                    )}
                </section>
            </main>
        </section>
    )
}

export default MyPosts
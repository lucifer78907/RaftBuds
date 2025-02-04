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



    return (
        <section className="p-6" >

            <header className="flex flex-col gap-4 sm:flex-row justify-between items-start md:gap-8">
                <div>
                    <h1 className="text-2xl md:text-3xl text-orange-500 font-bold">My posts</h1>
                    <p className="text-sm md:text-lg text-neutral-500">View your posts</p>
                </div>
                <aside className="flex items-center gap-4">
                    <p onClick={() => navigate('/')} className="text-sm sm:text-base flex items-center gap-2 bg-orange-100 rounded-full shadow-md px-4 py-2 text-orange-600 cursor-pointer"><FaHome size={'1.4em'} />Home</p>
                </aside>
            </header>
            <main>
                <section className="w-full grid grid-cols-1 lg:grid-cols-2 lg:w-full xl:w-[75%]  gap-8 sm:w-[75%] mx-auto items-start">
                    {data?.getUserPosts.map((post: PostProps) => {
                        return <Post key={post.id} post={post} />
                    }
                    )}
                </section>
            </main>
            {data?.getUserPosts.length === 0 &&
                <div className="text-center mt-20">
                    <h1 className="text-4xl text-orange-500 font-bold">Post something good!</h1>
                    <p className="text-xl mt-2 text-neutral-500">You haven't posted anything yet.</p>
                </div>
            }
        </section>
    )
}

export default MyPosts
import FriendCard from "../components/FriendCard"
import { useQuery } from "@apollo/client"
import { GET_USERS_TO_FOLLOW } from "../gql/queries"
import LoadingSpinner from "../components/LoadingSpinner"
import { useNavigate } from "react-router-dom"
import { FaHome } from "react-icons/fa"
import useLocalStorage from "../hooks/useLocalStorage"

function AddFriends() {
    const { userId } = useLocalStorage();
    const { data, loading } = useQuery(GET_USERS_TO_FOLLOW, { variables: { authId: userId } });
    const navigate = useNavigate();



    if (loading)
        return <LoadingSpinner />

    console.log(data?.getPeopleToFollow);


    return (
        <section className="p-6">
            <header className="flex justify-between items-start gap-8">
                <div>
                    <h1 className="text-3xl text-orange-500 font-bold">Add friends</h1>
                    <p className="text-lg text-neutral-500">People you may know</p>
                </div>
                <aside className="flex items-center gap-4">
                    <p onClick={() => navigate('/')} className="flex items-center gap-2 bg-orange-100 rounded-full shadow-md px-4 py-2 text-orange-600 cursor-pointer"><FaHome size={'1.4em'} />Home</p>
                </aside>
            </header>
            <main className="mt-6 grid grid-cols-2 gap-8">
                {data?.getPeopleToFollow.map((people: FriendCardDetails) => <FriendCard key={people.email} {...people} />)}
            </main>
        </section>
    )
}

export default AddFriends
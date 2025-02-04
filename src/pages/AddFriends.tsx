import FriendCard from "../components/FriendCard"
import { useQuery } from "@apollo/client"
import { GET_USERS_TO_FOLLOW } from "../gql/queries"
import LoadingSpinner from "../components/LoadingSpinner"
import { useNavigate } from "react-router-dom"
import { FaHome } from "react-icons/fa"
import useLocalStorage from "../hooks/useLocalStorage"

function AddFriends() {
    const { userId } = useLocalStorage();
    const { data, loading } = useQuery(GET_USERS_TO_FOLLOW, { variables: { authId: userId }, fetchPolicy: 'network-only' });
    const navigate = useNavigate();

    if (loading)
        return <LoadingSpinner />

    console.log(data?.getPeopleToFollow);


    return (
        <section className="p-6">
            <header className="flex flex-col gap-4 sm:flex-row justify-between items-start md:gap-8">
                <div>
                    <h1 className="text-2xl md:text-3xl text-orange-500 font-bold">Add friends</h1>
                    <p className="text-sm md:text-lg text-neutral-500">People you may know</p>
                </div>
                <aside className="flex items-center gap-4">
                    <p onClick={() => navigate('/')} className="text-sm sm:text-base flex items-center gap-2 bg-orange-100 rounded-full shadow-md px-4 py-2 text-orange-600 cursor-pointer"><FaHome size={'1.4em'} />Home</p>
                </aside>
            </header>
            <main className="mt-6 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
                {data?.getPeopleToFollow.map((people: FriendCardDetails) => <FriendCard key={people.email} {...people} />)}

            </main>
            {data?.getPeopleToFollow.length === 0 &&
                <div className="text-center mt-20">
                    <h1 className="text-4xl text-orange-500 font-bold">Omg! You followed everyone</h1>
                    <p className="text-xl mt-2 text-neutral-500">Check back later to find new friends!</p>
                </div>
            }
        </section>
    )
}

export default AddFriends
import FriendCard from "../components/FriendCard"
import { useQuery } from "@apollo/client"
import { useAuth0 } from "@auth0/auth0-react"
import { GET_USERS_TO_FOLLOW } from "../gql/queries"
import LoadingSpinner from "../components/LoadingSpinner"
import { useEffect, useState } from "react"

type FriendCardDetails = {
    username: string,
    email: string,
    profilePicture: string,
    isFollowed: boolean
}

function AddFriends() {
    const [id, setId] = useState<string>('');
    const { data, loading } = useQuery(GET_USERS_TO_FOLLOW, { variables: { authId: id } });

    useEffect(() => {
        const id = localStorage.getItem('userData');
        if (id)
            setId(id);
    }, [])

    if (loading)
        return <LoadingSpinner />

    console.log(data?.getPeopleToFollow);


    return (
        <section className="p-6">
            <header className="flex flex-col items-start gap-2">
                <h1 className="text-3xl text-orange-500 font-bold">Add friends</h1>
                <p className="text-lg text-neutral-500">People you may know</p>
            </header>
            <main className="mt-6 grid grid-cols-2 gap-8">
                {data?.getPeopleToFollow.map((people: FriendCardDetails) => <FriendCard key={people.email} {...people} />)}
            </main>
        </section>
    )
}

export default AddFriends
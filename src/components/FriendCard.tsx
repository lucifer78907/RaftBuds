import { useMutation } from "@apollo/client";
import { useState } from "react";
import { FOLLOW_USER, UNFOLLOW_USER } from "../gql/queries";
import useLocalStorage from "../hooks/useLocalStorage";



function FriendCard({ profilePicture, username, email, id, isFollowing }: FriendCardDetails) {
    const { userId } = useLocalStorage();
    const [followUser] = useMutation(FOLLOW_USER);
    const [unFollowUser] = useMutation(UNFOLLOW_USER);

    const [isFollow, setIsFollow] = useState<boolean>(isFollowing);

    const handleFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsFollow(!isFollow);
        let button = e.target as HTMLButtonElement;
        if (button.textContent === 'Follow') {
            await followUser({ variables: { userId: userId, userToFollowId: id } })
        }
        else {
            await unFollowUser({ variables: { userId: userId, userTounfollowId: id } })
        }
    }

    return (
        <article className="flex flex-col sm:flex-row justify-center rounded-xl shadow-md items-center gap-4 bg-neutral-50 py-4 px-8">
            <header>
                <img src={profilePicture} alt="Person img" className="w-18 h-18 object-cover rounded-full" />
            </header>
            <main>
                <h2 className="text-lg md:text-2xl font-medium text-neutral-700">{username}</h2>
                <p className="text-sm text-neutral-500">{email}</p>
            </main>
            <aside className="sm:ml-auto">
                <button onClick={handleFollow} className={`cursor-pointer px-4 py-2 rounded-full ${isFollow ? 'bg-neutral-500' : 'bg-orange-500'}  text-xl font-medium text-white shadow-lg`}>{isFollow ? 'Unfollow' : 'Follow'}</button>
            </aside>
        </article>
    )
}

export default FriendCard
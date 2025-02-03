import { useNavigate } from 'react-router-dom'
import { FaHome } from 'react-icons/fa';
import useLocalStorage from '../hooks/useLocalStorage';
import { useQuery } from '@apollo/client';
import { GET_FOLLOWING_LIST } from '../gql/queries';
import FriendCard from '../components/FriendCard';

function UnfollowPeople() {
    const navigate = useNavigate();
    const { userId } = useLocalStorage();
    const { data } = useQuery(GET_FOLLOWING_LIST, { variables: { userId: userId } });


    return (
        <section className="p-6">
            <header className="flex justify-between items-start gap-8">
                <div>
                    <h1 className="text-3xl text-orange-500 font-bold">Unfollow People</h1>
                    <p className="text-lg text-neutral-500">People you may know</p>
                </div>
                <aside className="flex items-center gap-4">
                    <p onClick={() => navigate('/')} className="flex items-center gap-2 bg-orange-100 rounded-full shadow-md px-4 py-2 text-orange-600 cursor-pointer"><FaHome size={'1.4em'} />Home</p>
                </aside>
            </header>
            <main className="mt-6 grid grid-cols-2 gap-8">
                {data?.getFollowingList.map((people: FriendCardDetails) => <FriendCard key={people.email} {...people} isFollowing={true} />)}

            </main>
            {data?.getFollowingList.length === 0 &&
                <div className="text-center mt-20">
                    <h1 className="text-4xl text-orange-500 font-bold">Oops! You aren't following anyone</h1>
                    <p className="text-xl mt-2 text-neutral-500">Check add friends to add new people!</p>
                </div>
            }
        </section>
    )
}

export default UnfollowPeople
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { FaUserXmark } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa6";
import { MdAddAPhoto } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../gql/queries";
import LoadingSpinner from "./LoadingSpinner";
import useLocalStorage from "../hooks/useLocalStorage";




function Profile({ handleLogout, handleModalClose }: { handleLogout: () => void, handleModalClose: () => void }) {
    const { userId } = useLocalStorage();
    const { data, loading } = useQuery(GET_USER, { variables: { userId: userId }, fetchPolicy: 'cache-and-network' });
    const navigate = useNavigate();


    if (loading) {
        return <div className="mb-20">
            <LoadingSpinner />
        </div>
    }

    const handleNavigate = (path: string) => {
        handleModalClose();
        navigate(path);
    }

    return (
        <div className="flex flex-col gap-2 items-center mx-2 my-4">
            <img src={data?.getUser.profilePicture} alt={data?.getUser.username} className="w-24 h-24 rounded-full shadow-md" />
            <h3 className="text-lg font-medium text-neutral-700">{data?.getUser.username}</h3>
            <p className="text-sm -mt-2 font-light text-neutral-500">{data?.getUser.email}</p>
            <main className="w-full">
                <header className="flex gap-8 items-center justify-center">
                    <p className="text-xl text-neutral-700 font-medium">Followers <span className="text-orange-400">{data?.getUser.followers?.length}</span></p>
                    <p className="text-xl text-neutral-700 font-medium">Following <span className="text-orange-400">{data?.getUser.following?.length}</span></p>
                </header>
                <section className="my-8  grid grid-cols-2 gap-4 text-neutral-800">
                    <button onClick={() => handleNavigate('/add-post')} className="flex items-center gap-2 cursor-pointer shadow-md px-4 py-2 rounded-xl"><MdAddAPhoto size={'2em'} className="fill-neutral-500" /> Add post</button>
                    <button onClick={() => handleNavigate('/my-posts')} className="flex items-center gap-2 cursor-pointer shadow-md px-4 py-2 rounded-xl"><MdOutlinePhotoLibrary size={'2em'} className="fill-neutral-500" />My Posts</button>
                    <button onClick={() => handleNavigate('/add-friends')} className="flex items-center gap-2 cursor-pointer shadow-md px-4 py-2 rounded-xl"><FaUserPlus size={'2em'} className="fill-neutral-500" />Add friends</button>
                    <button onClick={() => handleNavigate('/unfollow')} className="flex items-center gap-2 cursor-pointer shadow-md px-2 py-2 rounded-xl"><FaUserXmark size={'2em'} className="fill-neutral-500" />Remove friends</button>

                </section>
            </main>
            <button onClick={handleLogout} className="cursor-pointer  px-4 py-2 text-2xl rounded-xl self-center shadow-md font-medium bg-red-500 text-neutral-50">Logout</button>
        </div>
    )
}

export default Profile
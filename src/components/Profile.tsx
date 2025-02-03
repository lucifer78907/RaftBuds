import { MdOutlinePhotoLibrary } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { FaUserTag } from "react-icons/fa";
import { MdAddAPhoto } from "react-icons/md";
import { useNavigate } from "react-router-dom";




function Profile({ username, email, profilePicture, followers, following, handleLogout, handleModalClose }: User) {
    const navigate = useNavigate();

    const handleNavigate = (path: string) => {
        handleModalClose();
        navigate(path);
    }

    return (
        <div className="flex flex-col gap-2 items-center mx-2 my-4">
            <img src={profilePicture} alt={username} className="w-24 h-24 rounded-full shadow-md" />
            <h3 className="text-lg font-medium text-neutral-700">{username}</h3>
            <p className="text-sm -mt-2 font-light text-neutral-500">{email}</p>
            <main className="w-full">
                <header className="flex gap-8 items-center justify-center">
                    <p className="text-xl text-neutral-700 font-medium">Followers <span className="text-orange-400">{followers?.length}</span></p>
                    <p className="text-xl text-neutral-700 font-medium">Following <span className="text-orange-400">{following?.length}</span></p>
                </header>
                <section className="my-8  grid grid-cols-2 gap-4 text-neutral-800">
                    <button onClick={() => handleNavigate('/add-post')} className="flex items-center gap-2 cursor-pointer shadow-md px-4 py-2 rounded-xl"><MdAddAPhoto size={'2em'} className="fill-neutral-500" /> Add post</button>
                    <button className="flex items-center gap-2 cursor-pointer shadow-md px-4 py-2 rounded-xl"><FaUserTag size={'2em'} className="fill-neutral-500" /> Tags</button>
                    <button onClick={() => handleNavigate('/my-posts')} className="flex items-center gap-2 cursor-pointer shadow-md px-4 py-2 rounded-xl"><MdOutlinePhotoLibrary size={'2em'} className="fill-neutral-500" />My Posts</button>
                    <button className="flex items-center gap-2 cursor-pointer shadow-md px-4 py-2 rounded-xl"><FaUserFriends size={'2em'} className="fill-neutral-500" />Connections</button>
                </section>
            </main>
            <button onClick={handleLogout} className="cursor-pointer  px-4 py-2 text-2xl rounded-xl self-center shadow-md font-medium bg-red-500 text-neutral-50">Logout</button>
        </div>
    )
}

export default Profile
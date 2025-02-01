import { MdOutlinePhotoLibrary } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { FaUserTag } from "react-icons/fa";
import { MdAddAPhoto } from "react-icons/md";





interface User {
    name: string;
    email: string;
    picture: string;
    followers?: number | 0;
    following?: number | 0;
    handleLogout: () => void;
}

function Profile({ name, email, picture, handleLogout }: User) {
    return (
        <div className="flex flex-col gap-2 items-center mx-2 my-4">
            <img src={picture} alt={name} className="w-24 h-24 rounded-full shadow-md" />
            <h3 className="text-lg font-medium text-neutral-700">{name}</h3>
            <p className="text-sm -mt-2 font-light text-neutral-500">{email}</p>
            <main className="w-full">
                <header className="flex gap-8 items-center justify-center">
                    <p className="text-xl text-neutral-700 font-medium">Followers <span className="text-orange-400">250</span></p>
                    <p className="text-xl text-neutral-700 font-medium">Following <span className="text-orange-400">230</span></p>
                </header>
                <section className="my-8  grid grid-cols-2 gap-4 text-neutral-800">
                    <button className="flex items-center gap-2 cursor-pointer shadow-md px-4 py-2 rounded-xl"><MdAddAPhoto size={'2em'} className="fill-neutral-500" /> Add post</button>
                    <button className="flex items-center gap-2 cursor-pointer shadow-md px-4 py-2 rounded-xl"><FaUserTag size={'2em'} className="fill-neutral-500" /> Tags</button>
                    <button className="flex items-center gap-2 cursor-pointer shadow-md px-4 py-2 rounded-xl"><MdOutlinePhotoLibrary size={'2em'} className="fill-neutral-500" /> Posts</button>
                    <button className="flex items-center gap-2 cursor-pointer shadow-md px-4 py-2 rounded-xl"><FaUserFriends size={'2em'} className="fill-neutral-500" />Connections</button>
                </section>
            </main>
            <button onClick={handleLogout} className="cursor-pointer  px-4 py-2 text-2xl rounded-xl self-center shadow-md font-medium bg-red-500 text-neutral-50">Logout</button>
        </div>
    )
}

export default Profile
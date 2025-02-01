

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
        <div className="flex flex-col gap-2 items-center">
            <img src={picture} alt={name} className="w-24 h-24 rounded-full shadow-md" />
            <h3 className="text-lg font-medium text-neutral-700">{name}</h3>
            <p className="text-sm -mt-2 font-light text-neutral-500">{email}</p>
            <main>
                <header className="flex gap-8 items-center">
                    <p className="text-xl text-neutral-700 font-medium">Followers <span className="text-orange-400">250</span></p>
                    <p className="text-xl text-neutral-700 font-medium">Following <span className="text-orange-400">230</span></p>
                </header>
            </main>
            <button onClick={handleLogout} className="cursor-pointer  px-4 py-2 text-2xl rounded-xl shadow-md font-medium bg-red-500 text-neutral-50">Logout</button>
        </div>
    )
}

export default Profile
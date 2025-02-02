interface FriendCardDetails {
    username: string,
    email: string,
    profilePicture: string,
    isFollowed: boolean
}

function FriendCard({ profilePicture, username, email }: FriendCardDetails) {
    return (
        <article className="flex rounded-xl shadow-md items-center gap-4 bg-neutral-50 py-4 px-8">
            <header>
                <img src={profilePicture} alt="Person img" className="w-18 h-18 object-cover rounded-full" />
            </header>
            <main>
                <h2 className="text-2xl font-medium text-neutral-700">{username}</h2>
                <p className="text-sm text-neutral-500">{email}</p>
            </main>
            <aside className="ml-auto">
                <button className="px-4 py-2 rounded-full bg-orange-500 text-xl font-medium text-white shadow-lg">Follow</button>
            </aside>
        </article>
    )
}

export default FriendCard
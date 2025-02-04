import { IoPersonAddSharp } from "react-icons/io5";
import { MdAddAPhoto } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function FeedHeader({ nickname, name }: { nickname: string, name: string }) {
    const navigate = useNavigate();

    return (
        <header className="flex justify-between items-start gap-8">
            <div>
                <h1 className="text-3xl text-neutral-700 font-bold">Welcome <span className="text-orange-500">{nickname || name}</span></h1>
                <p className="mt-5 text-2xl text-neutral-500">Latest posts from fellow RaftBuds</p>
            </div>
            <aside className="flex items-center gap-4">
                <p onClick={() => navigate('/add-friends')} className="flex items-center gap-2 bg-orange-100 rounded-full shadow-md px-4 py-2 text-orange-600 cursor-pointer"><IoPersonAddSharp size={'1.4em'} />Add friends</p>
                <p onClick={() => navigate('/add-post')} className="flex items-center gap-2 bg-orange-100 rounded-full shadow-md px-4 py-2 text-orange-600 cursor-pointer"><MdAddAPhoto size={'1.4em'} />Add Post</p>
            </aside>
        </header>
    )
}

export default FeedHeader
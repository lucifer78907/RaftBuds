import { RxCross2 } from "react-icons/rx";

function TagPeople({ data, tags, removeTagHandler, addTagsHandler }: { data: any, tags: Tag[], removeTagHandler: (tagName: string) => void, addTagsHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void }) {
    return (
        <>
            <label htmlFor="tags" className="text-lg text-neutral-700 font-medium">Tag People</label>
            <select defaultValue="Select"
                onChange={addTagsHandler}
                className="p-2 border border-neutral-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
                <option value="Select" disabled>Select People</option>
                {data?.getFollowingList?.map((person: { id: string, username: string }) => (
                    <option key={person.id} value={`${person.username}-${person.id}`}>
                        {person.username}
                    </option>
                ))}
            </select>
            <div className="flex flex-wrap items-center gap-2">
                {tags.map((tag: Tag) => {
                    return (
                        <p
                            key={tag.id}
                            className="flex items-center gap-2 rounded-xl bg-green-200 px-3 py-2 text-sm font-bold text-accent/green"
                            onClick={() => removeTagHandler(tag.username)}
                        >
                            <span className="text-base font-bold">
                                <RxCross2 />
                            </span>
                            {tag.username}
                        </p>
                    );
                })}
            </div>
        </>
    )
}

export default TagPeople
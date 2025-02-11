import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { LuShare2 } from "react-icons/lu";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { useRouter } from "next/navigation";

const UserPost = ({ post, handleDelete }) => {

    const route = useRouter();

    const handleNavigate = (id) => {
        route.push(`/user/${id}`)
    }

    return (
        <div key={post.id} className="mb-4 p-4 h-56 flex flex-col items-center justify-between bg-white shadow-sm rounded-lg hover:shadow-lg transition-all">
            <div className="flex items-center justify-between w-full gap-4">
                <h3 className="text-lg font-bold">{post.title}</h3>
                <HiOutlineDotsHorizontal size={20} className="text-gray-600 hover:scale-110 transition-all" />
            </div>

            <div className="flex flex-col">
                <div className="max-h-[100px] min-h-[100px] overflow-auto scrollbar-hide">
                    <p className="text-gray-700 text-sm">{post?.description}</p>
                </div>

                <div className="flex items-center justify-between gap-3 mt-2">
                    <p className="font-semibold text-sm border px-3 rounded-lg bg-black text-white">{post?.due_date.split("T")[0]}</p>
                    <div className="flex items-center gap-3">
                        <LuShare2 size={18} className=" hover:scale-110 text-slate-500 transition-all hover:text-blue-600" title="share" />
                        <FiEdit onClick={() =>handleNavigate(post?._id)} size={18} className=" hover:scale-110 text-slate-500 transition-all hover:text-violet-600" title="edit" />
                        <MdOutlineDelete onClick={() => handleDelete(post?._id)} size={20} className=" hover:scale-110 text-slate-500 transition-all hover:text-red-600" title="delete" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPost;
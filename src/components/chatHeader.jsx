import { X } from "lucide-react";
import { useChatStore } from "../lib/useChat";
import { useAuth } from "../lib/useAuth";

export default function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuth();

  return (
    <div className="p-3 border-b border-base-300 bg-base-100/80 backdrop-blur-md flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="avatar">
          <div className="size-10 rounded-full border">
            <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
          </div>
        </div>
        <div>
          <h3 className="font-semibold">{selectedUser.fullName}</h3>
          <p className="text-xs text-zinc-500">
            {onlineUsers.includes(selectedUser._id) ? "🟢 Online" : "⚪ Offline"}
          </p>
        </div>
      </div>
      <button onClick={() => setSelectedUser(null)} className="btn btn-ghost btn-circle hover:bg-red-100 text-red-500">
        <X />
      </button>
    </div>
  );
}

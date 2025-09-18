import { useEffect, useState } from "react";
import { useChatStore } from "../lib/useChat";
import SidebarSkeleton from "./skeltons/sidebarskelton";
import { Users } from "lucide-react";
import { useAuth } from "../lib/useAuth";

export default function Sidebar() {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuth();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col bg-base-100/80 backdrop-blur-md shadow-sm">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6 text-secondary" />
          <span className="font-semibold hidden lg:block">Contacts</span>
        </div>

        {/* Online filter toggle */}
        <div className="mt-4 hidden lg:flex items-center justify-between">
          <label className="cursor-pointer flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="toggle toggle-sm toggle-secondary"
            />
            <span>Online only</span>
          </label>
          <span className="text-xs text-zinc-500">({onlineUsers.length})</span>
        </div>
      </div>

      {/* User list */}
      <div className="overflow-y-auto w-full py-3 space-y-1">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl transition-all
              ${selectedUser?._id === user._id
                ? "bg-secondary/10 ring-1 ring-secondary"
                : "hover:bg-base-200"}`}
          >
            <div className="relative">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full border border-base-300"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-base-100" />
              )}
            </div>
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.firstName + " " + user.lastName}</div>
              <div className="text-xs text-zinc-500">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-6 text-sm">No online users</div>
        )}
      </div>
    </aside>
  );
}

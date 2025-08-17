import { use, useEffect, useRef } from "react";
import { useChatStore } from "../lib/useChat";
import ChatHeader from "./chatHeader";
import MessageInput from "./messageInput";
import MessageSkeleton from "./skeltons/messageSkelton";
import { useAuth } from "../lib/useAuth";
import { formatMessageTime } from "../utils/utils";


export default function ChatContainer() {
    const {messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeToMessages} = useChatStore();

    const {user} = useAuth();
    const messageEndRef = useRef(null);
    useEffect(()=>{
        getMessages(selectedUser._id);

        subscribeToMessages();

        return() => unsubscribeToMessages();
    },[selectedUser._id, getMessages, subscribeToMessages, unsubscribeToMessages]);

    useEffect(() => {
      if(messageEndRef.current && messages) {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }
      }, [messages]);

    if(isMessagesLoading) { return (
        <div className="flex flex-1 flex-col overflow-auto">
            <ChatHeader />
            <MessageSkeleton />
        
            <MessageInput />
        </div>
    )
    }

    return(
        <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderID === user._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderID === user._id
                      ? user.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
    )
}
import { useEffect } from "react";
import { useChatStore } from "../lib/useChat";
import ChatHeader from "./chatHeader";
import MessageInput from "./messageInput";
import MessageSkeleton from "./skeltons/messageSkelton";


export default function ChatContainer() {
    const {messages, getMessages, isMessagesLoading, selectedUser} = useChatStore();

    useEffect(()=>{
        getMessages(selectedUser._id);
    },[selectedUser._id, getMessages]);

    if(isMessagesLoading) { return (
        <div className="flex flex-1 flex-col overflow-auto">
            <ChatHeader />
            <MessageSkeleton />
        
            <MessageInput />
        </div>
    )
    }

    return(
        <div className="flex flex-1 flex-col overflow-auto">
            <ChatHeader />

            <p>messages...</p>

            <MessageInput />

        </div>
    )
}
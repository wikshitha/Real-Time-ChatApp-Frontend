import { MessageCircle } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center px-6 py-20 bg-gradient-to-br from-[#FFDFEF] via-white to-[#F8ECFA] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-[#D69ADE] to-[#AA60C8] flex items-center justify-center shadow-lg shadow-[#D69ADE]/40 dark:shadow-[#AA60C8]/40 animate-float">
              <MessageCircle className="w-10 h-10 text-white drop-shadow" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-800 dark:text-white">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-[#D69ADE] to-[#AA60C8] bg-clip-text text-transparent">
            LiveLink
          </span>
          🚀
        </h2>

        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
          Select a conversation from the sidebar <br /> and start connecting instantly.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;

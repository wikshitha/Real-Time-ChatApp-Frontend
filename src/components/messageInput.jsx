import { useRef, useState } from "react";
import { useChatStore } from "../lib/useChat";
import toast from "react-hot-toast";
import { Image, Send, X } from "lucide-react";

export default function MessageInput() {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    fileInputRef.current.value = null;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    try {
      await sendMessage({ text: text.trim(), image: imagePreview });
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      toast.error("Failed to send message", error);
    }
  };

  return (
    <div className="p-4 bg-base-100/80 backdrop-blur-md border-t border-base-300">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-xl border shadow" />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center shadow cursor-pointer"
              type="button"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <input
          type="text"
          className="flex-1 input input-bordered rounded-full px-4"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageChange} />

        <button
          type="button"
          className={`btn btn-circle btn-sm ${imagePreview ? "btn-success" : "btn-ghost"}`}
          onClick={() => fileInputRef.current?.click()}
        >
          <Image size={20} />
        </button>

        <button type="submit" className="btn btn-circle btn-primary btn-sm" disabled={!text.trim() && !imagePreview}>
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}

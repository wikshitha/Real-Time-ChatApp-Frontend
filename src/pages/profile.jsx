import { useState } from "react";
import { Camera, Mail, User } from "lucide-react";
import { useAuth } from "../lib/useAuth";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, updateProfile, isUpdatingProfile } = useAuth();
  const [selectedImg, setSelectedImg] = useState(null);
  const navigate = useNavigate();

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const newImage = reader.result;
      setSelectedImg(newImage);
      await updateProfile({ profilePic: newImage });
      setSelectedImg(null);
      navigate("/");
    };
  }

  return (
    <div className="min-h-screen bg-base-100 pt-24 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-white dark:bg-base-200 shadow-md rounded-2xl p-8 text-center">
          <h1 className="text-3xl font-bold text-base-content">Profile</h1>
          <p className="text-base-content/60 mt-2">Manage your profile information and photo</p>
        </div>

        {/* Avatar Section */}
        <div className="bg-white dark:bg-base-200 shadow-md rounded-2xl p-8 flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={selectedImg || user?.profilePic || "/avatar.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-secondary shadow-md"
            />
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 bg-secondary p-3 rounded-full cursor-pointer shadow-lg transition-transform hover:scale-110 ${
                isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
              }`}
            >
              <Camera className="w-5 h-5 text-white" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <p className="text-sm text-base-content/60">
            {isUpdatingProfile ? "Uploading..." : "Click the camera icon to change photo"}
          </p>
        </div>

        {/* User Details */}
        <div className="bg-white dark:bg-base-200 shadow-md rounded-2xl p-8 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-base-content/70 mb-1">
              <User className="w-4 h-4" /> First Name
            </div>
            <div className="px-4 py-3 rounded-lg bg-base-100 border border-base-300 text-base-content">
              {user?.firstName}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-base-content/70 mb-1">
              <User className="w-4 h-4" /> Last Name
            </div>
            <div className="px-4 py-3 rounded-lg bg-base-100 border border-base-300 text-base-content">
              {user?.lastName}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-base-content/70 mb-1">
              <Mail className="w-4 h-4" /> Email
            </div>
            <div className="px-4 py-3 rounded-lg bg-base-100 border border-base-300 text-base-content">
              {user?.email}
            </div>
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-white dark:bg-base-200 shadow-md rounded-2xl p-8">
          <h2 className="text-lg font-semibold mb-4 text-base-content">Account Information</h2>
          <div className="divide-y divide-base-300 text-sm">
            <div className="flex items-center justify-between py-3">
              <span>Member Since</span>
              <span className="font-medium">{user?.createdAt?.split("T")[0]}</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span>Account Status</span>
              <span className="text-green-500 font-medium">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

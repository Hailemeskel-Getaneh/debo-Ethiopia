// components/ProfileHeader.tsx
import { useEffect, useState } from "react";
import { userService, type UserProfile } from "./userService";

const ProfileHeader = () => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    userService
      .getCurrentUser()
      .then(setUser)
      .catch(() => {
        /* ExceptionHandler already handled the notification */
      });
  }, []);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const updatedUser = await userService.updateAvatar(file);
      setUser(updatedUser);
    }
  };

  if (!user) return null;

  return (
    <div className="flex items-center gap-4">
      <img
        src={user.avatar || "/default.png"}
        className="w-12 h-12 rounded-full"
        alt={`${user.first_name}'s avatar`}
      />
      <div>
        <h3 className="font-bold">
          {user.first_name} {user.last_name}
        </h3>
        <input
          type="image/*"
          onChange={handleAvatarChange}
          className="hidden"
          id="avatar-input"
        />
        <label
          htmlFor="avatar-input"
          className="text-xs text-blue-500 cursor-pointer"
        >
          Change Photo
        </label>
      </div>
    </div>
  );
};

export default ProfileHeader;

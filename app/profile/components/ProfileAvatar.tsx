import React, { useState, ChangeEvent } from 'react';

interface ProfileAvatarProps {
  name: string;
  imageUrl: string;
}

const ProfileAvatar = ({ name, imageUrl }: ProfileAvatarProps) => {
  const [image, setImage] = useState(imageUrl);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      
    }
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <label className="relative cursor-pointer">
        <img
          src={image}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-gray-300 shadow-md"
        />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
        <div className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-md text-xs">
          📷
        </div>
      </label>
      <div className="mt-2 text-center">{name}</div>
    </div>
  );
};

export default ProfileAvatar;

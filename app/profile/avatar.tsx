"use client";
interface AvatarProps {
  profileImage: string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Avatar({ profileImage, handleImageChange }: AvatarProps) {
  return (
    <div className="relative">
      <img 
        src={profileImage} 
        alt="Profile"
        className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 shadow-md"
      />
      <label className="absolute bottom-0 right-0 bg-blue-600 text-white text-sm px-3 py-1 rounded-full shadow hover:bg-blue-500 transition cursor-pointer">
        Change
        <input 
          type="file" 
          className="hidden" 
          accept="image/*" 
          onChange={handleImageChange}
        />
      </label>
    </div>
  );
}

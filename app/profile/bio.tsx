"use client";
interface BioProps {
  bio: string;
  isEditing: boolean;
  setBio: (bio: string) => void;
}

export default function Bio({ bio, isEditing, setBio }: BioProps) {
  return !isEditing ? (
    <p className="text-gray-500">{bio}</p>
  ) : (
    <textarea
      value={bio}
      onChange={(e) => setBio(e.target.value)}
      className="w-full border border-gray-300 p-2 rounded mt-1"
    />
  );
}

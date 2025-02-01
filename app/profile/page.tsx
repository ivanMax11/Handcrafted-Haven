"use client";
import { useState, useEffect } from "react";
import Avatar from "./avatar";
import Bio from "./bio";
import SocialLinks from "./socialLinks";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("John Doe");
  const [bio, setBio] = useState("Craftsman specializing in handmade pottery.");
  const [profileImage, setProfileImage] = useState("/default-avatar.png");
  const [socialLinks, setSocialLinks] = useState<{ platform: string; url: string }[]>([]);

  useEffect(() => {
    const storedName = localStorage.getItem("profileName");
    const storedBio = localStorage.getItem("profileBio");
    const storedImage = localStorage.getItem("profileImage");
    const storedSocialLinks = localStorage.getItem("socialLinks");

    if (storedName) setName(storedName);
    if (storedBio) setBio(storedBio);
    if (storedImage) setProfileImage(storedImage);
    if (storedSocialLinks) setSocialLinks(JSON.parse(storedSocialLinks));
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        setProfileImage(imageUrl);
        localStorage.setItem("profileImage", imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    localStorage.setItem("profileName", name);
    localStorage.setItem("profileBio", bio);
    localStorage.setItem("socialLinks", JSON.stringify(socialLinks));
    setIsEditing(false);
  };

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { platform: "", url: "" }]);
  };

  const updateSocialLink = (index: number, key: "platform" | "url", value: string) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index][key] = value;
    setSocialLinks(updatedLinks);
  };

  const removeSocialLink = (index: number) => {
    const updatedLinks = socialLinks.filter((_, i) => i !== index);
    setSocialLinks(updatedLinks);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Artisan Profile</h1>

      <div className="flex flex-col items-center space-y-6">
        <Avatar profileImage={profileImage} handleImageChange={handleImageChange} />
        {!isEditing ? (
          <div>
            <h2 className="text-2xl font-semibold text-gray-700">{name}</h2>
            <Bio bio={bio} isEditing={isEditing} setBio={setBio} />
            <SocialLinks
              socialLinks={socialLinks}
              addSocialLink={addSocialLink}
              updateSocialLink={updateSocialLink}
              removeSocialLink={removeSocialLink}
            />
            <button onClick={() => setIsEditing(true)} className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-500 transition">Edit Profile</button>
          </div>
        ) : (
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
            <label className="block text-left text-gray-600">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mt-1"
            />
            <label className="block text-left text-gray-600 mt-4">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mt-1"
            />
            <SocialLinks
              socialLinks={socialLinks}
              addSocialLink={addSocialLink}
              updateSocialLink={updateSocialLink}
              removeSocialLink={removeSocialLink}
            />
            <div className="mt-4 flex gap-2">
              <button onClick={handleSaveProfile} className="w-full bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-500 transition">Save</button>
              <button onClick={() => setIsEditing(false)} className="w-full bg-gray-400 text-white px-5 py-2 rounded-lg shadow hover:bg-gray-500 transition">Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

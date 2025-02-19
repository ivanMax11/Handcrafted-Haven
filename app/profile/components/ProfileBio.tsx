"use client";
import React, { useState } from 'react';

interface ProfileBioProps {
  bio: string;
  //location: string;
  //registeredAt: string;
  isEditable?: boolean;
  onBioChange?: (newBio: string) => void;
  onLocationChange?: (newLocation: string) => void;
}

const ProfileBio: React.FC<ProfileBioProps> = ({
  bio,
  //location,
  //registeredAt,
  isEditable = false,
  onBioChange,
  onLocationChange,
}) => {
  const [editingBio, setEditingBio] = useState(false);
  const [newBio, setNewBio] = useState(bio);
  const [editingLocation, setEditingLocation] = useState(false);
  const [newLocation, setNewLocation] = useState(location);

  const handleBioChange = () => {
    if (onBioChange) onBioChange(newBio);
    setEditingBio(false);
  };

  // const handleLocationChange = () => {
  //   if (onLocationChange) onLocationChange(newLocation);
  //   setEditingLocation(false);
  // };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">Bio</h2>
      {editingBio ? (
        <div className="mt-2">
          <textarea
            value={newBio}
            onChange={(e) => setNewBio(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          <button
            onClick={handleBioChange}
            className="mt-2 px-4 py-1 bg-blue-500 text-white rounded-md"
          >
            Save
          </button>
        </div>
      ) : (
        <p className="mt-2 text-gray-700">{bio}</p>
      )}

      {/* <h3 className="mt-4 text-lg font-semibold">Location</h3>
      {editingLocation ? (
        <div className="mt-2">
          <input
            type="text"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          <button
            onClick={handleLocationChange}
            className="mt-2 px-4 py-1 bg-blue-500 text-white rounded-md"
          >
            Save
          </button>
        </div>
      ) : (
      <p className="mt-2 text-gray-700">{location}</p> */}

      {/* <h4 className="mt-4 text-sm text-gray-500">Registered since: {registeredAt}</h4> */}

      {isEditable && (
        <div className="mt-4 flex space-x-4">
          <button
            onClick={() => setEditingBio(!editingBio)}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            {editingBio ? 'Cancel' : 'Edit Bio'}
          </button>
          <button
            onClick={() => setEditingLocation(!editingLocation)}
            className="px-4 py-2 bg-yellow-500 text-white rounded-md"
          >
            {editingLocation ? 'Cancel' : 'Editar Location'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileBio;

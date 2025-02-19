'use client'

import { useState } from 'react'

const EditProfileForm = () => {
  const [name, setName] = useState('John Doe')
  const [bio, setBio] = useState('I am a Technolgy and Software Development passionate.')
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ name, bio }) 
    // here can send the data on backend to save
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Edit Profile</h3>

      {/* Name */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Name</label>
        <input
          type="text"
          className="w-full border p-2 rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Bio */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Bio</label>
        <textarea
          className="w-full border p-2 rounded-md"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-full">
        Save changes
      </button>
    </form>
  )
}

export default EditProfileForm

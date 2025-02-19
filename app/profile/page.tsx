'use client';

import React, { useState, useEffect } from 'react';
import ProfileAvatar from './components/ProfileAvatar';
import ProfileBio from './components/ProfileBio';
import ProfileListings from './components/ProfileListings';
import ProfileSocialLinks from './components/ProfileSocialLinks';
import ProfileHero from './components/ProfileHero';
import ProfileReviews from './components/ProfileReviews';

const SellerProfilePage = () => {
  const [user, setUser] = useState(null);  // State for authenticated user
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>No authenticated user</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      {/* Hero Section */}
      <ProfileHero />

      {/* Profile Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Seller Profile</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            {/* Profile Avatar with image change option */}
            <ProfileAvatar
              name={user.name || 'Unknown User'}
              imageUrl={user.avatar || 'path_to_default_image.jpg'}
            />
          </div>
          <div>
            {/* Profile Bio */}
            <ProfileBio
              bio={user.bio || 'No bio available'}
              location={user.location || 'Unknown location'}
              registeredAt={user.createdAt || 'Unknown registration date'}
            />
          </div>
        </div>
      </section>

      {/* Seller Listings */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Seller Products</h2>
        <ProfileListings />
      </section>

      {/* Social Links */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Social Links</h2>
        <ProfileSocialLinks links={user.socialLinks || []} />
      </section>

      {/* Seller Reviews */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Reviews and Feedback</h2>
        <ProfileReviews />
      </section>
    </div>
  );
};

export default SellerProfilePage;

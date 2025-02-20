'use client';

import React, { useState, useEffect } from 'react';
import ProfileAvatar from './components/ProfileAvatar';
import ProfileBio from './components/ProfileBio';
import ProfileListings from './components/ProfileListings';
import ProfileSocialLinks from './components/ProfileSocialLinks';
import ProfileHero from './components/ProfileHero';
import ProfileReviews from './components/ProfileReviews';
import { User } from 'next-auth';
import Footer from "../../app/ui/home/footer";
import Header from "../../app/ui/home/header";
import { roboto } from "../../app/ui/fonts";
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const SellerProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

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
    <div className={`${roboto.className} font-roboto bg-gray-50 min-h-screen`}> {/* Add a light background */}
      <div className="max-w-8xl mx-auto p-6 space-y-12"> {/* Increase max-width */}
        <section>
          <Header />
        </section>
        {/* Hero Section */}
        <ProfileHero />

        {/* Profile Section */}
        <section className="bg-white rounded-lg shadow p-6"> {/* Add a white background and shadow */}
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Seller Profile</h2> {/* Add a bottom border */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <ProfileAvatar
                name={user.name || 'Unknown User'}
                imageUrl={user.avatar || 'path_to_default_image.jpg'}
              />
            </div>
            <div>
              <ProfileBio
                bio={user.bio || 'No bio available'}
              />
            </div>
          </div>
        </section>

        {/* Add Product Button (Conditional) */}
        {session?.user && (
          <div className="flex justify-center mt-8">
            <Link href="/shop/products/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add Products to my List
            </Link>
          </div>
        )}

        {/* Seller Listings */}
        <section className="bg-white rounded-lg shadow p-6"> {/* Add white background and shadow */}
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Seller Products</h2> {/* Add bottom border */}
          <ProfileListings />
        </section>

        <section>
          <Footer />
        </section>

      </div>
    </div>
  );
};

export default SellerProfilePage;
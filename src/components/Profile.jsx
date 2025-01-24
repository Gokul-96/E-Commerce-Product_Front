import React from 'react';
import { useAuth } from '../context/AuthContext';

function Profile() {
  const { userProfile } = useAuth();  // Use the userProfile from context

  // Log userProfile to check its structure
  console.log(userProfile);  

  // Handle case when userProfile is undefined or not yet set
  if (!userProfile) {
    return <div>Loading...</div>;  // Show a loading message if userProfile is not available yet
  }

  return (
    <div className="profile">
      <p>Welcome, <span className="username">{userProfile.username}</span>!</p>
    </div>
  );
}

export default Profile;


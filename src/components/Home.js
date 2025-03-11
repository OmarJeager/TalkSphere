// src/components/Home.js
import React, { useState } from 'react';
import { getAuth, updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { auth } from '../firebase';  // Import the Firebase initialization

const Home = () => {
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    try {
      // Update name
      if (name) {
        await updateProfile(user, { displayName: name });
      }

      // Update email
      if (email) {
        await updateEmail(user, email);
      }

      // Update password
      if (password) {
        await updatePassword(user, password);
      }

      // If there's an image, upload it to Firebase Storage
      if (image) {
        const storage = getStorage();
        const storageRef = ref(storage, `profilePictures/${user.uid}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Handle progress if needed
          },
          (error) => {
            console.error(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await updateProfile(user, { photoURL: downloadURL });
            console.log('Profile updated successfully!');
          }
        );
      } else {
        console.log('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      
      {/* Button to open the profile edit form */}
      <button onClick={() => setShowProfileForm(true)}>Edit Profile</button>

      {/* Profile Edit Form (Modal or Section) */}
      {showProfileForm && (
        <div className="profile-form">
          <h2>Edit Profile</h2>
          <form onSubmit={handleProfileUpdate}>
            <div>
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your new password"
              />
            </div>
            <div>
              <label>Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <button type="submit">Save Changes</button>
          </form>
          <button onClick={() => setShowProfileForm(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Home;

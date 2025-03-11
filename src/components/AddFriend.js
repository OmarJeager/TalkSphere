// src/components/AddFriend.js
import React, { useState } from 'react';
import { getDatabase, ref, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";

const AddFriend = () => {
  const [friendEmail, setFriendEmail] = useState('');
  const [message, setMessage] = useState('');
  const auth = getAuth();
  const db = getDatabase();

  const addFriend = () => {
    const userId = auth.currentUser.uid;
    const friendRef = ref(db, 'friends/' + userId);

    const newFriend = push(friendRef);
    set(newFriend, {
      email: friendEmail,
      status: 'pending', // You can change this depending on the friend request logic
    });

    setMessage('Friend request sent!');
  };

  return (
    <div>
      <input
        type="email"
        value={friendEmail}
        onChange={(e) => setFriendEmail(e.target.value)}
        placeholder="Friend's Email"
      />
      <button onClick={addFriend}>Add Friend</button>
      <p>{message}</p>
    </div>
  );
};

export default AddFriend;

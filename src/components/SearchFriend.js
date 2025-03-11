// src/components/SearchFriend.js
import React, { useState } from 'react';

const SearchFriend = () => {
  const [friendName, setFriendName] = useState('');

  const handleSearch = () => {
    // Add search functionality here
    console.log("Searching for friend:", friendName);
  };

  return (
    <div>
      <h1>Search for Friends</h1>
      <input
        type="text"
        placeholder="Enter friend's name"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchFriend;

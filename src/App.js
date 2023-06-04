import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Github User Info</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="button" type="submit">Get Info</button>
      </form>
      {userData && (
        <div className="info">
          <h2>{userData.name}</h2>
          <p>{userData.bio}</p>
          <p>Followers: {userData.followers}</p>
          <p>Following: {userData.following}</p>
          <img src={userData.avatar_url} alt="User Avatar" />
          <p>Public Repositories: {userData.public_repos}</p>
          <p>Location: {userData.location}</p>
        </div>
      )}
    </div>
  );
};

export default App;
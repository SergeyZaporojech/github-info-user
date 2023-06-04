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
          <div class="redZone">
            <img src={userData.avatar_url} alt="User Avatar" />
            </div>
            <h2>{userData.name}</h2>          
          <p>{userData.location}</p>
          <p>email: {userData.email}</p>
          <table>
            <tr>
              <th>{userData.followers}</th>
              <th>{userData.following}</th>
              <th>{userData.public_repos}</th>
            </tr>
            <tr>
              <td>Followers</td>
              <td>Following</td>
              <td>Public Repositories</td>
            </tr>
          </table>
        </div>
      )}
    </div>
  );
};

export default App;
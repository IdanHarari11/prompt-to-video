import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AvatarSelector({ setAvatarId }) {
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const response = await axios.get(`/api/avatars`);
        setAvatars(response?.data);
      } catch (error) {
        console.error('Error fetching avatars:', error);
      }
    };
    fetchAvatars();
  }, []);

  return (
    <select onChange={(e) => setAvatarId(e.target.value)}>
      <option value="">Select Avatar</option>
      {avatars?.avatars?.map((avatar) => (
        <option key={avatar.avatar_id} value={avatar.avatar_id}>
          {avatar.avatar_name}
        </option>
      ))}
    </select>
  );
}
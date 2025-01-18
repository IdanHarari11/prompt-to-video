import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function VoiceSelector({ setVoiceId }) {
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const response = await axios.get('/api/voices');
        setVoices(response?.data?.voices);
      } catch (error) {
        console.error('Error fetching voices:', error);
      }
    };
    fetchVoices();
  }, []);

  return (
    <select onChange={(e) => setVoiceId(e.target.value)}>
      <option value="">Select Voice</option>
      {voices?.map((voice) => (
        <option key={voice.voice_id} value={voice.voice_id}>
          {voice.name}
        </option>
      ))}
    </select>
  );
}
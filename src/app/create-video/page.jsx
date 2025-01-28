'use client';

import React, { useState } from 'react';
import axios from 'axios';
import AvatarSelector from '../../components/AvatarSelector';
import VoiceSelector from '../../components/VoiceSelector';
import { checkVideoGenerationStatus } from '../../../services/heygenService';

export default function CreateVideoPage() {
  const [prompt, setPrompt] = useState('');
  const [avatarId, setAvatarId] = useState('');
  const [voiceId, setVoiceId] = useState('');
  const [videoId, setVideoId] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoStatus, setVideoStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/heygen/videos', {
        prompt,
        avatarId,
        voiceId
      });
      setVideoId(response?.data?.data?.video_id);
    } catch (error) {
      console.error('Error creating video:', error);
    }
  };

  const handleCheckStatus = async () => {
    try {
      setVideoStatus(null);
      const status = await checkVideoGenerationStatus(videoId);
      setVideoStatus(status);

      if(status?.data?.status === 'completed' && !!status?.data?.video_url) {
        setVideoUrl(status?.data?.video_url);
      }
    } catch (error) {
      console.error('Error checking video status:', error);
    }
  };

  return (
    <div>
      <h1>Create Video</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <AvatarSelector setAvatarId={setAvatarId} />
        <VoiceSelector setVoiceId={setVoiceId} />
        <button type="submit">Create Video</button>
      </form>
      {videoUrl && <video src={videoUrl} controls />}
      {true && (
        <div>
          <button onClick={handleCheckStatus}>Check Video Status</button>
          {videoStatus && <p>Status: {videoStatus?.data?.status}</p>}
          {videoUrl && <p>Video URL: {videoStatus?.data?.video_url}</p>}
        </div>
      )}
    </div>
  );
}
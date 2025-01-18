'use client';

import React, { useState, useEffect } from 'react';
import { translateVideo, listSupportedLanguages } from '../../../services/heygenService';

export default function TranslateVideoPage() {
  const [videoUrl, setVideoUrl] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [translatedVideoUrl, setTranslatedVideoUrl] = useState('');
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await listSupportedLanguages();
        setLanguages(response.languages);
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };
    fetchLanguages();
  }, []);

  const handleTranslate = async (e) => {
    e.preventDefault();
    try {
      const response = await translateVideo(videoUrl, targetLanguage);
      setTranslatedVideoUrl(response.translated_video_url);
    } catch (error) {
      console.error('Error translating video:', error);
    }
  };

  return (
    <div>
      <h1>Translate Video</h1>
      <form onSubmit={handleTranslate}>
        <input
          type="text"
          placeholder="Video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        <select
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
        >
          <option value="">Select Language</option>
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.name}
            </option>
          ))}
        </select>
        <button type="submit">Translate Video</button>
      </form>
      {translatedVideoUrl && (
        <div>
          <h2>Translated Video</h2>
          <video src={translatedVideoUrl} controls />
        </div>
      )}
    </div>
  );
}
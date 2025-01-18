import axios from 'axios';

const heygenApiKey = process.env.HEYGEN_API_KEY;
const heygenBaseUrl = process.env.HEYGEN_BASE_URL;

export const createVideo = async (prompt, avatarId, voiceId) => {
  try {
    const url = `${heygenBaseUrl}/v2/video/generate`;
    console.log('Request URL:', url);
    const response = await axios.post(
      url,
      {
        video_inputs: [
          {
            character: {
              type: 'avatar',
              avatar_id: avatarId,
              avatar_style: 'normal',
            },
            voice: {
              type: 'text',
              input_text: prompt,
              voice_id: voiceId,
              speed: 1.0,
            },
          },
        ],
        dimension: {
          width: 1280,
          height: 720,
        },
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Api-Key': heygenApiKey,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating video:', error);
    throw error;
  }
};

export const checkVideoGenerationStatus = async (videoId) => {
  try {
    const url = `${heygenBaseUrl}/v1/video_status.get?video_id=${videoId}`;
    console.log('Request URL:', url);
    const response = await axios.get(url, {
      headers: {
        Accept: 'application/json',
        'X-Api-Key': heygenApiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error checking video generation status:', error);
    throw error;
  }
};

export const listSupportedLanguages = async () => {
  try {
    const url = `${heygenBaseUrl}/v2/video_translate/target_languages`;
    console.log('Request URL:', url);
    const response = await axios.get(url, {
      headers: {
        accept: 'application/json',
        'x-api-key': heygenApiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error listing supported languages:', error);
    throw error;
  }
};

export const translateVideo = async (videoUrl, targetLanguage) => {
  try {
    const url = `${heygenBaseUrl}/v2/video_translate`;
    console.log('Request URL:', url);
    const response = await axios.post(
      url,
      {
        video_url: videoUrl,
        output_language: targetLanguage,
        title: 'New Video',
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Api-Key': heygenApiKey,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error translating video:', error);
    throw error;
  }
};
import { NextResponse } from 'next/server';
import axios from 'axios';

const heygenApiKey = process.env.HEYGEN_API_KEY;
const heygenBaseUrl = process.env.HEYGEN_BASE_URL;

import { generateAvatarPhotos, createAvatarGroup, addMotionAndSound } from '../../route';
import { validateGenerateAvatarPhotosBody } from '../../../../utils/api-validations';

export default async function handler(req, res) {
  const { method, url } = req;

  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  let response;
  switch (true) {
    case url.includes('/generate-avatar-photos'):
      response = await generateAvatarPhotos(req);
      break;
    case url.includes('/create-avatar-group'):
      response = await createAvatarGroup(req);
      break;
    case url.includes('/add-motion-sound'):
      response = await addMotionAndSound(req);
      break;
    default:
      return res.status(404).end('Not Found');
  }

  res.status(response.status).json(response.body);
}

// Generate AI Avatars Photos
export async function generateAvatarPhotos(req) {
    try {
        validateGenerateAvatarPhotosBody(req.body);
        const response = await axios.post(
            `${heygenBaseUrl}/v2/photo_avatar/photo/generate`,
            req.body,
            {
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json',
                    'x-api-key': heygenApiKey,
                },
            }
        );
        return NextResponse.json(response.data);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function generateAvatarPhotos(req) {
    try {
        validateGenerateAvatarPhotosBody(req.body);
        const response = await axios.post(
            `${heygenBaseUrl}/v2/photo_avatar/photo/generate`,
            req.body,
            {
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json',
                    'x-api-key': heygenApiKey,
                },
            }
        );
        return NextResponse.json(response.data);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// Create and Train Photo Avatar Groups
export async function createAvatarGroup(req) {
  try {
    const response = await axios.post(
      `${heygenBaseUrl}/v2/photo_avatar/avatar_group/create`,
      req.body,
      {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'x-api-key': heygenApiKey,
        },
      }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Add Motion and Sound Effect to Photo Avatar
export async function addMotionAndSound(req) {
  try {
    const response = await axios.post(
      `${heygenBaseUrl}/v2/photo_avatar/avatar_group/create`,
      req.body,
      {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'x-api-key': heygenApiKey,
        },
      }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
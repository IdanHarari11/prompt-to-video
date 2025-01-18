import { NextResponse } from 'next/server';
import { createVideo } from '../../../../services/heygenService';

export async function POST(request) {
  const { prompt, avatarId, voiceId } = await request.json();
  try {
    const video = await createVideo(prompt, avatarId, voiceId);
    return NextResponse.json(video, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: `Failed to create video, error: ${error}` }, { status: 500 });
  }
}
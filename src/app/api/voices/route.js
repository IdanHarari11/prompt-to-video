import { NextResponse } from 'next/server';
import axios from 'axios';

const heygenApiKey = process.env.HEYGEN_API_KEY;
const heygenBaseUrl = process.env.HEYGEN_BASE_URL;

export async function GET() {
  try {
    const response = await axios.get(`${heygenBaseUrl}/v2/voices`, {
      headers: {
        'Accept': 'application/json',
        'X-Api-Key': `${heygenApiKey}`
      }
    });
    return NextResponse.json(response.data.data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `Failed to fetch voices, error: ${error}` }, { status: 500 });
  }
}
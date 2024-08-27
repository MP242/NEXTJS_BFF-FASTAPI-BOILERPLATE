'use server';

import { OpenAPI, readUserMe, UserPublic } from '@/client';
import { decryptToken, delay } from '@/lib/utils';
import { cookies } from 'next/headers';

OpenAPI.BASE = process.env.API_URL || '';

export default async function readUserMe_(): Promise<UserPublic | null> {
  const TOKEN = cookies().get('access_token');

  if (!TOKEN) {
    return null;
  }
  const decrypted_token = decryptToken(TOKEN.value);
  OpenAPI.TOKEN = decrypted_token;
  const response = await readUserMe();

  return response;
}

'use server';
import { loginAccessToken, OpenAPI } from '@/client';
import { cookies } from 'next/headers';
import { Body_login_login_access_token as AccessToken } from '@/client/types.gen';
import { delay, encryptToken } from '@/lib/utils';

OpenAPI.BASE = process.env.API_URL || '';

export default async function login_(data: AccessToken) {

  const response = await loginAccessToken({
    formData: data,
  });
  console.log(response.access_token);

  const crypted_token = encryptToken(response.access_token);
  const expires = new Date(Date.now() + 60 * 60 * 24 * 1000);

  cookies().set('access_token', crypted_token, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
  });

  return response;
}

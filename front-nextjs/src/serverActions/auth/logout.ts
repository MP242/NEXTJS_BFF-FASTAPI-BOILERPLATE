"use server";
import { cookies } from "next/headers";

export default async function logout_() {
  'use server';
  cookies().set('access_token', '', {
    expires: new Date(0),
  });
}
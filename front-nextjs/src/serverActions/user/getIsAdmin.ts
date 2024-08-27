"use server";

import { superUser } from "@/lib/utils";
import { cookies } from "next/headers";

export default async function getIsAdmin_(): Promise<boolean> {
    const token = cookies().get('access_token');
  console.log("token middlware : " ,token);
  if (!token) {
    return false;
  }
  const superuser = superUser(token.value);
  return superuser;
}
"use server";
import chalk from "chalk";
import { log } from "console";
import { cookies } from "next/headers";

export default async function getCookie(): Promise<boolean> {
  const value = cookies().get('access_token');
  log(chalk.red('getCookie ?', value));
  if (!value) {
    return false;
  }else{
    return true;
  }
}
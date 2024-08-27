import { ApiError } from "@/client/core/ApiError"
import { type ClassValue, clsx } from "clsx"
import CryptoJS from "crypto-js";
import AES from 'crypto-js/aes';
import { twMerge } from "tailwind-merge"
const SECRET_KEY = process.env.SECRET_KEY || '';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const emailPattern = {
  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  message: "Invalid email address",
}

export const namePattern = {
  value: /^[A-Za-z\s\u00C0-\u017F]{1,30}$/,
  message: "Invalid name",
}

export const passwordRules = (isRequired = true) => {
  const rules: any = {
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters",
    },
  }

  if (isRequired) {
    rules.required = "Password is required"
  }

  return rules
}

export const confirmPasswordRules = (
  getValues: () => any,
  isRequired = true,
) => {
  const rules: any = {
    validate: (value: string) => {
      const password = getValues().password || getValues().new_password
      return value === password ? true : "The passwords do not match"
    },
  }

  if (isRequired) {
    rules.required = "Password confirmation is required"
  }

  return rules
}

export const handleError = (err: ApiError, showToast: any) => {
  const errDetail = (err.body as any)?.detail
  let errorMessage = errDetail || "Something went wrong."
  if (Array.isArray(errDetail) && errDetail.length > 0) {
    errorMessage = errDetail[0].msg
  }
  showToast("Error", errorMessage, "error")
}

// Define an async function to retrieve the token from localStorage
export const getTokenFromLocalStorage = async (): Promise<string> => {
  // This will only work client-side as localStorage is not available server-side
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access_token') || '';
  }
  // Return an empty string if localStorage is not available (e.g., server-side)
  return '';
};

export const encryptToken = (token: string) => {
  const crypted_token = AES.encrypt(token, SECRET_KEY).toString();
  return crypted_token;
};

export const decryptToken = (crypted_token: string) => {
  const decrypted_token = AES.decrypt(crypted_token, SECRET_KEY).toString(CryptoJS.enc.Utf8);
  return decrypted_token;
};

export const superUser = (crypted_token: string): boolean => {
  const decrypted_token = decryptToken(crypted_token);
  const decodedToken = JSON.parse(Buffer.from(decrypted_token.split('.')[1], 'base64').toString())
  return decodedToken.is_superuser;
};

export const delay = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
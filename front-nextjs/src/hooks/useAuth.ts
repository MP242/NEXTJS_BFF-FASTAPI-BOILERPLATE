import { ApiError, registerUser, UserPublic, UserRegister } from '@/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { useState } from 'react';
import login_ from '@/serverActions/auth/login';
import logout_ from '@/serverActions/auth/logout';
import chalk from 'chalk';
import readUserMe_ from '@/serverActions/user/getUser';
import getIsAdmin_ from '@/serverActions/user/getIsAdmin';

const log = console.log;

const useAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  // const isAdmin = useQuery<boolean, Error>({
  //   queryKey: ['isAdmin'],
  //   queryFn: async() => getIsAdmin_(),
  //   enabled: isLoggedIn,
  // });

  // const { data: user } = useQuery<UserPublic | null, Error>({
  //   queryKey: ['currentUser'],
  //   queryFn: readUserMe_,
  //   enabled: isLoggedIn,
  // });
  const { data: user } = useQuery<UserPublic | null, Error>({
    queryKey: ['currentUser'],
    queryFn: async() => readUserMe_(),
    enabled: isLoggedIn,
  });

  const signUpMutation = useMutation({
    mutationFn: (data: UserRegister) => registerUser({ requestBody: data }),
    onSuccess: () => {
      router.push('/login');
      // showToast(
      //   "Account created.",
      //   "Your account has been created successfully.",
      //   "success",
      // )
    },
    onError: (err: ApiError) => {
      let errDetail = (err.body as any)?.detail;

      if (err instanceof AxiosError) {
        errDetail = err.message;
      }

      // showToast("Something went wrong.", errDetail, "error")
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const loginMutation = useMutation({
    // mutationFn: login,
    mutationFn: login_,
    onSuccess: async () => {
      setIsLoggedIn(true);
      router.push('/');
    },
    onError: (err: ApiError) => {
      let errDetail = (err.body as any)?.detail;

      if (err instanceof AxiosError) {
        errDetail = err.message;
      }

      if (Array.isArray(errDetail)) {
        errDetail = 'Something went wrong';
      }

      setError(errDetail);
      // showToast("Something went wrong.", errDetail, "error")
    },
  });

  const logout = async () => {
    logout_();
    router.push('/login');
    setIsLoggedIn(false);
    log(chalk.red('logout'));
  };

  return {
    signUpMutation,
    loginMutation,
    logout,
    user,
    // isAdmin,
    // isLoading,
    error,
    resetError: () => setError(null),
  };
};

export default useAuth;

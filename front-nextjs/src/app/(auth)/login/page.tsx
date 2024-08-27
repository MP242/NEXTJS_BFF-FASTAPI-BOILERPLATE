'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Body_login_login_access_token as AccessToken } from '@/client/types.gen';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Password } from '@/components/ui/passwordInput';
import { toast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { emailPattern } from '@/lib/utils';
import useAuth from '@/hooks/useAuth';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ApiError } from '@/client';
import { AxiosError } from 'axios';
import login_ from '@/serverActions/auth/login';
import Loader from '@/components/loader';

// const login = async (data: AccessToken) => {
//   // const response = await fetch('api/login', {
//   //   method: 'POST',
//   //   headers: {
//   //     'Content-Type': 'application/json',
//   //   },
//   //   body: JSON.stringify(data),
//   // });

//   // if (!response.ok) {
//   //   throw new Error('Login failed');
//   // }

//   const response = await login_(data);

//   // return response.json();
//   return response;
// };

export default function Login() {
  const router = useRouter();
  const { loginMutation, error, resetError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AccessToken>({
    mode: 'onBlur',
    criteriaMode: 'all',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<AccessToken> = async (data) => {
    if (isSubmitting) return;

    try {
      await loginMutation.mutateAsync(data);
    } catch (err) {
      toast({ title: 'Something went wrong.', description: error, variant: 'destructive' });
    }
  };

  return (
    <section className="w-full h-screen flex items-center justify-center">
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="mx-auto max-w-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>Enter your email and password to login to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Email"
                  type="email"
                  {...register('username', { required: 'Email is required', pattern: emailPattern })}
                  // isInvalid={!!errors.username || !!error}
                />
                {errors.username && <span className="text-red-500">{errors.username.message}</span>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Password
                  id="password"
                  placeholder="*********"
                  {...register('password', { required: 'Password is required' })}
                />
                {errors.password && <span className="text-red-500">{errors.password.message}</span>}
              </div>
              <Button
                type="submit"
                className={`w-full ${isSubmitting ? 'cursor-not-allowed bg-primary' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader /> : 'Login'}
              </Button>
              <Link href="/register">
                <div className="text-sm text-[#888] text-center mt-5 transition duration-150 ease hover:text-white">
                  Don&apos;t have an account?
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </section>
  );
}

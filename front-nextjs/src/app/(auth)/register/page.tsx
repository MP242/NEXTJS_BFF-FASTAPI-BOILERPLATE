'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button/button';
import { useForm, SubmitHandler } from 'react-hook-form';
import useAuth from '@/hooks/useAuth';
import { UserRegister } from '@/client';
import { emailPattern } from '@/lib/utils';
import { Password } from '@/components/ui/passwordInput';

interface UserRegisterForm extends UserRegister {
  confirm_password: string;
}

export default function Register() {
  const { signUpMutation } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<UserRegisterForm>({
    mode: 'onBlur',
    criteriaMode: 'all',
    defaultValues: {
      email: '',
      full_name: '',
      password: '',
      confirm_password: '',
    },
  });

  const password = watch('password');

  const onSubmit: SubmitHandler<UserRegisterForm> = (data) => {
    const { confirm_password, ...userData } = data;
    signUpMutation.mutate(userData);
  };

  return (
    <section className="w-full h-screen flex items-center justify-center">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>Create a new account to get started with our platform.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                minLength={3}
                {...register('full_name', { required: 'Full Name is required' })}
                placeholder="Full Name"
                type="text"
              />
              {errors.full_name && <span className="text-red-500">{errors.full_name.message}</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: emailPattern,
                })}
                placeholder="Email"
                type="email"
              />
              {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Password
                id="password"
                type="password"
                placeholder="*********"
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Confirme password</Label>
              <Password
                id="confirm_password"
                type="password"
                {...register('confirm_password', {
                  required: 'Please confirm your password',
                  validate: (value) => value === password || 'Passwords do not match',
                })}
                placeholder="*********"
              />
              {errors.confirm_password && <span className="text-red-500">{errors.confirm_password.message}</span>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Register
            </Button>
          </CardFooter>
        </form>
        <Link href="/login">
          <div className="text-sm text-[#888] w-full text-center transition duration-150 ease hover:text-foreground pb-5">
            Already have an account?
          </div>
        </Link>
      </Card>
    </section>
  );
}

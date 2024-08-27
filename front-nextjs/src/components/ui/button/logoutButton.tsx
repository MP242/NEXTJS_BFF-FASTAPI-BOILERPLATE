'use client';
import React from 'react';
import { EyeClosedIcon } from '@radix-ui/react-icons';
import { Button } from './button';
import logout_ from '@/serverActions/auth/logout';
import chalk from 'chalk';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';

const log = console.log;

export default function LogoutButton() {
  const router = useRouter();
  const { logout } = useAuth();
  // const logout = async () => {
  //   logout_();
  //   router.push('/login');
  //   log(chalk.red('logout'));
  // };

  return (
    <Button variant={'destructive'} size={'default'} onClick={logout}>
      <span className="flex gap-2">
        <EyeClosedIcon /> Logout
      </span>
    </Button>
  );
}

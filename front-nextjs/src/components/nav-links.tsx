'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ModeToggle } from './theme/modeToggle';

export function NavLinks() {
  const pathname = usePathname();

  const noSidebarPaths = ['/login', '/register'];

  // Si la route actuelle est dans la liste, ne rien rendre
  if (noSidebarPaths.includes(pathname)) {
    return null;
  }

  return (
    <div className="flex flex-row gap-2 items-center justify-center w-full h-16 border-b px-5">
      <nav className="flex flex-row gap-2 items-center justify-center flex-1">
        <Link className={`link ${pathname === '/' ? 'active text-blue-600' : ''}`} href="/">
          Home
        </Link>

        <Link className={`link ${pathname === '/about' ? 'active text-blue-600' : ''}`} href="/login">
          Login
        </Link>
        <Link className={`link ${pathname === '/about' ? 'active text-blue-600' : ''}`} href="/register">
          Register
        </Link>
        <Link className={`link ${pathname === '/about' ? 'active text-blue-600' : ''}`} href="/test">
          Admin test
        </Link>
      </nav>
      <ModeToggle />
    </div>
  );
}

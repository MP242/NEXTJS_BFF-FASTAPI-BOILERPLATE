'use client';
import { PiChatCircleTextBold, PiVirtualRealityBold, PiDatabaseBold } from 'react-icons/pi';
import { useParams, usePathname } from 'next/navigation';
import { TbSettings } from 'react-icons/tb';
import Link from 'next/link';
import React from 'react';

function Sidebar() {
  const pathname = usePathname();
  const params = useParams();
  const pathParts = pathname.split('/');
  const currentRoute = pathParts[1];

  const noSidebarPaths = ['/login', '/register'];

  // Si la route actuelle est dans la liste, ne rien rendre
  if (noSidebarPaths.includes(pathname)) {
    return null;
  }

  return (
    <div className="flex border-r h-screen">
      <div className="bg-background w-16 flex flex-col justify-between">
        <div className="flex flex-col gap-6 justify-start items-center">
          <Link href="/" className="hover:cursor-pointer w-full flex justify-center items-center border-b h-16">
            <div className="rounded-full bg-primary-foreground flex justify-center items-center size-10">
              {/* <img src="Logo.svg" /> */}
              <span>yo</span>
            </div>
          </Link>
          <div className="flex flex-col gap-6 justify-start items-center">
            <Link
              href="/"
              className={`transition hover:-rotate-[25deg] ease-in-out duration-300 hover:text-gray-300 hover:cursor-pointer ${
                currentRoute === 'chatbot' ? 'text-white' : 'text-gray-600'
              }`}
            >
              <PiChatCircleTextBold size={24} />
            </Link>
            <Link
              href="/"
              className={`transition hover:-skew-y-12 ease-in-out duration-300 hover:text-gray-300 hover:cursor-pointer ${
                currentRoute === 'store' ? 'text-white' : 'text-gray-600'
              }`}
            >
              <PiDatabaseBold size={24} />
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-6 justify-start items-center p-5">
          <div className="flex flex-col gap-10 justify-start items-center">
            <Link
              href="/"
              className={`transition hover:rotate-90 ease-in-out duration-300 hover:text-gray-300 hover:cursor-pointer ${
                currentRoute === 'settings' ? 'text-white' : 'text-gray-600'
              }`}
            >
              <TbSettings size={24} />
            </Link>
            <div className="rounded-full bg-white size-10 relative">
              <div className="absolute -bottom-[2px] -right-[2px] size-4 rounded-full border-4 border-neutral-800 bg-emerald-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

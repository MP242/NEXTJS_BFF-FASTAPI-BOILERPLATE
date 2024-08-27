import React from 'react';
import Loader from '@/components/loader';

export default function Loading() {
  return (
    <div className="h-full w-full flex justify-center items-center no-border relative">
      <Loader />
    </div>
  );
}

import React from 'react';

export default function Loader() {
  return (
    <div className="flex-col gap-4 w-full flex items-center justify-center">
      <div className="w-6 h-6 border border-transparent text-primary text-4xl animate-spin flex items-center justify-center border-t-secondary rounded-full">
        <div className="w-4 h-4 border border-transparent text-primary-foreground text-2xl animate-spin flex items-center justify-center border-t-primary-foreground rounded-full"></div>
      </div>
    </div>
  );
}

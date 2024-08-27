import * as React from 'react';

import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { InputProps } from './input';
import { cn } from '@/lib/utils';

export type SearchProps = React.InputHTMLAttributes<HTMLInputElement>;

const Search = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn(
        'flex h-10 items-center rounded-md border border-input pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2',
        className
      )}
    >
      <MagnifyingGlassIcon className="h-[16px] w-[16px]" />
      <input
        {...props}
        type="search"
        ref={ref}
        className={cn(
          'flex h-9 w-full rounded-md  bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none bled:cursor-not-allowed disabled:opacity-50',
          className
        )}
      />
    </div>
  );
});

Search.displayName = 'Search';

export { Search };

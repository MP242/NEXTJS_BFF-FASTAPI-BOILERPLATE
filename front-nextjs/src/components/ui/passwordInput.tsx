import * as React from 'react';
import { EyeOpenIcon, EyeNoneIcon } from '@radix-ui/react-icons';
import { InputProps } from './input';
import { cn } from '@/lib/utils';

export type PasswordProps = React.InputHTMLAttributes<HTMLInputElement>;

const Password = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div
      className={cn(
        'flex h-10 items-center rounded-md border border-input pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2',
        className
      )}
    >
      <input
        {...props}
        type={showPassword ? 'text' : 'password'}
        ref={ref}
        className={cn(
          'flex h-9 w-full rounded-md bg-transparent pr-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none bled:cursor-not-allowed disabled:opacity-50',
          className
        )}
      />
      <button
        type="button"
        onClick={handleTogglePassword}
        className="mx-2 " // Optionnel, pour ajouter un espacement autour de l'icône
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? <EyeOpenIcon className="h-[16px] w-[16px]" /> : <EyeNoneIcon className="h-[16px] w-[16px]" />}
      </button>
    </div>
  );
});

Password.displayName = 'Password';

export { Password };

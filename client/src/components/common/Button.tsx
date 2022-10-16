import clsx from 'clsx';
import Link from 'next/link';
import * as React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode | React.ReactNode[];
  difficulty?: string;
  href?: string;
}

function getClassName({ className }: { className?: string }) {
  return clsx(
    'group relative inline-flex font-medium opacity-100 disabled:opacity-50 transition',
    className,
  );
}

function ButtonInner({
  children,
  variant,
  difficulty,
  size = 'large',
}: Pick<ButtonProps, 'children' | 'variant' | 'size' | 'difficulty'>) {
  return (
    <>
      <div
        className={clsx(
          'focus-ring absolute inset-0 transform rounded-full opacity-100 transition disabled:opacity-50',
          {
            'border-secondary bg-primary border   group-hover:border-[#fcd435]':
              variant === 'secondary' || variant === 'danger',
            danger: variant === 'danger',
            'bg-inverse': variant === 'primary',
            'bg-[#02c07633]': difficulty === 'Beginner',
            'bg-[#F0b90b33]': difficulty === 'Intermediate',
            'bg-[#D9304E33]': difficulty === 'Advanced',
          },
        )}
      />

      <div
        className={clsx(
          'relative flex h-full w-full items-center justify-center whitespace-nowrap',
          {
            'text-primary': variant === 'secondary',
            'text-inverse': variant === 'primary',
            'text-red-500': variant === 'danger',
            'space-x-5 px-11 py-6': size === 'large',
            'space-x-3 px-8 py-4': size === 'medium',
            'space-x-1 px-3 py-1 text-sm': size === 'small',
          },
        )}>
        {children}
      </div>
    </>
  );
}

function Button({
  children,
  variant = 'primary',
  size = 'large',
  difficulty,
  className,
  ...buttonProps
}: ButtonProps & JSX.IntrinsicElements['button']) {
  return (
    <button {...buttonProps} className={getClassName({ className })}>
      <ButtonInner variant={variant} size={size} difficulty={difficulty}>
        {children}
      </ButtonInner>
    </button>
  );
}

function LinkButton({
  children,
  variant = 'primary',
  size = 'large',
  difficulty,
  className,
  href,
  ...buttonProps
}: ButtonProps & JSX.IntrinsicElements['button']) {
  return (
    <Link href={href ? href : '/'}>
      <button {...buttonProps} className={getClassName({ className })}>
        <ButtonInner variant={variant} size={size} difficulty={difficulty}>
          {children}
        </ButtonInner>
      </button>
    </Link>
  );
}

export { Button, LinkButton };

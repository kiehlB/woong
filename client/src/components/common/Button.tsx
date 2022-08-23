import clsx from 'clsx';
import * as React from 'react';
import Dot from './dot';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode | React.ReactNode[];
  selected?: any;
  setClick?: any;
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
  selected,
  setClick,
  size = 'large',
}: Pick<ButtonProps, 'children' | 'variant' | 'size' | 'selected' | 'setClick'>) {
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
            'bg-slate-600': selected == true,
          },
        )}
      />

      <div
        onClick={() => (setClick ? setClick(!selected) : '')}
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
  className,
  selected,
  setClick,
  ...buttonProps
}: ButtonProps & JSX.IntrinsicElements['button']) {
  return (
    <button {...buttonProps} className={getClassName({ className })}>
      <ButtonInner variant={variant} size={size} selected={selected} setClick={setClick}>
        {children}
      </ButtonInner>
    </button>
  );
}

function ClickableButton({
  className,
  underlined,
  ...buttonProps
}: { underlined?: boolean } & JSX.IntrinsicElements['button']) {
  return (
    <button
      {...buttonProps}
      className={clsx(
        className,
        underlined ? 'underlined focus:outline-none whitespace-nowrap' : 'underline',
        'text-primary inline-block',
      )}
    />
  );
}

function LinkButton({
  className,
  underlined,
  ...buttonProps
}: { underlined?: boolean } & JSX.IntrinsicElements['button']) {
  return (
    <button
      {...buttonProps}
      className={clsx(
        className,
        underlined ? 'underlined focus:outline-none whitespace-nowrap' : 'underline',
        'text-primary inline-block',
      )}
    />
  );
}

export { Button, LinkButton };

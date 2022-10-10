import clsx from 'clsx';
import * as React from 'react';

interface LayoutSectionProps {
  children: React.ReactNode;
  cn?: string;
}

function LayoutSection({ children, cn }: LayoutSectionProps) {
  return <section className={`max-w-6xl mx-auto w-full ${cn}`}>{children}</section>;
}

export { LayoutSection };

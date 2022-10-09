import clsx from 'clsx';
import * as React from 'react';

interface LayoutSectionProps {
  children: React.ReactNode;
}

function LayoutSection({ children }: LayoutSectionProps) {
  return <section className="max-w-6xl mx-auto w-full">{children}</section>;
}

export { LayoutSection };

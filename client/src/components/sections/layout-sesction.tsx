import clsx from 'clsx';
import * as React from 'react';

interface LayoutSectionProps {
  children: React.ReactNode;
}

function LayoutSection({ children }: LayoutSectionProps) {
  return <section className="w-[71rem] mx-auto mxl:w-[80%]">{children}</section>;
}

export { LayoutSection };

import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}
export default function Container({ children }: ContainerProps) {
  return (
    <div className="p-6 h-screen w-screen overflow-scroll">{children}</div>
  );
}

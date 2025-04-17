import './globals.css';
import Navbar from '@/components/Navbar';
import React, { ReactNode } from 'react';

interface PageProps {
  children: ReactNode;
}

const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <div>
      <>
      <Navbar />
      {children}
      </>
    </div>
  );
};

export default Page;
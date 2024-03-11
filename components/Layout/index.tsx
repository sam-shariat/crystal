import Header from './Header';
import Footer from './Footer';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const { pathname } = useRouter();
  return (
    <>
    
     {!pathname.includes('nftAddress') && !pathname.includes('auth') && <Header />}
      {children}
     {/* {!pathname.includes('nftAddress') && !pathname.includes('auth') && <Footer />} */}

      
    </>
  );
};

export default Layout;

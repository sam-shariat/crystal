import Header from './Header';
import Footer from './Footer';
import { useAtom } from 'jotai';
import { walletAtom } from 'core/atoms';
import { initVenomConnect } from '../venomConnect/configure';
import React, { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const [venomConnect, setVenomConnect] = useAtom(walletAtom);
  const init = async () => {
    const _venomConnect = await initVenomConnect();
    setVenomConnect(_venomConnect);
  };
  useEffect(() => {
    if(!venomConnect) init();
  },[]);
  return (
    <>
      <Header/>
      {children}
      <Footer />
    </>
  );
};

export default Layout;

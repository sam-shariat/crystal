import {
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Text,
  Tooltip,
  useColorMode,
  useMediaQuery,
} from '@chakra-ui/react';
import { Metamask } from 'components/logos';
import { ethAtom } from 'core/atoms';
import { useAtom } from 'jotai';
import { RiFileCopy2Line } from 'react-icons/ri';
import React, { useEffect, useState } from 'react';
import { ConnectWallet, useAddress, useConnectionStatus } from '@thirdweb-dev/react';
import { FaEthereum } from 'react-icons/fa';
import { SITE_URL } from 'core/utils/constants';

export default function EthAddressInput() {
  const [eth, setEth] = useAtom(ethAtom);
  const [notMobile] = useMediaQuery('(min-width: 768px)');
  const { colorMode } = useColorMode();
  const [getAddress,setGetAddress] = useState(false)

  const ethAddressFromWallet = useAddress();

  useEffect(() => {
      setEth(String(ethAddressFromWallet));
  }, [getAddress]);

  const login = (t:string) => {
    //console.log('token : ',t);
    setGetAddress(true);
    setEth(String(ethAddressFromWallet));
  }

  return (
    <ConnectWallet
      theme={colorMode}
      btnTitle="Connect EVM Wallet"
      auth={{ loginOptional: false, onLogin: (t:string)=> login(t) }}
      style={{
        backgroundColor: colorMode === 'light' ? 'var(--white)' : 'var(--dark)',
        color: colorMode === 'dark' ? 'white' : 'black',
        border: '1px solid #77777750',
        borderRadius: 8,
        display: 'flex',
        height:'68px',
        minWidth: '100%',
        position: 'relative',
      }}
      welcomeScreen={{
        img: {
          src: `${SITE_URL}/logos/vidicon.png`,
          width: 150,
          height: 150,
        },
        title: 'One Link To Showcase All Your Assets',
      }}
      modalSize={notMobile ? 'wide' : 'compact'}
    />
  );
}

import {
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Text,
  Tooltip,
  useMediaQuery,
} from '@chakra-ui/react';
import { Metamask } from 'components/logos';
import { ethAtom } from 'core/atoms';
import { useAtom } from 'jotai';
import { RiFileCopy2Line } from 'react-icons/ri';
import React, { useEffect, useState } from 'react';
import {
    useAddress,
    useConnect as useThirdWebConnect,
    metamaskWallet,
  } from '@thirdweb-dev/react';
import { FaEthereum } from 'react-icons/fa';

const metamaskConfig = metamaskWallet();

export default function EthAddressInput() {
  const [eth, setEth] = useAtom(ethAtom);
  const [notMobile] = useMediaQuery('(min-width: 768px)');
  const [autoEth, setAutoEth] = useState(false);
  
  const ethAddressFromWallet = useAddress();
  const connectWithThirdweb = useThirdWebConnect();

  useEffect(() => {
    if (autoEth && ethAddressFromWallet) {
      setEth(String(ethAddressFromWallet));
      setAutoEth(false);
    }
  }, [autoEth, ethAddressFromWallet]);
  return (
    <InputGroup size="lg" minWidth="xs" borderColor="gray">
      <InputLeftAddon>
        <Flex gap={2}>
          <FaEthereum size={'28'}/>
          ETH
        </Flex>
      </InputLeftAddon>
      <Input
        placeholder={'Paste Your ETH Address'}
        value={eth}
        onChange={(e) => setEth(e.currentTarget.value)}
        pr={'92px'}
      />
      <InputRightElement gap={1} width={'92px'}>
        <Tooltip
          borderRadius={4}
          label={
            <Text p={2}>
              {ethAddressFromWallet ? 'Use Connected ETH Address' : 'Connect ETH Wallet'}
            </Text>
          }
          hasArrow
          color="white"
          bgColor={'black'}>
          <IconButton
            aria-label="connect eth wallet"
            onClick={async () => {
              if (ethAddressFromWallet) {
                setEth(ethAddressFromWallet);
              } else {
                await connectWithThirdweb(metamaskConfig);
                setAutoEth(true);
              }
            }}>
            <Metamask />
          </IconButton>
        </Tooltip>
        <Tooltip
          borderRadius={4}
          label={<Text p={2}>Paste</Text>}
          hasArrow
          color="white"
          bgColor={'black'}>
          <IconButton
            aria-label="paste eth address"
            onClick={() => navigator.clipboard.readText().then((text) => setEth(text))}>
            <RiFileCopy2Line />
          </IconButton>
        </Tooltip>
      </InputRightElement>
    </InputGroup>
  );
}

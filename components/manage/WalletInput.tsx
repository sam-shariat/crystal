import {
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { LinkIcon, Metamask } from 'components/logos';
import { useEffect, useState } from 'react';
import { RiFileCopy2Line } from 'react-icons/ri';
import { useAddress, useConnect as useThirdWebConnect, metamaskWallet } from '@thirdweb-dev/react';
import { useAtomValue } from 'jotai';
import { addressAtom, connectedAccountAtom } from 'core/atoms';

const metamaskConfig = metamaskWallet();

interface Props {
  title: string;
  value: string;
  setValue: Function;
  hideTitle?: boolean;
}

export default function WalletInput({ title, value, setValue, hideTitle = false }: Props) {
  const [autoEth, setAutoEth] = useState(false);
  const venomAddress = useAtomValue(connectedAccountAtom);
  const ethAddressFromWallet = useAddress();
  const connectWithThirdweb = useThirdWebConnect();

  useEffect(() => {
    if (autoEth && ethAddressFromWallet) {
    console.log('this')

      setValue(String(ethAddressFromWallet));
      setAutoEth(false);
    }
  }, [autoEth, ethAddressFromWallet]);

  return (
    <InputGroup size="lg" borderColor="gray" w={'100%'}>
      {!hideTitle && <InputLeftAddon height={'48px'}>
        <Flex gap={2}>
          <LinkIcon type={title.toLowerCase()} />
          {title}
        </Flex>
      </InputLeftAddon>}
      <Input
        size="lg"
        value={value}
        variant={'filled'}
        border={'1px solid gray'}
        placeholder={`Enter ${title} Wallet Address`}
        onChange={(e) => setValue(e.currentTarget.value)}
        pr={title !== 'Bitcoin' ? '96px' : '48px'}
        //onChange={(e) => setUrl(title.toLowerCase(),e.currentTarget.value)}
      />
      <InputRightElement gap={1} width={'-moz-fit-content'}>
        {title.includes('Venom') && (
          <Tooltip
            borderRadius={4}
            label={<Text p={2}>Use Connected Venom Address</Text>}
            hasArrow
            color="white"
            bgColor={'black'}>
            <IconButton
              aria-label="use venom wallet address"
              onClick={async () => setValue(venomAddress)}>
              <LinkIcon type='venom' color='var(--venom)'/>
            </IconButton>
          </Tooltip>
        )}
        {title.includes('Eth') && (
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
                  setValue(ethAddressFromWallet);
                } else {
                  await connectWithThirdweb(metamaskConfig);
                  setAutoEth(true);
                }
              }}>
              <Metamask />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip
          borderRadius={4}
          label={<Text p={2}>Paste</Text>}
          hasArrow
          color="white"
          bgColor={'black'}>
          <IconButton
            mr={1}
            aria-label={`paste-${title}-address`}
            onClick={() => navigator.clipboard.readText().then((text) => setValue(text))}>
            <RiFileCopy2Line />
          </IconButton>
        </Tooltip>
      </InputRightElement>
    </InputGroup>
  );
}

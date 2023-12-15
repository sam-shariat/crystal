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
import { btcAtom } from 'core/atoms';
import { useAtom } from 'jotai';
import { RiFileCopy2Line } from 'react-icons/ri';
import { FaBitcoin } from 'react-icons/fa';

export default function BtcAddressInput() {
  const [btc, setBtc] = useAtom(btcAtom);
  const [notMobile] = useMediaQuery('(min-width: 768px)');

  return (
    <InputGroup size="lg" minWidth="xs" borderColor="gray">
      <InputLeftAddon>
        <Flex gap={2}>
          <FaBitcoin size={'28'}/>
          BTC
        </Flex>
      </InputLeftAddon>
      <Input
        placeholder={'Paste Your BTC Address'}
        value={btc}
        onChange={(e) => setBtc(e.currentTarget.value)}
      />
      <InputRightElement>
        <Tooltip
          borderRadius={4}
          label={<Text p={2}>Paste</Text>}
          hasArrow
          color="white"
          bgColor={'black'}>
          <IconButton
            aria-label="paste btc address"
            onClick={() => navigator.clipboard.readText().then((text) => setBtc(text))}>
            <RiFileCopy2Line />
          </IconButton>
        </Tooltip>
      </InputRightElement>
    </InputGroup>
  );
}

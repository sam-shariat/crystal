import { Button, Link, Text, useColorMode, useMediaQuery } from '@chakra-ui/react';
import { VenomFoundation } from 'components/logos';
import { truncAddress } from 'core/utils';
import { VENOMSCAN_NFT } from 'core/utils/constants';

interface Props {
  venomAddress: string;
}

export default function VenomAddressButton({ venomAddress }: Props) {
  const [notMobile] = useMediaQuery('(min-width: 768px)');
  const { colorMode } = useColorMode();
  return (
    <Button
      variant="solid"
      size="lg"
      gap={2}
      as={Link}
      style={{textDecoration:'none'}}
      target="_blank"
      href={VENOMSCAN_NFT + venomAddress}
      backgroundColor={colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100'}
      minWidth={notMobile ? 'md' : 'xs'}>
      <VenomFoundation /><Text> Venom Address</Text>
      <Text color="var(--venom3)">
        {truncAddress(venomAddress)}
      </Text>
    </Button>
  );
}

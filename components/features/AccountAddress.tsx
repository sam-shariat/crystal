import {
    Text,
    useColorMode,
    Flex,
    Avatar,
  } from '@chakra-ui/react';
import { LinkIcon, VenomFoundation } from 'components/logos';
  
  interface Props {
    address: string;
    chain: string;
    size?: string[];
  }
  export default function AccountAddress({ address, chain , size }: Props) {
    const { colorMode } = useColorMode();
    return (
        <Flex gap={3} align={'center'} border={'1px solid #77777750'} rounded={'full'} bg={colorMode === 'light' ? 'white' : 'black'}>
        <Avatar color='white' bgGradient={'linear(to-r, var(--venom1), var(--bluevenom1))'} icon={<LinkIcon type={chain} color='#fff'/>} rounded={'full'} size={size}/>
          <Text
            fontWeight={'semibold'}
            textAlign={'left'}
            pr={5}
            cursor={'default'}
            fontSize={size}
            bgGradient={
              colorMode === 'light'
                ? 'linear(to-r, var(--venom2), var(--bluevenom2))'
                : 'linear(to-r, var(--venom0), var(--bluevenom0))'
            }
            bgClip="text">
              {address}
          </Text>
        {/* </Stack> */}
      </Flex>
    );
  }
  
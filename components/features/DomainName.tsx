import {
    Text,
    useColorMode,
    Flex,
    Avatar,
  } from '@chakra-ui/react';
import { LinkIcon } from 'components/logos';
  
  interface Props {
    name: string;
    avatar?: string;
    size?: 'md' | 'lg' | 'xl' | string[];
  }
  export default function DomainName({ name, avatar , size = 'lg'}: Props) {
    const { colorMode } = useColorMode();
    return (
        <Flex gap={3} align={'center'} border={'1px solid #77777750'} rounded={'full'} bg={colorMode === 'light' ? 'white' : 'black'}>
        <Avatar color='white' icon={<LinkIcon type='RiUserLine' size={22} color='#ffffff'/>} rounded={'full'} src={avatar} size={size}/>
          <Text
            fontWeight={'semibold'}
            textAlign={'left'}
            cursor={'default'}
            pr={5}
            fontSize={size}
            bgGradient={
              colorMode === 'light'
                ? 'linear(to-r, var(--venom2), var(--bluevenom2))'
                : 'linear(to-r, var(--venom0), var(--bluevenom0))'
            }
            bgClip="text">
              {name}
          </Text>
        {/* </Stack> */}
      </Flex>
    );
  }
  
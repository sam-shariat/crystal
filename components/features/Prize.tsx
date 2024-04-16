import {
    Text,
    useColorMode,
    Flex,
    Avatar,
    Badge,
    Box,
  } from '@chakra-ui/react';
import { LinkIcon } from 'components/logos';
  
  interface Props {
    name: string;
    icon: JSX.Element;
    number: number;
    value: string;
  }

  export default function Prize({ name, icon, number , value}: Props) {
    const { colorMode } = useColorMode();
    return (
        <Flex gap={6} px={3} pr={4} align={'center'} border={'1px solid #77777750'} rounded={'2xl'} bg={colorMode === 'light' ? 'whiteAlpha.800' : 'blackAlpha.800'} height={'120px'}>
          <Flex gap={3}  align={'center'} >
        <Text fontSize={['2xl','3xl','6xl']} opacity={0.4}>
          🎁
        </Text>
        <Text fontWeight={'bold'} fontSize={['3xl','6xl']}>
            {number}
        </Text>
        </Flex>
          <Text
            fontWeight={'semibold'}
            textAlign={'left'}
            display={'block'}
            maxW={'100%'}
            cursor={'default'}
            pr={5}
            flexGrow={1}
            fontSize={['md','lg','xl']}>
              {name}
          </Text>
        
          <Badge colorScheme='green' rounded={'lg'} p={[2,3,4]} justifyContent={'center'} alignItems={'center'}>{value}</Badge>

        {/* </Stack> */}
      </Flex>
    );
  }
  
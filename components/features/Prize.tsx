import {
    Text,
    useColorMode,
    Flex,
    Avatar,
  } from '@chakra-ui/react';
import { LinkIcon } from 'components/logos';
  
  interface Props {
    name: string;
    icon: JSX.Element;
    number: number;
  }

  export default function Prize({ name, icon, number}: Props) {
    const { colorMode } = useColorMode();
    return (
        <Flex gap={3} pl={3} align={'center'} border={'1px solid #77777750'} rounded={'2xl'} bg={colorMode === 'light' ? 'white' : 'black'} height={'100px'}>
          <Flex gap={3}  align={'center'} >
        {icon}
        <Text fontWeight={'bold'} fontSize={['2xl','3xl','6xl']}>
            {number}
        </Text>
        </Flex>
          <Text
            fontWeight={'semibold'}
            textAlign={'left'}
            display={'block'}
            maxW={'200px'}
            cursor={'default'}
            pr={5}
            fontSize={'lg'}>
              {name}
          </Text>
        {/* </Stack> */}
      </Flex>
    );
  }
  
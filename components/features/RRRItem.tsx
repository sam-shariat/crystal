import {
    Text,
    useColorMode,
    Flex,
    Avatar,
    Center,
  } from '@chakra-ui/react';
import ImageBox from 'components/claiming/ImageBox';
import { LinkIcon } from 'components/logos';
  
  interface Props {
    color: string;
    light: boolean;
  }
  export default function RRRItem({ color, light }: Props) {
    const { colorMode } = useColorMode();
    return (
        <Center gap={3} border={'none'} rounded={'md'} bg={color} minW={300} minH={160}>
            <LinkIcon type='RiQuestionFill' size={'60px'} color={light ? '#121212' : 'white'}/>
        </Center>
    );
  }
  
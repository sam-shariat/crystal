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
    image: string;
    
  }
  export default function RRRItem({ image }: Props) {
    const { colorMode } = useColorMode();
    return (
        <Center gap={3} border={'2px dashed'} rounded={'md'} minW={300} minH={160}>
            <ImageBox srcUrl={image} rounded='lg' />
        </Center>
    );
  }
  
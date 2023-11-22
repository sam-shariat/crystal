import { Text, Box, useColorMode, Center, Flex, Button, Collapse } from '@chakra-ui/react';

import { useState } from 'react';

interface Props {
  text: string;
  hoverText: string;
  icon: JSX.Element;
}
export default function TextIcon({ text, icon, hoverText }: Props) {
  const { colorMode } = useColorMode();
  const [hover, setHover] = useState(false);
  return (
    <Center
      key={`text-icon-${text}`}
      bg={colorMode === 'dark' ? hover ? 'blackAlpha.600' : 'blackAlpha.300' : hover ? 'white' : 'whiteAlpha.300'}
      flexDirection="column"
      transition={'all 1s ease'}
      borderRadius={16}
      borderWidth={1}
      cursor={'pointer'}
      borderColor={colorMode === 'dark' ? 'whiteAlpha.300' : 'gray'}
      minWidth={'xs'}
      minH={250}
      onMouseEnter={() => setHover(true)}
      onMouseMove={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <Center flexDirection="column" px={6} transition={'all 1s ease'}>
        {!hover && <Box my={4}>{icon}</Box>}
        <Text fontSize={['lg', 'lg', 'xl']} fontWeight="bold" my={1} align={'center'}>
          {text}
        </Text>
        <Collapse in={hover} animateOpacity transition={{enter: {duration: 0.3},exit: {duration: 0.3}}} >
          <Text fontSize={['lg', 'lg']} fontWeight="normal" my={1} align={'center'}>
            {hoverText}
          </Text>
        </Collapse>
        {/* <Text fontSize={'lg'} fontWeight='light'>
          {text}
        </Text> */}
      </Center>
    </Center>
  );
}

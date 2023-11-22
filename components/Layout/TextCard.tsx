import {
  Text,
  Box,
  useColorMode,
  Center,
  Flex,
  Button,
  LinkBox,
  LinkOverlay,
  useColorModeValue,
} from '@chakra-ui/react';

interface Props {
  header?: string;
  domain: string;
  text: string;
  icon?: JSX.Element;
  url?: string;
}
export default function TextCard({ header, domain, text, icon, url }: Props) {
  const { colorMode } = useColorMode();
  return (
    <Center
      key={header}
      bg={useColorModeValue('var(--lightGradient)', 'var(--darkGradient)')}
      flexDirection="column"
      rounded={'xl'}
      borderWidth={1}
      borderColor="grey"
      p={4}
      width={'100%'}
      minH={200}>
      {icon && <Box my={4}>{icon}</Box>}
      <Flex fontSize={'4xl'} fontWeight="bold" style={{ direction: 'ltr' }}>
        {header}
        <Text color={useColorModeValue('var(--venom)', 'var(--venom0)')}>{domain}</Text>
      </Flex>
      <Text fontSize={'2xl'}>
        {text}
      </Text>
    </Center>
  );
}

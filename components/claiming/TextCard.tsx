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
    <Flex
      key={header}
      bg={useColorModeValue('var(--lightGradient)', 'var(--dark)')}
      flexDirection="column"
      rounded={'xl'}
      justify={'center'}
      align={'center'}
      borderWidth={1}
      borderColor="grayAlpha.500"
      p={[4,6,8]}
      gap={2}
      width={'100%'}>
      {icon && <Box my={4}>{icon}</Box>}
      <Flex fontSize={['2xl','3xl','4xl']} fontWeight="bold">
        {header}
        <Text color={useColorModeValue('var(--venom)', 'var(--venom0)')}>{domain}</Text>
      </Flex>
      <Text fontSize={'2xl'} textAlign={'center'}>
        {text}
      </Text>
    </Flex>
  );
}

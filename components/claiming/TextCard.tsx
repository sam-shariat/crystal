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
      bg={useColorModeValue('blackAlpha.50', 'blackAlpha.200')}
      flexDirection="column"
      rounded={'xl'}
      justify={'center'}
      align={'center'}
      borderWidth={1}
      borderColor="grayAlpha.500"
      //boxShadow={'inset 0 0 8px var(--venom1)'}
      p={[4,6,8]}
      gap={2}
      width={'100%'}>
      {icon && <Box my={4}>{icon}</Box>}
      <Flex fontSize={['2xl','3xl','4xl']} fontWeight="bold">
        {header}
        <Text bgGradient={useColorModeValue('linear(to-r, var(--venom2), var(--bluevenom2))','linear(to-r, var(--venom0), var(--bluevenom0))')} bgClip='text'>{domain}</Text>
      </Flex>
      <Text fontSize={'2xl'} textAlign={'center'}>
        {text}
      </Text>
    </Flex>
  );
}

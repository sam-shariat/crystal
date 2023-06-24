import {
  Text,
  Box,
  useColorMode,
  Center,
  Button
} from '@chakra-ui/react';

interface Props {
  header: string;
  domain: string;
  text: string;
  icon: JSX.Element;
}
export default function TextCard({ header, domain, text, icon }: Props) {
    const {colorMode} = useColorMode();
  return (
    <Center as={Button} key={header} bg={colorMode === 'dark' ? 'var(--darkGradient)' : 'var(--lightGradient)'}  flexDirection="column" borderRadius={12} borderWidth={1} borderColor="grey" p={4} width={'100%'} minH={200}>
        <Box my={4}>{icon}</Box>
      <Text display={'flex'} fontSize={'xl'} fontWeight="bold">
        {header}<Text color="var(--venom1)">{domain}</Text>
      </Text>
      <Text fontSize={'lg'} fontWeight="light" my={1} color={'default'}>
        {text}
      </Text>
    </Center>
  );
}

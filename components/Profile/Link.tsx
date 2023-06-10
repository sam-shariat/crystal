import { Button, useColorMode, Text, Link as ChakraLink } from '@chakra-ui/react';

interface Props {
    title : string
    icon : React.Element
    url : string
}
export default function Link({title,icon,url}: Props) {
  const { colorMode } = useColorMode();

  return (
    <ChakraLink href={url} target="_blank" passHref>
      <Button size="lg" minWidth="xs" backgroundColor={colorMode === 'dark' ? 'whiteAlpha.100':'blackAlpha.100'}>
        {icon}
        <Text px={2}>{title}</Text>
      </Button>
    </ChakraLink>
  );
}

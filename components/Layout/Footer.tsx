import { Box, Container, Link, Text, useColorMode } from '@chakra-ui/react';
export default function Footer() {
  return (
    <Box as="footer" w="full" py={5} mt={10} backgroundColor={'blackAlpha.200'}>
      <Container maxW="container.md" display="flex" justifyContent="space-between">
        <Text>2023 Venom Blockchain Hackathon</Text>
        <Link id="venomid-app-github" href="https://github.com/samshariat/venomidapp">Github</Link>
      </Container>
    </Box>
  );
}

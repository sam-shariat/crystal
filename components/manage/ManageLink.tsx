import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Button,
  Flex,
  Input,
  useMediaQuery,
  useColorMode,
  Text,
  Stack,
  Badge,
} from '@chakra-ui/react';

interface Props {
  title: string;
  icon: JSX.Element;
  url: string;
  setUrl: any;
}
export default function ManageLink({ title, icon, url, setUrl }: Props) {
  const { colorMode } = useColorMode();
  const [ notMobile ] = useMediaQuery('(min-width: 769px)');

  return (
      <Accordion allowToggle allowMultiple={false} borderRadius={10} minWidth={notMobile ? 'md' : 'xs'} size="lg" backgroundColor={colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100'} display={'flex'} flexGrow={1}>
        <AccordionItem border={0} borderRadius={10} width={'100%'}>
          <AccordionButton minWidth={notMobile ? 'md' : 'xs'}>
            <Flex textAlign="left" width={notMobile ? '100%' : '100%'}>
            {icon}
              <Text px={3} fontWeight={'bold'} display={'flex'} flex={1}>
                {title}
              </Text>
              <AccordionIcon />
            </Flex>
          </AccordionButton>

          <AccordionPanel pb={4} minWidth="100%">
            <Stack>
            <Input my={2} value={url} placeholder={`Enter your ${title} url or leave empty`} onChange={(e)=> setUrl(e.currentTarget.value)}/>
            <Button disabled>Verify <Badge ml='2' colorScheme='red'>
        Soon
      </Badge> </Button>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
  );
}

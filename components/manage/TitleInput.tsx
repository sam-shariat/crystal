import {
  Text,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Tooltip,
  useMediaQuery,
  useDisclosure,
  Stack,
  Collapse,
  Accordion,
  AccordionItem,
  AccordionButton,
  Button,
  Flex,
  AccordionIcon,
  AccordionPanel,
  useColorMode,
  InputLeftElement,
} from '@chakra-ui/react';
import { subtitleAtom, titleAtom } from 'core/atoms';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
export default function TitleInput() {
  const [title, setTitle] = useAtom(titleAtom);
  const [subtitle, setSubtitle] = useAtom(subtitleAtom);
  const [notMobile] = useMediaQuery('(min-width: 992px)');
  const { colorMode } = useColorMode();

  return (
    <Accordion
      allowToggle
      allowMultiple={false}
      defaultIndex={[0]}
      className="titlee"
      borderRadius={10}
      width={'100%'}
      size="lg"
      backgroundColor={colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100'}
      display={'flex'}>
      <AccordionItem border={0} borderRadius={10} width={'100%'}>
        <AccordionButton
          minWidth={'100%'}
          as={Button}
          size="lg"
          _expanded={{ bgColor: 'blackAlpha.50' }}>
          <Flex gap={2} alignItems={'center'} textAlign="left" width={'100%'}>
            <Text fontWeight={'bold'} display={'flex'} flex={1}>
              Title & Subtitle
            </Text>
            <AccordionIcon />
          </Flex>
        </AccordionButton>

        <AccordionPanel py={4} minWidth="100%">
          <Stack gap={4}>
            <InputGroup size="lg" minWidth="xs" borderColor="gray" className="title">
              <InputLeftElement
                fontFamily={'poppins'}
                fontWeight={'bold'}
                fontSize={'20px'}
                w={'104px'}
                letterSpacing={4}>
                TITLE
              </InputLeftElement>
              <Input
                pl={'96px'}
                variant={'filled'}
                placeholder={'Enter Nickname'}
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
              />
            </InputGroup>
            <InputGroup size="lg" minWidth="xs" borderColor="gray" className="subtitle">
              <InputLeftElement
                fontFamily={'poppins'}
                fontWeight={'bold'}
                fontSize={'16px'}
                w={'104px'}
                letterSpacing={1}>
                Subtitle
              </InputLeftElement>
              <Input
                variant={'filled'}
                pl={'96px'}
                placeholder={'Enter Subtitle'}
                value={subtitle}
                onChange={(e) => setSubtitle(e.currentTarget.value)}
              />
            </InputGroup>
          </Stack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

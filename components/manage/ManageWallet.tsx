import {
    Box,
    IconButton,
    Accordion,
    AccordionItem,
    Tooltip,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    Button,
    Flex,
    Input,
    InputRightElement,
    InputGroup,
    useMediaQuery,
    useColorMode,
    Text,
    Stack,
    Badge,
  } from '@chakra-ui/react';
  import { SortableHandle } from 'react-sortable-hoc';
  import { MdOutlineDragIndicator } from 'react-icons/md';
  import { RiFileCopy2Line } from 'react-icons/ri';
  import React, { useEffect, useState } from 'react';
import { EXAMPLE_WALLETS } from 'core/utils/constants';
import { capFirstLetter } from 'core/utils';
  
  const DragHandle = SortableHandle(() => (
    <span>
      <MdOutlineDragIndicator size="22" />
    </span>
  ));
  
  interface Props {
    title: string;
    icon: JSX.Element;
    url: string;
    setUrl: any;
    removeUrl?: any;
    ind: number;
  }
  export default function ManageWallet({ title, icon, url, setUrl, removeUrl, ind }: Props) {
    const { colorMode } = useColorMode();
    const [notMobile] = useMediaQuery('(min-width: 800px)');
    const [txt, setTxt] = useState(url);
  
    return (
      <>
        <Accordion
          allowToggle
          allowMultiple={false}
          borderRadius={10}
          minWidth={'100%'}
          size="lg"
          backgroundColor={colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100'}
          display={'flex'}
          flexGrow={1}>
          <AccordionItem border={0} borderRadius={10} width={'100%'}>
            <AccordionButton minWidth={'100%'} as={Button} size='lg' _expanded={{bgColor: 'blackAlpha.50'}}>
              <Flex
                gap={2}
                alignItems={'center'}
                textAlign="left"
                width={'100%'}>
                <DragHandle />
                {icon}
                <Text fontWeight={'bold'} display={'flex'} flex={1}>
                  {title}
                </Text>
                <AccordionIcon />
              </Flex>
            </AccordionButton>
  
            <AccordionPanel pb={4} minWidth="100%">
              <Stack gap={2}>
                <InputGroup mt={2}>
                  <Input
                    size="lg"
                    value={txt}
                    placeholder={`Enter your ${title} Address`}
                    onChange={(e) => setTxt(e.currentTarget.value)}
                    //onChange={(e) => setUrl(title.toLowerCase(),e.currentTarget.value)}
                  />
                  <InputRightElement>
                    <Tooltip
                      borderRadius={4}
                      label={<Text p={2}>Paste</Text>}
                      hasArrow
                      color="white"
                      bgColor={'black'}>
                      <IconButton
                        aria-label="paste-url"
                        mt={2}
                        mr={2}
                        onClick={() => navigator.clipboard.readText().then((text) => setTxt(text))}>
                        <RiFileCopy2Line />
                      </IconButton>
                    </Tooltip>
                  </InputRightElement>
                </InputGroup>
                <Box pt={2}>
                  <Text>Example {capFirstLetter(title)} Address</Text>
                  <Text color={'gray'}>
                    {EXAMPLE_WALLETS[title.toLowerCase().replace(' ', '')]}
                  </Text>
                </Box>
  
                <Flex gap={2} width={'100%'}>
                  <Button
                    color="white"
                    bgColor="var(--venom1)"
                    isDisabled={txt === url}
                    onClick={() => setUrl(title.toLowerCase(), txt)}>
                    Save
                  </Button>
                  <Button onClick={() => removeUrl(ind)}>Remove</Button>
                </Flex>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </>
    );
  }
  
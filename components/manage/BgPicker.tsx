import {
  Button,
  Text,
  IconButton,
  SimpleGrid,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  useColorMode,
  Collapse,
  useDisclosure,
} from '@chakra-ui/react';
import React, { Suspense } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { bgColorAtom, lightModeAtom } from 'core/atoms';
import { RiCheckLine } from 'react-icons/ri';
import { BG_COLORS } from 'core/utils/constants';
import ColorPicker from 'react-best-gradient-color-picker';

export default function BgPicker() {
  const [bgColor, setBgColor] = useAtom(bgColorAtom);
  const setLightMode = useSetAtom(lightModeAtom);
  const lightMode = useColorMode().colorMode === 'light';
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Accordion
        allowToggle
        allowMultiple={false}
        borderBottomRadius={0}
        size="lg"
        display={'flex'}
        flexGrow={1}>
        <AccordionItem border={0} borderRadius={0} width={'100%'}>
          <AccordionButton
            as={Button}
            height={['44px', '52px']}
            _expanded={{ bgColor: lightMode ? BG_COLORS[4].color : BG_COLORS[2].color }}
            _hover={{ bgColor: lightMode ? BG_COLORS[4].color : BG_COLORS[2].color }}
            px={4}
            variant="solid"
            borderBottomRadius={0}
            width={'100%'}
            justifyContent="space-between">
            <Text fontSize={'lg'}>Background Color</Text>
            <IconButton size={'sm'} aria-label="bg-color-picker" bg={bgColor}></IconButton>
          </AccordionButton>
          <AccordionPanel py={4} bgColor={lightMode ? BG_COLORS[4].color : BG_COLORS[2].color} gap={4} display={'flex'} flexDir={'column'}>
            <SimpleGrid columns={[3]} gap={2}>
              {BG_COLORS.map((bg) => (
                <IconButton
                  height={['60px', '60px', '120px']}
                  aria-label="bg-color-picker"
                  bg={bg.color}
                  key={'bg-color-picker-' + bg.color}
                  onClick={() => {
                    setBgColor(bg.color);
                    setLightMode(bg.lightMode);
                  }}
                  size={'lg'}
                  border={bgColor === bg.color ? '4px' : '0px'}>
                  {bgColor === bg.color && (
                    <RiCheckLine
                      size={24}
                      color={bg.lightMode ? 'var(--dark1)' : 'var(--lightGrey)'}
                    />
                  )}
                </IconButton>
              ))}
            </SimpleGrid>
            {/* <Collapse startingHeight={0} in={isOpen}>
              <Suspense>
              <ColorPicker value={bgColor} onChange={setBgColor} width={380} />
              </Suspense>
            </Collapse>
            <Button size="lg" onClick={isOpen ? onClose : onOpen} width={'100%'}>
              {isOpen ? 'Hide' : 'Show'} Color Picker
            </Button> */}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}

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
} from '@chakra-ui/react';
import React from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { bgColorAtom, lightModeAtom } from 'core/atoms';
import { RiCheckLine } from 'react-icons/ri';
import { BG_COLORS } from 'core/utils/constants';

export default function BgPicker() {
  const [bgColor, setBgColor] = useAtom(bgColorAtom);
  const setLightMode = useSetAtom(lightModeAtom);
  const lightMode = useColorMode().colorMode === 'light';

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
          <AccordionPanel py={4} bgColor={lightMode ? BG_COLORS[4].color : BG_COLORS[2].color}>
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
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}

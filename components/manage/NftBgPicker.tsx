import {
  Button,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  IconButton,
  SimpleGrid,
  useColorMode,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { avatarAtom, bgColorAtom, lightModeAtom } from 'core/atoms';
import { RiCheckDoubleLine, RiCheckLine } from 'react-icons/ri';
import { BG_COLORS, BG_IMAGES } from 'core/utils/constants';

export default function NftBgPicker() {
  const [bgColor, setBgColor] = useAtom(bgColorAtom);
  const avatar = useAtom(avatarAtom);
  const setLightMode = useSetAtom(lightModeAtom);
  const lightMode = useColorMode().colorMode === 'light';

  return (
    <>
      <Accordion
        allowToggle
        allowMultiple={false}
        borderRadius={0}
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
            borderRadius={0}
            width={'100%'}
            justifyContent="space-between">
            <Text fontSize={'lg'}>Background Image</Text>
            <IconButton
              size={'sm'}
              aria-label="bg-image-picker"
              bg={bgColor}
              bgSize={'cover'}></IconButton>
          </AccordionButton>
          <AccordionPanel py={4} bgColor={lightMode ? BG_COLORS[4].color : BG_COLORS[2].color}>
            <SimpleGrid columns={[3]} gap={2}>
              {/* <IconButton
                height={'180px'}
                aria-label="bg-image-picker-item"
                bg={`url('${avatar}')`}
                key={'bg-image-picker-item-avatar-blurred-light'}
                bgSize={'cover'}
                onClick={() => {
                  setBgColor(`url('${avatar}')`);
                  setLightMode(true);
                }}
                size={'lg'}
                borderColor={'green'}
                border={bgColor === `url('${avatar}')` ? '4px' : '0px'}>
                {bgColor === `url('${avatar}')` && (
                  <RiCheckLine
                    size={24}
                    color={'var(--dark1)'}
                  />
                )}
              </IconButton> */}
              {BG_IMAGES.map((bg) => (
                <IconButton
                  height={'180px'}
                  aria-label="bg-image-picker-item"
                  bg={bg.bg}
                  key={'bg-image-picker-item-' + bg.bg}
                  bgSize={'cover'}
                  onClick={() => {
                    setBgColor(bg.bg);
                    setLightMode(bg.lightMode);
                  }}
                  size={'lg'}
                  borderColor={'green'}
                  border={bgColor === bg.bg ? '4px' : '0px'}>
                  {bgColor === bg.bg && (
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

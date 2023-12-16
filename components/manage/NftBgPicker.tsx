import {
  Button,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  IconButton,
  SimpleGrid,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { avatarAtom, bgColorAtom, lightModeAtom } from 'core/atoms';
import { RiCheckDoubleLine, RiCheckLine } from 'react-icons/ri';
import { BG_IMAGES } from 'core/utils/constants';

export default function NftBgPicker() {
  const [bgColor, setBgColor] = useAtom(bgColorAtom);
  const avatar = useAtom(avatarAtom);
  const setLightMode = useSetAtom(lightModeAtom);

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Button
            px={4}
            variant="solid"
            size="lg"
            width={'100%'}
            borderRadius={0}
            justifyContent="space-between">
            <Text>Background Image</Text>
            <IconButton
              size={'sm'}
              aria-label="bg-image-picker"
              bg={bgColor}
              bgSize={'cover'}></IconButton>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
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
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
}

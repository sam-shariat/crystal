import {
  Button,
  Text,
  IconButton,
  SimpleGrid,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
} from '@chakra-ui/react';
import React from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { bgColorAtom, lightModeAtom } from 'core/atoms';
import { RiCheckLine } from 'react-icons/ri';
import { BG_COLORS } from 'core/utils/constants';

export default function BgPicker() {
  const [bgColor, setBgColor] = useAtom(bgColorAtom);
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
            borderBottomRadius={0}
            justifyContent="space-between">
            <Text>Background Color</Text>
            <IconButton size={'sm'} aria-label="bg-color-picker" bg={bgColor}></IconButton>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverBody>
            <SimpleGrid columns={[3]} gap={2}>
              {BG_COLORS.map((bg) => (
                <IconButton
                  height={['60px','60px','120px']}
                  aria-label="bg-color-picker"
                  bg={bg.color}
                  key={'bg-color-picker-'+bg.color}
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
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
}

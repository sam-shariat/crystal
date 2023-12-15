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
  useColorMode
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { variantAtom, buttonBgColorAtom, lightModeAtom, roundAtom } from 'core/atoms';
import { RiCheckDoubleLine, RiCheckLine } from 'react-icons/ri';
import { BG_COLORS, BUTTON_BG_COLORS, BUTTON_ROUNDS, BUTTON_VARIANTS } from 'core/utils/constants';
import { getColor } from 'core/utils';

export default function ButtonColorPicker() {
  const { colorMode } = useColorMode();
  const [buttonBgColor, setButtonBgColor] = useAtom(buttonBgColorAtom);
  const lightMode = useAtomValue(lightModeAtom);
  const [round, setRound] = useAtom(roundAtom);
  const [variant, setVariant] = useAtom(variantAtom);

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
            <Text>Button Color</Text>
            <IconButton
              size={'sm'}
              aria-label="bg-color-picker"
              colorScheme={buttonBgColor}
              variant={variant}
              rounded={round}></IconButton>
          </Button>
        </PopoverTrigger>
        <PopoverContent bgColor={lightMode ? BG_COLORS[4].color : BG_COLORS[2].color}>
          <PopoverBody>
            <SimpleGrid columns={[3]} gap={2}>
              {BUTTON_BG_COLORS.map((bg) => (
                <Button
                  key={`button-bg-color-${bg}-${lightMode}`}
                  aria-label="button-bg-color-picker"
                  onClick={() => {
                    setButtonBgColor(bg);
                  }}
                  colorScheme={bg}
                  fontSize={'xs'}
                  variant={variant}
                  color={getColor(variant,bg,lightMode)}
                  rounded={round}>
                    {bg}
                  {buttonBgColor === bg && (
                    <RiCheckLine
                      size={24}
                    />
                  )}
                </Button>
              ))}
            </SimpleGrid>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
}

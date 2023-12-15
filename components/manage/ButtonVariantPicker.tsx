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
  
  export default function ButtonVarianticker() {
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
              <Text>Button Style</Text>
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
              {BUTTON_VARIANTS.map((_variant) => (
                <Button
                  key={`button-variant-${_variant}-${lightMode}`}
                  aria-label="button-variant-picker"
                  onClick={() => {
                    setVariant(_variant);
                  }}
                  colorScheme={buttonBgColor}
                  variant={_variant}
                  color={buttonBgColor === 'dark' && _variant !== 'outline' ? 'white' : undefined}
                  rounded={round}>
                  {variant === _variant && (
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
  
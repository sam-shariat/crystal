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
    useColorMode,
  } from '@chakra-ui/react';
  import React, { useEffect } from 'react';
  import { useAtom, useAtomValue } from 'jotai';
  import { variantAtom, buttonBgColorAtom, lightModeAtom, roundAtom, fontAtom } from 'core/atoms';
  import { RiCheckDoubleLine, RiCheckLine } from 'react-icons/ri';
  import { BG_COLORS, FONTS } from 'core/utils/constants';
  
  export default function FontPicker() {
    const buttonBgColor = useAtomValue(buttonBgColorAtom);
    const lightMode = useAtomValue(lightModeAtom);
    const [font, setFont] = useAtom(fontAtom);
    const round = useAtomValue(roundAtom);
    const variant = useAtomValue(variantAtom);
  
    return (
      <>
        <Popover>
          <PopoverTrigger>
            <Button
              px={4}
              variant="solid"
              size="lg"
              width={'100%'}
              borderTopRadius={0}
              justifyContent="space-between">
              <Text>Font</Text>
              <Text>{font}</Text>
            </Button>
          </PopoverTrigger>
          <PopoverContent bgColor={lightMode ? BG_COLORS[4].color : BG_COLORS[2].color}>
            <PopoverBody>
              <SimpleGrid columns={[2]} gap={2}>
                {FONTS.map((_font) => (
                  <Button
                    key={`button-font-${_font}-${lightMode}`}
                    aria-label="button-font-picker"
                    onClick={() => {
                      setFont(_font);
                    }}
                    colorScheme={buttonBgColor}
                    color={buttonBgColor === 'dark' && variant !== 'outline' ? 'white' : undefined}
                    variant={variant}
                    fontFamily={_font}
                    fontSize={'lg'}
                    rounded={round}>
                    {_font}
                    {font === _font && <RiCheckLine size={24} />}
                  </Button>
                ))}
              </SimpleGrid>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </>
    );
  }
  
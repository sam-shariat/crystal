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
import React, { useEffect } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { variantAtom, buttonBgColorAtom, lightModeAtom, roundAtom } from 'core/atoms';
import { RiCheckDoubleLine, RiCheckLine } from 'react-icons/ri';
import { BG_COLORS, BUTTON_BG_COLORS, BUTTON_ROUNDS, BUTTON_VARIANTS } from 'core/utils/constants';

export default function ButtonVarianticker() {
  const { colorMode } = useColorMode();
  const [buttonBgColor, setButtonBgColor] = useAtom(buttonBgColorAtom);
  const lightMode = useColorMode().colorMode === 'light';
  const [round, setRound] = useAtom(roundAtom);
  const [variant, setVariant] = useAtom(variantAtom);

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
            height={['44px','52px']}
            _expanded={{ bgColor: lightMode ? BG_COLORS[4].color : BG_COLORS[2].color }}
            _hover={{ bgColor: lightMode ? BG_COLORS[4].color : BG_COLORS[2].color }}
            px={4}
            variant="solid"
            borderRadius={0}
            width={'100%'}
            justifyContent="space-between">
            <Text fontSize={'lg'}>Button Style</Text>
            <IconButton
              size={'sm'}
              aria-label="bg-color-picker"
              colorScheme={buttonBgColor}
              variant={variant}
              rounded={round}></IconButton>
          </AccordionButton>
          <AccordionPanel py={4} bgColor={lightMode ? BG_COLORS[4].color : BG_COLORS[2].color}>
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
                  {variant === _variant && <RiCheckLine size={24} />}
                </Button>
              ))}
            </SimpleGrid>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}

import {
  Button,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  useColorMode,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import {
  variantAtom,
  avatarShapeAtom,
  lightModeAtom,
  roundAtom,
  fontAtom,
  avatarAtom,
} from 'core/atoms';
import { RiCheckDoubleLine, RiCheckLine } from 'react-icons/ri';
import { BG_COLORS, FONTS } from 'core/utils/constants';
import { Avatar } from 'components/Profile';
import SelectSizeButton from './SelectSizeButton';

export default function AvatarShapePicker() {
  const lightMode = useColorMode().colorMode === 'light';
  const avatar = useAtomValue(avatarAtom);
  const [avatarShape, setAvatarShape] = useAtom(avatarShapeAtom);
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
            <Text fontSize={'lg'}>Avatar Shape</Text>
            <Box w={'34px'}>
              <Avatar url={avatar} shape={avatarShape} shadow="none" />
            </Box>
          </AccordionButton>
          <AccordionPanel
            py={4}
            bgColor={lightMode ? BG_COLORS[4].color : BG_COLORS[2].color}>
            <SelectSizeButton
              options={['hex', 'circle', 'round', 'none']}
              value={String(avatarShape)}
              setValue={(e: any) => setAvatarShape(e)}
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}

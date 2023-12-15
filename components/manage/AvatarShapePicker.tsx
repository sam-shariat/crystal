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
  Box,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { variantAtom, avatarShapeAtom, lightModeAtom, roundAtom, fontAtom, avatarAtom } from 'core/atoms';
import { RiCheckDoubleLine, RiCheckLine } from 'react-icons/ri';
import { BG_COLORS, FONTS } from 'core/utils/constants';
import { Avatar } from 'components/Profile';
import SelectSizeButton from './SelectSizeButton';

export default function AvatarShapePicker() {
  const lightMode = useAtomValue(lightModeAtom);
  const avatar = useAtomValue(avatarAtom);
  const [avatarShape, setAvatarShape] = useAtom(avatarShapeAtom);
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
            <Text>Avatar Shape</Text>
            <Box w={'34px'}>
            <Avatar url={avatar} shape={avatarShape} shadow="none" />
            </Box>
          </Button>
        </PopoverTrigger>
        <PopoverContent bgColor={lightMode ? BG_COLORS[4].color : BG_COLORS[2].color}>
          <PopoverBody p={1}>
            <SelectSizeButton
              options={['hex', 'circle', 'round', 'square']}
              value={String(avatarShape)}
              setValue={(e: any) => setAvatarShape(e)}
            />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
}

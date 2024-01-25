import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { AVAILABLE_LINKS, EXAMPLE_LINK_URLS } from 'core/utils/constants';
import SelectSizeButton from './SelectSizeButton';
import { Styles } from 'types';
import { capFirstLetter } from 'core/utils';
import { useState } from 'react';
import { LinkIcon } from 'components/logos';
import IconPicker from './IconPicker';

interface Props {
  type: string;
  url: string;
  setUrl?: any;
  styles?: Styles;
  setStyles?: any;
}

export default function ManageSimpleLink({ type, url, styles, setStyles, setUrl }: Props) {
  const reg = AVAILABLE_LINKS.find((e) => e.type === type)?.reg ?? '';

  return (
    <>
      <InputGroup mt={2}>
        <Input
          size="lg"
          value={url}
          placeholder={`Enter ${capFirstLetter(type)} URL`}
          onChange={(e) => setUrl(e.currentTarget.value)}
          //onChange={(e) => setUrl(title.toLowerCase(),e.currentTarget.value)}
        />
        <InputRightElement>
          <Tooltip
            borderRadius={4}
            label={<Text p={2}>Paste</Text>}
            hasArrow
            color="white"
            bgColor={'black'}>
            <IconButton
              mt={2}
              aria-label="paste-url"
              mr={2}
              onClick={() => navigator.clipboard.readText().then((text) => setUrl(text))}>
              <LinkIcon type="RiFileCopy2Line" />
            </IconButton>
          </Tooltip>
        </InputRightElement>
      </InputGroup>
      {EXAMPLE_LINK_URLS[type.toLowerCase().replace(' ', '')] && !RegExp(reg, 'i').test(url) && (
        <Box pt={2}>
          <Text>Example {capFirstLetter(type)}</Text>
          <Text color={'gray'}>{EXAMPLE_LINK_URLS[type.toLowerCase().replace(' ', '')]}</Text>
        </Box>
      )}
      {(type.includes('soundcloud') || type.includes('simple link') || type.includes('youtube')) &&
        RegExp(reg, 'i').test(url) && (
          <SelectSizeButton
            options={['sm', 'md', 'lg']}
            value={String(styles?.size)}
            setValue={(e: any) => setStyles({ ...styles, size: e })}
            title="Size"
          />
        )}

      {type === 'simple link' && (
        <IconPicker value={styles?.icon} setValue={(e: any) => setStyles({ ...styles, icon: e })} />
      )}
    </>
  );
}

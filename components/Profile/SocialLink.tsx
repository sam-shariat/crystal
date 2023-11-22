import {
  Button,
  Tooltip,
  IconButton,
  useColorMode,
  Text,
  Link as ChakraLink,
  useMediaQuery,
} from '@chakra-ui/react';
import { buttonBgColorAtom, lightModeAtom, roundAtom, variantAtom } from 'core/atoms';
import { getColor, getIconColor } from 'core/utils';
import { useAtomValue } from 'jotai';

interface Props {
  title: string;
  icon: JSX.Element;
  url: string;
  onlyIcon: boolean;
  color?: string;
}
export default function SocialLink({ title, icon, url, onlyIcon, color }: Props) {
  const { colorMode } = useColorMode();
  const lightMode = useAtomValue(lightModeAtom);
  const [notMobile] = useMediaQuery('(min-width: 800px)');
  const round = useAtomValue(roundAtom);
  const variant = useAtomValue(variantAtom);
  const buttonBg = useAtomValue(buttonBgColorAtom);

  return (
    <>
      {onlyIcon ? (
        <ChakraLink href={url} target="_blank" id={`venom-id-${title}-link`}>
          <Tooltip
            borderRadius={4}
            label={<Text p={2}>{title}</Text>}
            color="white"
            bgColor={'black'}
            placement="top"
            hasArrow>
            <IconButton variant="outline" border={0} aria-label={title + '-link'} color={color ? color : getIconColor(buttonBg,lightMode)} >
              {icon}
            </IconButton>
          </Tooltip>
        </ChakraLink>
      ) : (
        <ChakraLink href={url} target="_blank" id={`venom-id-${title}-link`}>
          <Button
            size="lg"
            gap={2}
            rounded={round}
            variant={variant}
            colorScheme={buttonBg}
            color={getColor(variant,buttonBg,lightMode)}
            minWidth={notMobile ? 'md' : '100%'}>
            {icon}
            {title}
          </Button>
        </ChakraLink>
      )}
    </>
  );
}

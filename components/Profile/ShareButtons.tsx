import {
  Button,
  useColorMode,
  Text,
  Link as ChakraLink,
  Menu,
  IconButton,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { LinkIcon } from 'components/logos';
import { SITE_URL } from 'core/utils/constants';
import { RiShareFill } from 'react-icons/ri';

interface Props {
  text: string;
  image?: string;
  hashtags?: string;
  url: string;
}
export default function ShareButtons({ text, image, url, hashtags }: Props) {
  const { colorMode } = useColorMode();
  const shareProfile = async () => {
    let href = `https://twitter.com/intent/tweet?original_referer=${SITE_URL}&text=${text}&hashtags=${hashtags}&url=${url}`;
    window.open(href);
  };

  return (
    <Menu>
      <IconButton as={MenuButton} aria-label="share-buttons" variant={'ghost'} p={2}>
        <RiShareFill size={24} />
      </IconButton>
      <MenuList p={0}>
        <Button as={MenuItem} onClick={()=> shareProfile()} leftIcon={<LinkIcon type="twitter" />}>
          {' '}
          Share on twitter
        </Button>
      </MenuList>
    </Menu>
  );
}

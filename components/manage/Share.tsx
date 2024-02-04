import { Button, useColorMode } from '@chakra-ui/react';
import { LinkIcon } from 'components/logos';
import { SITE_URL, SITE_PROFILE_URL } from 'core/utils/constants';
import { RiShareLine } from 'react-icons/ri';

export default function ShareButton({
  name,
  type = 'blue',
  url
}: {
  name: string;
  type: 'blue' | 'gray';
  url: string;
}) {
  const shareProfile = async () => {
    let hashtags = 'blockchain,profile';
    let text =
      '👋 Hey Folks%0a%0aCheck out my Venom ID profile on the venom blockchain%0a%0aclaim yours via @venomid_network%0a%0a';
    let href = `https://twitter.com/intent/tweet?original_referer=${SITE_URL}&text=${text}&hashtags=${hashtags}&url=${url}`;
    window.open(href);
  };
  const {colorMode } = useColorMode();


  return (
    <>
      {type === 'blue' ? (
        <Button
          gap={2}
          flexDirection={'column'}
          height="72px"
          w={'100%'}
          className="share"
          borderRadius={12}
          colorScheme="cyan"
          color={'white'}
          bgGradient={
            colorMode === 'light'
              ? 'linear(to-r, var(--blue0), var(--bluevenom2))'
              : 'linear(to-r, var(--blue0), var(--bluevenom2))'
          }
          onClick={shareProfile}>
          <LinkIcon type="x" />
          Share
        </Button>
      ) : (
        <Button gap={2} size={'lg'} width={'100%'} className="share" onClick={shareProfile}>
          <LinkIcon type="x" />
          Share
        </Button>
      )}
    </>
  );
}

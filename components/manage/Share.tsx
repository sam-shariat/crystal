import { Button } from '@chakra-ui/react';
import { LinkIcon } from 'components/logos';
import { SITE_URL, SITE_PROFILE_URL } from 'core/utils/constants';
import { RiShareLine } from 'react-icons/ri';

export default function ShareButton({ name }: { name: string }) {
  const shareProfile = async () => {
    let url = SITE_PROFILE_URL + name.slice(0, -4);
    let txt =
      'Check out my Venom ID profile NFT on the venom blockchain powered by @venomid_network';
    let href = `https://twitter.com/intent/tweet?original_referer=${SITE_URL}&text=${txt}&url=${url}`;
    window.open(href);
  };

  return (
    <>
      <Button
        gap={2}
        variant={'outline'}
        flexDirection={'column'}
        height="72px"
        className='share'
        borderRadius={12}
        colorScheme="twitter"
        onClick={shareProfile}>
        <LinkIcon type='x' />
        Share
      </Button>
    </>
  );
}

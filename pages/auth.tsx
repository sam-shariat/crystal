import type { NextPage } from 'next';
import CommunitySection from 'components/sections/CommunitySection';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { twitterAuthAtom } from 'core/atoms';
import { Box, Center } from '@chakra-ui/react';

const Auth: NextPage = () => {
  const router = useRouter();
  const query = router.query;
  const [twitterAuth, setTwitterAuth] = useAtom(twitterAuthAtom);

  useEffect(() => {
    if (query.status) {
      setTwitterAuth(btoa(JSON.stringify(query)));
      window.close();
    }
    //console.log(searchParams)
  }, [query]);

  return (
    <Center p={4} height={'100vh'} w={'100%'} bgColor={'var(--dark)'} color={'white'}>
      {/* <ClaimSection /> */}
      Authenticating ...
    </Center>
  );
};

export default Auth;

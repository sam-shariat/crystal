import type { NextPage } from 'next';
import Head from 'next/head';
import { SITE_DESCRIPTION, SITE_URL, SITE_TITLE, WINNERS } from 'core/utils/constants';
import { Seo } from 'components/Layout/Seo';
import WinnersSection from 'components/sections/WinnersSection';
import { useRouter } from 'next/router';
import { capFirstLetter } from 'core/utils';
import { useEffect, useState } from 'react';
import { Center, Spinner } from '@chakra-ui/react';

const Contest: NextPage = () => {
  const router = useRouter();
  const contest = String(router.query.contest).replaceAll('-', '');;
  const des = 'Venom ID | .venom domains on the venom blockchain';
  const [title,setTitle] = useState('Venom ID Challenge')
  const [challenge, setChallenge] = useState<any | null>(null)

  useEffect(()=> {
    try {
      const _challenge = WINNERS[contest];
      console.log(_challenge);
      if(_challenge) setTitle(_challenge.title);
      if(_challenge) setChallenge(_challenge);
      //console.log(contest);
    } catch (e) {
      console.log(e);
    }
  },[contest])
  

  return (
    <>
      <Seo title={title} description={des} />
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={des} />
        <meta name="twitter:image" content={`${SITE_URL}/ogs/rafffle.jpg`} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={des} />
        <meta name="og:image" content={`${SITE_URL}/ogs/${contest}`} />
        <link rel="icon" type="image/png" href="/logos/vidicon.png" />
      </Head>

      {challenge && challenge.title && challenge.title.length > 10 ? <WinnersSection challenge={challenge} /> : <Center minH={'90vh'}><Spinner /></Center>}
    </>
  );
};

export default Contest;

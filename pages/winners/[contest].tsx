import type { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import { SITE_DESCRIPTION, SITE_URL, SITE_TITLE, WINNERS } from 'core/utils/constants';
import { Seo } from 'components/Layout/Seo';
import WinnersSection from 'components/sections/WinnersSection';
import { useRouter } from 'next/router';
import { capFirstLetter } from 'core/utils';
import { useEffect, useState } from 'react';
import { Center, Spinner } from '@chakra-ui/react';
import { DefaultSeo } from 'next-seo';

interface ContestPageProps {
  challenge: any;
  title: string;
  contest: string;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  const contest = String(query.contest).replaceAll('-', '');
  const challenge = WINNERS[contest];
  const title = challenge.title;
  return {
    props: {
      challenge,
      contest,
      title,
    },
  };
}

const Contest: NextPage<ContestPageProps> = ({ challenge, title, contest }) => {
  const des = 'Venom ID Challenge : ' + challenge.challenge;

  return (
    <>
      <DefaultSeo title={title} description={des} />

      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={des} />
        <meta name="twitter:image" content={`${SITE_URL}ogs/${contest}`} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={des} />
        <meta name="og:image" content={`${SITE_URL}ogs/${contest}`} />
        <link rel="icon" type="image/png" href="/logos/vidicon.png" />
      </Head>

      {challenge && challenge.title && challenge.title.length > 10 ? (
        <WinnersSection challenge={challenge} />
      ) : (
        <Center minH={'90vh'}>
          <Spinner />
        </Center>
      )}
    </>
  );
};

export default Contest;

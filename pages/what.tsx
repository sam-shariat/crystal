import type { NextPage } from 'next';
import Head from 'next/head';
import { SITE_DESCRIPTION, SITE_URL, SITE_TITLE } from 'core/utils/constants';
import { Seo } from 'components/Layout/Seo';
import IntroSection from 'components/sections/IntroSection';

const What: NextPage = () => {
  const title = "What is Venom ID";
  const des = "Domain Names for Venom Blockchain";
  return (
    <>
    <Seo title={title} description={des} />
    <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={des} />
        <meta name="twitter:image" content={`${SITE_URL}/api/og?title=${title}&subtitle=${des}&image=${SITE_URL}logos/vidicon.png`} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={des} />
        <meta name="og:image" content={`${SITE_URL}/api/og?title=${title}&subtitle=${des}&image=${SITE_URL}logos/vidicon.png`} />
        <link rel="icon" type="image/png" href="/logos/vidicon.png" />
      </Head>
      
      {/* <ClaimSection /> */}
      <IntroSection />
    </>
  );
};

export default What;

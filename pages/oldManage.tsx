import type { NextPage } from 'next';
import Head from 'next/head';
import ManageSection from 'components/sections/ManageSection';
import { SITE_DESCRIPTION, SITE_URL, SITE_TITLE } from 'core/utils/constants';
import { Seo } from 'components/Layout/Seo';

const Manage: NextPage = () => {
  const title = "Dashboard";
  const des = "Venom ID Management";
  return (
    <>
    <Seo title={title} description={des} />
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={des} />
        <meta
          name="twitter:image"
          content={`${SITE_URL}/api/og?title=${title}&subtitle=${des}&w=30&image=${SITE_URL}logos/vidicon.svg`}
        />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={des} />
        <meta
          name="og:image"
          content={`${SITE_URL}/api/og?title=${title}&subtitle=${des}&w=30&image=${SITE_URL}logos/vidicon.svg`}
        />
        <link rel="icon" type="image/png" href="/logos/vidicon.png" />
      </Head>
      
      {/* <ClaimSection /> */}
      <ManageSection />
    </>
  );
};

export default Manage;

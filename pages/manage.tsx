import type { NextPage } from 'next';
import Head from 'next/head';
import ManageSection from 'components/sections/ManageSection';
import { SITE_DESCRIPTION, SITE_URL, SITE_TITLE } from 'core/utils/constants';
import { Seo } from 'components/Layout/Seo';

const Manage: NextPage = () => {
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : SITE_URL;
  return (
    <>
    <Seo title="Venom ID Management" description="Manage all your virtual assets" />
    <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SITE_TITLE} />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={`${origin}/vidorigin.png`} />
        <link rel="icon" type="image/png" href="/logos/vidicon.png" />
      </Head>
      
      {/* <ClaimSection /> */}
      <ManageSection />
    </>
  );
};

export default Manage;

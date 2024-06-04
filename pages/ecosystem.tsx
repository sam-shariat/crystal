import type { NextPage } from 'next';
import Head from 'next/head';
import { SITE_DESCRIPTION, SITE_URL, SITE_TITLE } from 'core/utils/constants';
import { Seo } from 'components/Layout/Seo';
import RRRSection from 'components/sections/RRRSection';
import EcosystemSection from 'components/sections/EcosystemSection';

const Ecosystem: NextPage = () => {
  const title = "Venom ID Ecosystem DApps";
  const des = "Find and explore the best dapps on the Venom Blockchain";
  return (
    <>
    <Seo title={title} description={des} />
    <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={des} />
        <meta
          name="twitter:image"
          content={`${SITE_URL}/ogs/ecosystem.jpg`}
        />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={des} />
        <meta
          name="og:image"
          content={`${SITE_URL}/ogs/ecosystem.jpg`}
        />
        <link rel="icon" type="image/png" href="/logos/vidicon.png" />
      </Head>
      
      {/* <ClaimSection /> */}
      <EcosystemSection />
    </>
  );
};

export default Ecosystem;

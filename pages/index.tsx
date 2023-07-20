import type { NextPage } from 'next';
import Head from 'next/head';
import ClaimSection from 'components/sections/ClaimSection';
import ManageSection from 'components/sections/ManageSection';
import ProfileSection from 'components/sections/ProfileSection';
import RoadmapSection from 'components/sections/RoadmapSection';
import AboutSection from 'components/sections/AboutSection';
import {
  SITE_DESCRIPTION,
  SITE_URL,
  SITE_FULL_DESCRIPTION,
  SITE_TITLE,
} from 'core/utils/constants';
import { Seo } from 'components/Layout/Seo';
import { NextSeo } from 'next-seo';

const Home: NextPage = () => {
  return (
    <>
      <Seo />
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SITE_TITLE} />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={`${SITE_URL}vidog.png`} />
        <link rel="icon" type="image/png" href="/logos/vidicon.png" />
      </Head>

      <ClaimSection />
      <ManageSection />
      <ProfileSection />
      <RoadmapSection />
      <AboutSection />
    </>
  );
};

export default Home;

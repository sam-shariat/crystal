import type { NextPage } from 'next';
import Head from 'next/head';
import ClaimSection from 'components/sections/ClaimSection';
import ManageSection from 'components/sections/ManageSection';
import ProfileSection from 'components/sections/ProfileSection';
import RoadmapSection from 'components/sections/RoadmapSection';
import AboutSection from 'components/sections/AboutSection';
import { SITE_DESCRIPTION, SITE_FULL_DESCRIPTION, SITE_TITLE } from 'core/utils/constants';
import { Seo } from 'components/Layout/Seo';

const Home: NextPage = () => {
  return (
    <>
      <Seo />
      <Head>
        <title>{SITE_TITLE} | {SITE_DESCRIPTION}</title>
        <meta name="description" content={SITE_FULL_DESCRIPTION} />
        <link rel="icon" type="image/svg+xml" href="/logos/vidicon.svg"/>
        <link rel="icon" type="image/png" href="/logos/vidicon.png"/>
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

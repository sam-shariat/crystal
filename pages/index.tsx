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
  SITE_TITLE,
} from 'core/utils/constants';
import { Seo } from 'components/Layout/Seo';
import ParticipationSection from 'components/sections/ParticipationSection';
import IntroSection from 'components/sections/IntroSection';
import FeaturesSection from 'components/sections/FeaturesSection';
import NSSection from 'components/sections/NSSection';

const Home: NextPage = () => {
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : SITE_URL;
  return (
    <>
      <Seo />
      <Head>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={SITE_TITLE} />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={SITE_URL+'logos/vid.png'} />
        <link rel="icon" type="image/png" href="/logos/vidicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=0.0.2"/>
        <link rel="shortcut icon" href="/favicon.ico?v=0.0.2"/>

      </Head>
      <ClaimSection />
      <IntroSection />
      <FeaturesSection />
      {/* <ParticipationSection />
      <ManageSection />
      <ProfileSection /> */}
      <NSSection />
      <RoadmapSection />
      <AboutSection />
    </>
  );
};

export default Home;

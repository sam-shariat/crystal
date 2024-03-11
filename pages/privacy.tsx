import type { NextPage } from 'next';
import Head from 'next/head';
import ManageSection from 'components/sections/ManageSection';
import { SITE_DESCRIPTION, SITE_URL, SITE_TITLE } from 'core/utils/constants';
import { Seo } from 'components/Layout/Seo';
import SettingsSection from 'components/sections/SettingsSection';
import { Box, Container, Flex, Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react';

const Privacy: NextPage = () => {
  const title = 'Privacy Policy';
  const des = 'Venom ID Privacy Policy';
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
      <Box id="litepaper">
        <Container as="main" maxW="container.lg" display="grid" minH="94vh" py={10}>
          <Flex flexDirection="column" maxW={'container.lg'}>
            <Stack fontSize={'xl'} gap={8}>
              <Heading as="h2" size="lg" my={8}>
                Privacy Policy
              </Heading>
              <Text>
                Information Collection: Venom ID does not collect any personal information from
                users. When you register a domain on Venom ID and create a profile, your public
                information will be stored on IPFS servers and made accessible to the public.
              </Text>
              <Text>
                Use of Information: The information you choose to include in your Venom ID profile
                will be publicly available and visible to anyone who visits your profile page. This
                includes your chosen domain name, profile picture, bio, and any virtual assets you
                decide to showcase.
              </Text>
              <Text>
                Cookies and Tracking Technologies: Venom ID may use cookies and similar tracking
                technologies to enhance your browsing experience and collect non-personal
                information for statistical purposes. These technologies do not collect personally
                identifiable information.
              </Text>
              <Text>
                Data Security: While Venom ID takes reasonable measures to protect the information
                stored on IPFS servers, please be aware that information stored on the blockchain
                and IPFS is inherently public and transparent. Venom ID cannot guarantee the
                security or confidentiality of any information shared on the platform.
              </Text>
              <Text>
                Third-Party Links: The Venom ID website may contain links to third-party websites or
                services. We are not responsible for the privacy practices or content of these third
                parties. We encourage you to review the privacy policies of any websites you visit.
              </Text>
            </Stack>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default Privacy;

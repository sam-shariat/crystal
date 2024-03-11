import type { NextPage } from 'next';
import Head from 'next/head';
import ManageSection from 'components/sections/ManageSection';
import { SITE_DESCRIPTION, SITE_URL, SITE_TITLE } from 'core/utils/constants';
import { Seo } from 'components/Layout/Seo';
import SettingsSection from 'components/sections/SettingsSection';
import { Box, Container, Flex, Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react';

const Terms: NextPage = () => {
  const title = 'Terms of Use';
  const des = 'Venom ID Terms of Use';
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
        <Container as="main" maxW="container.lg" display="grid" minH="94vh" py={10} >
          <Flex flexDirection="column" maxW={'container.lg'}>
            <Stack fontSize={'xl'} gap={8}>
              <Heading as="h2" size="lg" my={8}>
                Terms of Use
              </Heading>
              <Text><strong>
                Acceptance of Terms: </strong>By accessing and using the Venom ID website, you agree to be
                bound by these Terms of Use.
              </Text>
              <Text>
                Service Description: Venom ID is a decentralized platform built on the Venom
                blockchain that allows users to manage and showcase their virtual assets in a
                customizable page. The platform provides a secure and transparent solution for
                consolidating and exhibiting digital presence.
              </Text>
              <Text>
                User Responsibilities: You are solely responsible for the content you create and
                share on Venom ID. You agree not to use the service for any illegal or unauthorized
                purposes and to comply with all applicable laws and regulations.
              </Text>
              <Text>
                Intellectual Property: Venom ID retains all rights to its intellectual property,
                including trademarks, logos, and website content. You may not use or reproduce any
                of Venom ID's intellectual property without prior written permission.
              </Text>
              <Text>
                Limitation of Liability: Venom ID is not liable for any damages or losses resulting
                from your use of the service. We do not guarantee the availability, accuracy, or
                reliability of the website, and we reserve the right to modify or discontinue the
                service at any time.
              </Text>
            </Stack>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default Terms;

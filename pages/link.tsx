import type { NextPage } from 'next';
import axios from 'axios';
import Head from 'next/head';
import React, { useEffect, useState} from 'react';
import { Button, Container, Heading, Text, Flex, useMediaQuery, Center, Spinner, Link } from '@chakra-ui/react';
import { VenomFoundation, BTC, ETH } from 'components/logos';
import { useTranslate } from 'core/lib/hooks/use-translate';
import { Avatar,Socials } from 'components/Profile';
import { BTCSCAN_ADDRESS, ETHERSCAN_ADDRESS, SITE_DESCRIPTION, SITE_TITLE } from 'core/utils/constants';

const LinkPage: NextPage = () => {
  const { t } = useTranslate();
  const [notMobile] = useMediaQuery('(min-width: 800px)');
  const [json,setJson] = useState({});
  const [isLoading,setIsLoading] = useState(true);

  useEffect(() => {
    async function getProfileJson(){
      setIsLoading(true);
      try {
        const res = await axios.get('https://ipfs.io/ipfs/QmbVfnejQqU71jSN4p5Wc42HFveR479mc62u2xUJwo4M7t');
        setJson(res.data);
        console.log(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log('error getting json file')
        setIsLoading(false);
      }
    }
    getProfileJson();
  }, []);
  return (
    <>
      <Head>
      <title>
          {json && !isLoading ? json.name : SITE_TITLE } | {json && !isLoading ? json.bio : SITE_DESCRIPTION}
        </title>
        <meta name="description" content={`${json && !isLoading ? json.name : SITE_TITLE } | ${json && !isLoading ? json.bio : SITE_DESCRIPTION}`} />
        <link rel="icon" href={json && !isLoading ? json.avatar : "/logos/vidicon.svg"} />
      </Head>

      <Container
        as="main"
        maxW="container.sm"
        display="grid"
        placeContent="center"
        placeItems="center"
        minH="75vh">
        {!isLoading ? <>
          <Avatar url={json.avatar} />
          <Heading fontWeight="bold" fontSize="2xl" mt={2}>
            {json.name}
          </Heading>
          <Flex mt={6} direction={notMobile ? 'row' : 'column'} gap={2}>
            <Button
              variant="solid"
              backgroundColor="blackAlpha.300"
              width={notMobile ? 'auto' : '100%'}>
              <VenomFoundation /> Venom Address
            </Button>
            {json.btcAddress && (
              <Link href={BTCSCAN_ADDRESS + json.btcAddress} target='_blank'>
              <Button variant="solid" backgroundColor="blackAlpha.300">
                <BTC />
                BTC Address
              </Button>
              </Link>
            )}
            {json.ethAddress && (
              <Link href={ETHERSCAN_ADDRESS + json.ethAddress} target='_blank'>
              <Button variant="solid" backgroundColor="blackAlpha.300">
                <ETH />
                ETH Address
              </Button>
              </Link>
            )}
          </Flex>
          <Text fontWeight="light" fontSize={notMobile ? 'xl' : 'lg'} my={8} textAlign={'center'}>
            {json.bio}
          </Text>
          <Socials json={json}/>
        </> : <Center width={'100%'} height={150}><Spinner size='lg'/></Center>}
      </Container>
    </>
  );
};

export default LinkPage;

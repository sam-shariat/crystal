import { Button, Box, Stack, Switch, Text, Badge, Flex, Center } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { addressAtom, useLineIconsAtom, lightModeAtom, horizontalSocialAtom, showAllNftsAtom } from 'core/atoms';

interface Props {
  json: any;
  nftAddress: string;
}

export default function ManageSettings({ json, nftAddress }: Props) {
  const wallet = useAtomValue(addressAtom);
  const [useLineIcons, setUseLineIcons] = useAtom(useLineIconsAtom);
  const [horizontalSocial, setHorizontalSocial] = useAtom(horizontalSocialAtom);
  const [showAllNfts, setShowAllNfts] = useAtom(showAllNftsAtom);
  const [lightMode, setLightMode] = useAtom(lightModeAtom);

  useEffect(() => {
    setUseLineIcons(json.lineIcons);
    setLightMode(json.lightMode);
    setHorizontalSocial(json.socialIcons);
    setShowAllNfts(json.showAllNfts);
  }, []);

  return (
    <Stack my={5} width={'100%'}>
      <Text my={3} fontWeight="bold" fontSize="xl" textAlign="center">
        Settings
      </Text>
      <Button
        px={4}
        variant="solid"
        size="lg"
        borderRadius={12}
        justifyContent="space-between"
        onClick={() => setUseLineIcons(!useLineIcons)}>
        <Text>Use Line Icons</Text>
        <Switch
          colorScheme="green"
          as={Box}
          bg={'none'}
          size="lg"
          isChecked={useLineIcons}
          onClick={() => setUseLineIcons(!useLineIcons)}
        />
      </Button>
      <Button
        px={4}
        variant="solid"
        size="lg"
        borderRadius={12}
        justifyContent="space-between"
        onClick={() => setLightMode(!lightMode)}>
        <Text>Light Mode</Text>
        <Switch
          colorScheme="green"
          as={Box}
          bg={'none'}
          size="lg"
          isChecked={lightMode}
          onClick={() => setLightMode(!lightMode)}
        />
      </Button>
      <Button
        px={4}
        variant="solid"
        size="lg"
        borderRadius={12}
        justifyContent="space-between"
        onClick={() => setHorizontalSocial(!horizontalSocial)}>
        <Text>Only Social Icons</Text>
        <Switch
          colorScheme="green"
          as={Box}
          bg={'none'}
          size="lg"
          isChecked={horizontalSocial}
          onClick={() => setHorizontalSocial(!horizontalSocial)}
        />
      </Button>
      <Button
        px={4}
        variant="solid"
        size="lg"
        borderRadius={12}
        justifyContent="space-between"
        onClick={() => setShowAllNfts(!showAllNfts)}>
        <Text>Showcase all NFTs</Text>
        <Switch
          colorScheme="green"
          as={Box}
          bg={'none'}
          size="lg"
          isChecked={showAllNfts}
          onClick={() => setShowAllNfts(!showAllNfts)}
        />
      </Button>
      <Button px={4} variant="solid" size="lg" borderRadius={12} justifyContent="space-between">
        <Center>
          <Text>Enable Messaging</Text>
          <Badge ml="2" colorScheme="red">
            Soon
          </Badge>
        </Center>
        <Switch colorScheme="green" as={Box} bg={'none'} size="lg" disabled />
      </Button>
      <Button px={4} variant="solid" size="lg" borderRadius={12} justifyContent="space-between">
        <Center>
          <Text>Enable Payments</Text>
          <Badge ml="2" colorScheme="red">
            Soon
          </Badge>
        </Center>
        <Switch colorScheme="green" as={Box} bg={'none'} size="lg" disabled />
      </Button>

      {/* <Button px={4} variant="solid" size='lg' borderRadius={12} justifyContent='space-between' onClick={()=> setLightMode(!lightMode)}>
        <Text>Light Colors</Text>
        <Switch colorScheme='green'  bg={'none'} size='lg' isChecked={lightMode} onClick={()=> setLightMode(!lightMode)}/>
      </Button> */}
    </Stack>
  );
}

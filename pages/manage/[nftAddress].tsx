import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Address, Transaction } from 'everscale-inpage-provider';
import {
  useMediaQuery,
  useColorMode,
  Button,
  Container,
  Heading,
  Text,
  Flex,
  Spinner,
  Center,
  Link,
  useToast,
  Box,
  LightMode,
  Stack,
} from '@chakra-ui/react';
import { useTranslate } from 'core/lib/hooks/use-translate';
import { isValidVenomAddress, sleep, truncAddress } from 'core/utils';
import axios from 'axios';
import {
  ManageSocials,
  ManageLinks,
  EditAvatar,
  BioTextInput,
  TitleInput,
  ManageWallets,
  PreviewModal,
} from 'components/manage';
import { useAtom, useAtomValue } from 'jotai';
import {
  bioAtom,
  btcAtom,
  lightModeAtom,
  ethAtom,
  avatarAtom,
  nameAtom,
  jsonAtom,
  socialsArrayAtom,
  nftContractAtom,
  linksArrayAtom,
  useLineIconsAtom,
  titleAtom,
  subtitleAtom,
  horizontalSocialAtom,
  addressAtom,
  socialButtonsAtom,
  isConnectedAtom,
  bgColorAtom,
  connectedAccountAtom,
  ipfsGatewayAtom,
  walletsArrayAtom,
  jsonHashAtom,
  walletButtonsAtom,
  roundAtom,
  buttonBgColorAtom,
  variantAtom,
  fontAtom,
  tourStepAtom,
  nftJsonAtom,
  avatarShapeAtom,
  isStyledAtom,
  networkAtom,
  mobileViewAtom,
  targetAtom,
} from 'core/atoms';
import {
  SITE_DESCRIPTION,
  SITE_PROFILE_URL,
  SITE_TITLE,
  IPFS_URLS,
  BUTTON_BG_COLORS,
  BUTTON_ROUNDS,
  BUTTON_VARIANTS,
  BG_COLORS,
  FONTS,
  MIN_FEE,
} from 'core/utils/constants';
import { ConnectButton } from 'components/venomConnect';
import { getNft } from 'core/utils/nft';
import DomainAbi from 'abi/Domain.abi.json';
import { useConnect, useVenomProvider } from 'venom-react-hooks';
import { useStorageUpload } from '@thirdweb-dev/react';
import AddModal from 'components/manage/AddModal';
import ShareButton from 'components/manage/Share';
import Preview from 'components/Profile/Preview';
import ProfileCompletion from 'components/manage/ProfileCompletion';
import CropAvatar from 'components/manage/CropAvatar';
import ManageSidebar from 'components/manage/ManageSidebar';
import { LinkIcon } from 'components/logos';
import StyleDrawer from 'components/manage/StyleDrawer';
import ManageHeader from 'components/manage/ManageHeader';
import TargetAddress from 'components/manage/TargetAddress';

const ManagePage: NextPage = () => {
  const { provider } = useVenomProvider();
  const { isConnected, account } = useConnect();
  const { mutateAsync: upload } = useStorageUpload();
  const { t } = useTranslate();
  const [name, setName] = useAtom(nameAtom);
  const [bio, setBio] = useAtom(bioAtom);
  const [target, setTarget] = useAtom(targetAtom);
  const [lightMode, setLightMode] = useAtom(lightModeAtom);
  const [isStyled, setIsStyled] = useAtom(isStyledAtom);
  const [ipfsGateway, setIpfsGateway] = useAtom(ipfsGatewayAtom);
  const [retries, setRetries] = useState<number>(0);
  const connected = useAtomValue(isConnectedAtom);
  const tourStep = useAtomValue(tourStepAtom);
  const network = useAtomValue(networkAtom);
  const connectedAccount = useAtomValue(connectedAccountAtom);
  const [venom, setVenom] = useAtom(addressAtom);
  const [btc, setBtc] = useAtom(btcAtom);
  const [eth, setEth] = useAtom(ethAtom);
  const links = useAtomValue(linksArrayAtom);
  const socials = useAtomValue(socialsArrayAtom);
  const wallets = useAtomValue(walletsArrayAtom);
  const [lineIcons, setLineIcons] = useAtom(useLineIconsAtom);
  const [bgColor, setBgColor] = useAtom(bgColorAtom);
  const [round, setRound] = useAtom(roundAtom);
  const [buttonBgColor, setButtonBgColor] = useAtom(buttonBgColorAtom);
  const [variant, setVariant] = useAtom(variantAtom);
  const [font, setFont] = useAtom(fontAtom);
  const [notMobile] = useMediaQuery('(min-width: 992px)');
  const [notMobileH] = useMediaQuery('(min-height: 896px)');
  const [desktop] = useMediaQuery('(min-width: 1280px)');
  const [avatar, setAvatar] = useAtom(avatarAtom);
  const [avatarShape, setAvatarShape] = useAtom(avatarShapeAtom);
  const [socialIcons, setSocialIcons] = useAtom(horizontalSocialAtom);
  const [socialButtons, setSocialButtons] = useAtom(socialButtonsAtom);
  const [walletButtons, setWalletButtons] = useAtom(walletButtonsAtom);
  const [title, setTitle] = useAtom(titleAtom);
  const [subtitle, setSubtitle] = useAtom(subtitleAtom);
  const [json, setJson] = useAtom(jsonAtom);
  const [_nftJson, setNftJson] = useAtom(nftJsonAtom);
  const [jsonHash, setJsonHash] = useAtom(jsonHashAtom);
  const [jsonUploading, setJsonUploading] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const router = useRouter();
  const nftAddress = String(router.query.nftAddress);
  const [nftContract, setNftContract] = useAtom(nftContractAtom);
  const { colorMode } = useColorMode();
  const [mobileView, setMobileView] = useAtom(mobileViewAtom);
  const toast = useToast();
  //const [horizontalWallet, setHorizontalWallet] = useAtom(horizontalWalletsAtom);

  const getJson = () => {
    let socialsObj: any = {};
    socials.map((social) => {
      socialsObj[social['key']] = social['value'];
    });

    let walletsObj: any = {};
    wallets.map((wallet) => {
      walletsObj[wallet['key']] = wallet['value'];
    });

    let styles: any = {
      lineIcons: lineIcons,
      lightMode: lightMode,
      bgColor: bgColor,
      buttonBgColor: buttonBgColor,
      round: round,
      variant: variant,
      font: font,
      isStyled: isStyled,
    };

    const data = {
      name: name,
      title: title,
      subtitle: subtitle,
      avatar: avatar,
      avatarShape: avatarShape,
      venomAddress: account?.address,
      // btcAddress: btc,
      // ethAddress: eth,
      bio: bio,
      links: links,
      wallets: walletsObj,
      socials: socialsObj,
      lineIcons: lineIcons,
      lightMode: lightMode,
      socialIcons: socialIcons,
      WalletButtons: walletButtons,
      socialButtons: socialButtons,
      bgColor: bgColor,
      styles: styles,
    };

    return data;
  };

  const uploadJson = async () => {
    const data = JSON.stringify(getJson());

    // console.log(data);

    try {
      setJsonUploading(true);
      toast({
        status: 'loading',
        title: 'Saving to IPFS',
        description: 'Uploading file to IPFS',
        isClosable: true,
      });
      const uris = await upload({ data: [data] });
      setJsonUploading(false);
      saveVid(uris[0].slice(7));
      //Take a look at your Pinata Pinned section, you will see a new file added to you list.
    } catch (error) {
      setJsonUploading(false);
      toast.closeAll();
      toast({
        status: 'warning',
        title: 'Error in uploading to IPFS',
        description:
          'check your network and Try Again, If the problem presists, please send a message to venomidapp@gmail.com',
        isClosable: true,
      });

      // console.log(error);
      return;
    }
  };

  async function saveVid(_jsonHash: string) {
    if (!isConnected) {
      toast({
        status: 'info',
        title: 'connect wallet',
        description: 'please connect your venom wallet',
        isClosable: true,
      });
      return;
    }
    if (!provider) {
      toast({
        status: 'info',
        title: 'Provider Not Ready',
        description:
          'Please wait a few seconds and try again, Your Wallet Provider is not ready, yet',
      });
      return;
    }

    if (provider.isInitialized) {
      setIsSaving(true);
      toast({
        status: 'loading',
        title: 'saving venom id profile to the blockchain',
        description: 'Please confirm the transaction in your wallet',
        duration: null,
        isClosable: true,
      });
      const tvmCell = await provider.packIntoCell({
        data: { ipfsdata: String(_jsonHash) },
        structure: [{ name: 'ipfsdata', type: 'string' }] as const,
      });
      console.log(tvmCell);
      // @ts-ignore: Unreachable code error
      const saveTx = await nftContract.methods
        .setRecord({ key: 33, value: tvmCell.boc })
        .send({
          amount: String(MIN_FEE),
          bounce: true,
          from: account?.address,
        })
        .catch((e: any) => {
          if (e.code === 3) {
            // rejected by a user
            setIsSaving(false);
            toast.closeAll();
            return Promise.resolve(null);
          } else {
            setIsSaving(false);
            toast.closeAll();
            // console.log(e);
            return Promise.reject(e);
          }
        });

      if (saveTx) {
        setIsConfirming(true);
        toast.closeAll();
        toast({
          status: 'loading',
          title: 'confirming changes on the blockchain',
          description: 'Please wait a few moments while your changes are saved',
          duration: null,
          isClosable: true,
        });
        let receiptTx: Transaction | undefined;
        const subscriber = provider && new provider.Subscriber();
        if (subscriber)
          await subscriber
            .trace(saveTx)
            .tap((tx_in_tree: any) => {
              console.log(tx_in_tree);
              if (tx_in_tree.account.equals(nftAddress)) {
                toast.closeAll();
                toast({
                  status: 'success',
                  title: 'Save Successful',
                  description:
                    name +
                    ' Profile Saved Successfuly, You can now View and Share your venom profile Link',
                  duration: null,
                  isClosable: true,
                });
              }
            })
            .finished();

        setIsSaving(false);
        setIsConfirming(false);
      }
    }
  }

  useEffect(() => {
    async function getProfileJson() {
      if (connectedAccount && isConnected && provider) {
        try {
          if (provider?.isInitialized === false) {
            // console.log('provider not ready');
            await sleep(1000);
            getProfileJson();
            return;
          }

          if (nftContract === undefined) {
            const _nftContract = new provider.Contract(DomainAbi, new Address(nftAddress));
            setNftContract(_nftContract);
          }

          if (network !== 'venom') {
            setError(`Please switch your network to Venom`);
            setIsLoading(false);
            return;
          }

          if (json) {
            return;
          }

          setIsLoading(true);
          // console.log('getting nft0');

          // console.log('getting nft');
          const nftJson = await getNft(provider, new Address(nftAddress));
          console.log(nftJson);
          if (
            String(nftJson.info.owner) !== connectedAccount ||
            String(nftJson.info.manager) !== connectedAccount
          ) {
            setError(
              `You (${truncAddress(connectedAccount)}) don't have permission to manage this NFT`
            );
            setIsLoading(false);
            return;
          } else {
            setError('');
          }
          setNftJson(nftJson);
          //console.log(nftJson);

          let ipfsData =
            nftJson.hash && nftJson.hash?.indexOf('not set') < 0 && nftJson.hash.length > 10
              ? nftJson.hash
              : '';
          // Extract the Account address from the cell
          if (nftJson.target && isValidVenomAddress(nftJson.target)) {
            setTarget(nftJson.target);
          }
          setJsonHash(String(ipfsData));
          if (ipfsData === '') {
            setJson({
              name: nftJson.name,
              venomAddress: connectedAccount,
              btcAddress: '',
              ethAddress: '',
              title: '',
              subtitle: '',
              bio: '',
              avatar: '',
              avatarNft: '',
              lineIcons: false,
              lightMode: BG_COLORS[0].lightMode,
              socialIcons: true,
              socialButtons: false,
              walletButtons: true,
              showAllNfts: false,
              bgColor: BG_COLORS[0].color,
              links: [],
              socials: {},
            });

            setName(String(nftJson.name));
            setVenom(connectedAccount);
            setBio('');
            setBtc('');
            setEth('');
            setAvatar('');
            setTitle('');
            setSubtitle('');
            setAvatarShape('round');
            setSocialIcons(true);
            setSocialButtons(true);
            setWalletButtons(true);
            setBgColor(BG_COLORS[0].color);
            setLineIcons(false);
            setLightMode(BG_COLORS[0].lightMode);
            setButtonBgColor(BUTTON_BG_COLORS[2]);
            setRound(BUTTON_ROUNDS[1]);
            setVariant(BUTTON_VARIANTS[0]);
            setFont(FONTS[0]);
            setIsStyled(false);
            setIsLoading(false);
            setIsLoaded(true);
            return;
          }

          const res = await axios.get(ipfsGateway + ipfsData);

          setJson(res.data);
          setName(String(nftJson.name));
          setVenom(connectedAccount);
          setTitle(res.data.title ?? '');
          setSubtitle(res.data.subtitle ?? '');
          setBio(res.data.bio);
          //setBtc(res.data.btcAddress);
          //setEth(res.data.ethAddress);
          setAvatar(res.data.avatar);
          setAvatarShape(res.data.avatarShape ?? 'round');
          setSocialIcons(res.data.socialIcons ?? true);
          setSocialButtons(res.data.socialButtons ?? true);
          setWalletButtons(res.data.waletButtons ?? true);
          setBgColor(res.data?.styles?.bgColor ?? BG_COLORS[0].color);
          setLineIcons(res.data?.styles?.lineIcons ?? false);
          setLightMode(res.data?.styles?.lightMode ?? BG_COLORS[0].lightMode);
          setButtonBgColor(res.data?.styles?.buttonBgColor ?? BUTTON_BG_COLORS[2]);
          setRound(res.data?.styles?.round ?? BUTTON_ROUNDS[1]);
          setVariant(res.data?.styles?.variant ?? BUTTON_VARIANTS[0]);
          setFont(res.data?.styles?.font ?? FONTS[0]);
          setIsStyled(res.data?.styles?.isStyled ?? false);
          setIsLoading(false);
          setIsLoaded(true);
        } catch (error: any) {
          // console.log('error fetching nft', error);
          // console.log("retries : " + retries)
          if (error.code === 'ERR_NETWORK' || error.code === 'ERR_BAD_REQUEST') {
            // console.log("retries : " + retries)
            if (retries < 5) {
              setRetries((r) => r + 1);
              let currentIndex = IPFS_URLS.indexOf(ipfsGateway);
              let newIndex = currentIndex === IPFS_URLS.length - 1 ? 0 : currentIndex + 1;
              setIpfsGateway(IPFS_URLS[newIndex]);
              toast({
                title: 'changing ipfs gateway',
                description:
                  'There was a problem fetching data from ipfs, changing the ipfs gateway to resolve the problem',
                isClosable: true,
                duration: 3000,
                status: 'warning',
              });
              await sleep(4000);
              getProfileJson();
            } else {
              toast({
                title: 'network error',
                description:
                  'There was a problem fetching data from ipfs, please check your network and retry',
                isClosable: true,
                duration: 5000,
                status: 'warning',
              });
              setIsLoading(false);
              setError(error.message + ' please try again');
              console.log(error);
            }
          } else {
            setIsLoading(false);
            console.log(error);
            setError(error.message + ' please try again');
            //router.reload();
          }
        }
      }
    }
    getProfileJson();
  }, [connectedAccount, account, network, nftContract, nftAddress]);

  return (
    <>
      <Head>
        <title>
          {`${json && !isLoading ? json.name : SITE_TITLE} | ${
            json && !isLoading && json.bio !== '' ? json.bio : SITE_DESCRIPTION
          }`}
        </title>
        <meta
          name="description"
          content={`${json && !isLoading ? json.name : SITE_TITLE} | ${
            json && !isLoading && json.bio !== '' ? json.bio : SITE_DESCRIPTION
          }`}
        />
        <link
          rel="icon"
          href={json && !isLoading && json.avatar !== '' ? json.avatar : '/logos/vidicon.svg'}
        />
      </Head>

      {connected ? (
        <Box width="100%">
          <Container
            as="main"
            maxW="full"
            display="grid"
            key={'manage-venomid-main'}
            placeContent={['center', 'center', 'center', 'start', 'start', 'start']}
            placeItems={['start']}
            h="100vh">
            {error ? (
              <Text my={20}>{error}</Text>
            ) : (
              <>
                {!isLoading && json ? (
                  <Flex gap={[4, 4, 4, 4, 6]} justify={'center'}>
                    {notMobile && desktop && (
                      <Flex display={['none', 'none', 'none', 'none', 'flex']} flexDir={'column'}>
                        <ManageSidebar onSave={uploadJson} />
                      </Flex>
                    )}

                    <Flex display={'flex'} flexDir={'column'}>
                      <Flex
                        my={4}
                        direction={'column'}
                        gap={2}
                        borderRadius={12}
                        width={['100%', 'md', 'lg', 'md', 'md', 'xl']}
                        backgroundColor={colorMode === 'light' ? 'white' : 'blackAlpha.600'}
                        justify={'space-between'}
                        h={notMobileH ? '96vh' : '96vh'}
                        p={3}>
                        <Stack>
                          <ManageHeader />
                          <Flex
                            direction={'column'}
                            maxHeight={notMobileH ? '77vh' : '72vh'}
                            overflow={'auto'}
                            w={'100%'}
                            className="noscroll"
                            gap={4}
                            rounded={'lg'}>
                            <ProfileCompletion />
                            <TargetAddress nftAddress={nftAddress} />
                            <EditAvatar />
                            <CropAvatar />
                            {/* <VenomAddressButton venomAddress={json.venomAddress} /> */}
                            {/* <BtcAddressInput />
                        <EthAddressInput /> */}
                            <TitleInput />
                            <BioTextInput />
                            <ManageWallets json={json} nftAddress={nftAddress} />
                            <ManageLinks json={json} nftAddress={nftAddress} />
                            <ManageSocials json={json} nftAddress={nftAddress} />
                          </Flex>
                        </Stack>
                        <Flex gap={2} justify={'stretch'}>
                          <AddModal type={'square'} />
                          {!isLoading && json && !notMobile && (
                            <PreviewModal json={getJson()} onSave={uploadJson} />
                          )}

                          <Flex display={['none', 'none', 'none', 'flex', 'none']}>
                            <StyleDrawer onSave={uploadJson} />
                          </Flex>
                          <LightMode>
                            <Button
                              gap={2}
                              borderRadius={12}
                              colorScheme="green"
                              bgGradient={
                                colorMode === 'light'
                                  ? 'linear(to-r, var(--venom0), var(--bluevenom2))'
                                  : 'linear(to-r, var(--venom0), var(--bluevenom2))'
                              }
                              flexDirection={'column'}
                              w={'100%'}
                              className="save"
                              height="72px"
                              isLoading={jsonUploading || isSaving || isConfirming}
                              isDisabled={isLoading || isSaving || isConfirming}
                              loadingText={
                                isSaving ? 'Saving...' : isConfirming ? 'Confirming...' : ''
                              }
                              onClick={uploadJson}>
                              <LinkIcon type="RiSave2Line" />
                              Save
                            </Button>
                            <ShareButton name={name} type={'blue'} url={_nftJson.external_url} />
                          </LightMode>
                        </Flex>
                      </Flex>
                    </Flex>
                    {isLoaded && json && notMobile && (
                      <Flex my={4} position={'fixed'} top={1} right={4}>
                        <Preview json={json} onSave={uploadJson} />
                      </Flex>
                    )}
                  </Flex>
                ) : (
                  <Center w={'96%'} minH="94vh" position={'absolute'}>
                    <Spinner size="lg" />
                  </Center>
                )}
              </>
            )}
          </Container>
        </Box>
      ) : (
        <Center my={8} flexDirection="column" minH="100vh">
          <Text my={4}>Please Connect Your Venom Wallet</Text>
          <ConnectButton />
        </Center>
      )}
    </>
  );
};

export default ManagePage;

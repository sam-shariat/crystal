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
} from '@chakra-ui/react';
import { useTranslate } from 'core/lib/hooks/use-translate';
import { sleep, truncAddress } from 'core/utils';
import axios from 'axios';
import {
  ManageSocials,
  ManageLinks,
  EditAvatar,
  BioTextInput,
  TitleInput,
  ManageWallets,
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
  networkAtom
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
} from 'core/utils/constants';
import { ConnectButton } from 'components/venomConnect';
import { getNft } from 'core/utils/nft';
import NFTAbi from 'abi/Nft.abi.json';
import { useConnect, useVenomProvider } from 'venom-react-hooks';
import { useStorageUpload } from '@thirdweb-dev/react';
import { RiAddLine, RiShareLine, RiUpload2Line } from 'react-icons/ri';
import AddModal from 'components/manage/AddModal';
import ShareButton from 'components/manage/Share';
import Preview from 'components/Profile/Preview';
import ProfileCompletion from 'components/manage/ProfileCompletion';
import CropAvatar from 'components/manage/CropAvatar';

const ManagePage: NextPage = () => {
  const { provider } = useVenomProvider();
  const { isConnected, account } = useConnect();
  const { mutateAsync: upload } = useStorageUpload();
  const { t } = useTranslate();
  const [name, setName] = useAtom(nameAtom);
  const [bio, setBio] = useAtom(bioAtom);
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
  const [ notMobile ] = useMediaQuery('(min-width: 800px)');
  const [avatar, setAvatar] = useAtom(avatarAtom);
  const [avatarShape, setAvatarShape] = useAtom(avatarShapeAtom);
  const [socialIcons, setSocialIcons] = useAtom(horizontalSocialAtom);
  const [socialButtons, setSocialButtons] = useAtom(socialButtonsAtom);
  const [walletButtons, setWalletButtons] = useAtom(walletButtonsAtom);
  const [title, setTitle] = useAtom(titleAtom);
  const [subtitle, setSubtitle] = useAtom(subtitleAtom);
  const [json, setJson] = useAtom(jsonAtom);
  const [nftJson, setNftJson] = useAtom(nftJsonAtom);
  const [jsonHash, setJsonHash] = useAtom(jsonHashAtom);
  const [jsonUploading, setJsonUploading] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const minFee = 660000000;
  const router = useRouter();
  const nftAddress = String(router.query.nftAddress);
  const [nftContract, setNftContract] = useAtom(nftContractAtom);
  const { colorMode } = useColorMode();
  const toast = useToast();

  const getJson = () => {
    let socialsObj: any = {};
    socials.map((social) => {
      socialsObj[social['key']] = social['value'];
    });

    let walletsObj: any = {};
    wallets.map((wallet) => {
      walletsObj[wallet['key']] = wallet['value'];
    });

    let styles: any = 
    {
      lineIcons: lineIcons,
      lightMode: lightMode,
      bgColor: bgColor,
      buttonBgColor: buttonBgColor,
      round: round,
      variant: variant,
      font: font,
      isStyled: isStyled
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
      styles: styles
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
        title: 'saving changes to the blockchain',
        description: 'Please confirm the transaction in your wallet',
        duration: null,
        isClosable: true,
      });
      // @ts-ignore: Unreachable code error
      const saveTx = await nftContract.methods
        .setData({ data: String(_jsonHash) })
        .send({
          amount: String(minFee),
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

          if(network !== 'venom'){
            setError(
              `Please switch your network to Venom`
            );
            setIsLoading(false);
            return;
          }

          if(json) {
            return
          }

          setIsLoading(true);
          // console.log('getting nft0');

          if (nftContract === undefined) {
            const _nftContract = new provider.Contract(NFTAbi, new Address(nftAddress));
            setNftContract(_nftContract);
          }
          // console.log('getting nft');
          const nftJson = await getNft(provider, new Address(nftAddress));
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

          const ipfsData: string | undefined = nftJson.attributes?.find((att) => att.trait_type === 'DATA')?.value;
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
            setAvatarShape('circle');
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
          setAvatarShape(res.data.avatarShape ?? 'circle');
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
        } catch (error: any) {
          // console.log('error fetching nft', error);
          // console.log("retries : " + retries)
          if (error.code === 'ERR_NETWORK' || error.code === "ERR_BAD_REQUEST") {
            // console.log("retries : " + retries)
            if (retries < 5) {
              setRetries((r)=>  r + 1)
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
              
            }
          } else {
            setIsLoading(false);
            setError(error.message + ' please try again');
            //router.reload();
          }
        }
      }
    }
    getProfileJson();
  }, [connectedAccount,account,network]);

  return (
    <>
      <Head>
        <title>
          {`${json && !isLoading ? json.name : SITE_TITLE} | ${json && !isLoading && json.bio !== '' ? json.bio : SITE_DESCRIPTION}`}
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
        <Box width="100%" minH="85vh">
          <Container
            as="main"
            maxW="container.lg"
            display="grid"
            placeContent="center"
            placeItems="center"
            minH="85vh">
            {error ? (
              <Text my={20}>{error}</Text>
            ) : (
              <>
                {!isLoading && json ? (
                  
                  <Flex my={10} direction={'column'} gap={4} width="100%">
                    <ProfileCompletion />
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
                ) : (
                  <Center width={'100%'} height={150}>
                    <Spinner size="lg" />
                  </Center>
                )}

                <Flex
                  my={4}
                  gap={2}
                  position={'fixed'}
                  justifyContent={'center'}
                  width={'100%'}
                  zIndex={100}
                  bottom={-5}
                  p={4}
                  py={6}
                  backgroundColor={colorMode === 'light' ? 'whiteAlpha.600' : 'blackAlpha.600'}
                  backdropFilter="blur(12px)">
                  <AddModal />
                  {!isLoading && json && <Preview json={getJson()} onSave={uploadJson} />}
                  <Button
                    variant={'outline'}
                    gap={2}
                    borderRadius={12}
                    colorScheme="green"
                    flexDirection={'column'}
                    className='save'
                    height="72px"
                    isLoading={jsonUploading || isSaving || isConfirming}
                    isDisabled={isLoading || isSaving || isConfirming}
                    loadingText={isSaving ? 'Saving...' : isConfirming ? 'Confirming...' : ''}
                    onClick={uploadJson}>
                    <RiUpload2Line size={'28px'} />
                    Save
                  </Button>
                  <ShareButton name={name} />
                </Flex>
              </>
            )}
          </Container>
        </Box>
      ) : (
        <Center my={8} flexDirection="column" minH="75vh">
          <Text my={4}>Please Connect Your Venom Wallet</Text>
          <ConnectButton />
        </Center>
      )}
    </>
  );
};

export default ManagePage;

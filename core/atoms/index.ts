import { atom, useAtom } from 'jotai';
import { atomFamily, atomWithStorage } from 'jotai/utils';
import { initialAuthState } from './initialState';
import { VenomConnect } from 'venom-connect';
import { ProviderRpcClient } from 'everscale-inpage-provider';
import {
  CONTRACT_ADDRESS,
  IPFS_URLS,
  LINK_VALIDATION_REGEX,
  MINT_OPEN,
  SOCIALS,
  SOUNDCLOUD_LINK_REGEX,
  TWITTER_STATUS_REGEX,
  YOUTUBE_LINK_VALIDATION_REGEX,
} from 'core/utils/constants';
import {
  PrimaryName,
  CustomLink,
  ObjectItem,
  LinkType,
  BgColorItem,
  BgImageItem,
  Styles,
} from 'types';

export const venomConnectAtom = atom<VenomConnect | undefined>(undefined);
export const accountAtom = atom<any>({});
export const primaryNameAtom = atom<PrimaryName>({ name: '' });
export const ethPrimaryNameAtom = atom<PrimaryName>({ name: '' });
export const venomProviderAtom = atom<any>(undefined);
export const jsonAtom = atom<any>(undefined);
export const nftJsonAtom = atom<any>(undefined);
export const networkIdAtom = atom<number>(1);
export const nameAtom = atom('');
export const claimingNameAtom = atom('');
export const pathAtom = atom('');
export const titleAtom = atom('');
export const subtitleAtom = atom('');
export const btcAtom = atom('');
export const ethAtom = atom('');
export const bioAtom = atom('');
export const avatarAtom = atom('');
export const editingAvatarAtom = atom('');
export const editingAvatarFileAtom = atom<File | undefined >(undefined);
export const editedAvatarAtom = atom(false);
export const mintOpenAtom = atom(MINT_OPEN);
export const avatarNftAtom = atom('');
export const avatarShapeAtom = atom('round');
export const nftsNetworkAtom = atom('venom');
export const addressAtom = atom('');
export const targetAtom = atom('');
export const jsonHashAtom = atom('');
export const lightModeAtom = atom<boolean>(false);
export const isStyledAtom = atom<boolean>(false);
export const balanceAtom = atom('0');
export const bgColorAtom = atom('var(--bg8Gradient)');
export const buttonBgColorAtom = atom('light');
export const roundAtom = atom('md');
export const variantAtom = atom('solid');
export const fontAtom = atom('Poppins');
export const bgImageAtom = atom('gray');
export const socialsAtom = atom(SOCIALS);
export const socialsArrayAtom = atom<ObjectItem[]>([]);
export const walletsArrayAtom = atom<ObjectItem[]>([]);
export const linksArrayAtom = atom<CustomLink[]>([]);
export const venomContractAddressAtom = atom(CONTRACT_ADDRESS);
export const venomSProviderAtom = atom<ProviderRpcClient | undefined>(undefined);
export const rootContractAtom = atom<any>(undefined);
export const venomContractAtom = atom<any>(undefined);
export const venomContractAtomV1 = atom<any>(undefined);
export const venomContractAtomV2 = atom<any>(undefined);
export const earlyAdopterContractAtom = atom<any>(undefined);
export const nftContractAtom = atom<any>(undefined);
export const isConnectedAtom = atom(false);
export const connectedAccountAtom = atom('');
export const hydratedAtom = atom<boolean>(false);
export const useLineIconsAtom = atom<boolean>(false);
export const horizontalSocialAtom = atom<boolean>(true);
export const horizontalWalletsAtom = atom<boolean>(false);
export const socialButtonsAtom = atom<boolean>(false);
export const walletButtonsAtom = atom<boolean>(true);
export const showAllNftsAtom = atom<boolean>(false);
export const enableDonationsAtom = atom<boolean>(false);
export const enablePaymentsAtom = atom<boolean>(false);
export const openAddLinkAtom = atom<boolean>(false);
export const openAddNftAtom = atom<boolean>(false);
export const nftTypeAtom = atom<string>('');
export const signMessageAtom = atom<string>('');
export const addLinkTypeAtom = atom<string>('');
export const addLinkTitleAtom = atom<string>('');
export const addLinkUrlAtom = atom<string>('');
export const addLinkImageAtom = atom<string>('');
export const addLinkContentAtom = atom<string>('');
export const addLinkStylesAtom = atom<Styles>({});
export const openAddSocialAtom = atom<boolean>(false);
export const openAddAtom = atom<boolean>(false);
export const openRegisterAtom = atom<boolean>(false);
export const openModalAtom = atom<boolean>(false);
export const openEmbedModalAtom = atom<boolean>(false);
export const openAddWalletAtom = atom<boolean>(false);
export const mobileViewAtom = atom<boolean>(true);
export const ipfsGatewayAtom = atom<string>(IPFS_URLS[0]);
export const manageListViewAtom = atomWithStorage<boolean>('manageListView', true);
export const nftSmallerViewAtom = atomWithStorage<boolean>('nftSmallerView', false);
export const authAtom = atomWithStorage('user', initialAuthState);
export const localeAtom = atomWithStorage<string>('locale', 'en');
export const colorModeAtom = atomWithStorage<string>('colorM', 'dark');
export const tourStepAtom = atomWithStorage<number>('tourStep',0);
export const tourOpenAtom = atomWithStorage<boolean>('tourOpen',false);
export const signRequestAtom = atom<boolean>(false);
export const signHashAtom = atomWithStorage<string>('sighHash','');
export const signDateAtom = atomWithStorage<number>('signDate',0);
export const networkAtom = atomWithStorage<string>('_network','');
export const twitterAuthAtom = atomWithStorage<string>('_RHUwRHV6aUJCYnE0djhXUVR3akJ5ekFUcHdhWVB','');
export const twitterVerifiedAtom = atomWithStorage<string>('_dHdpdHRlclZlcmlmaWVkdHRlclZldHRlcl','');
export const twitterFollowedAtom = atomWithStorage<string>('_aXNVc2VyRm9sbG93aW5n2VyRm9sbG9','');
export const twitterRetweetedAtom = atomWithStorage<string>('_aGFzVXNlclJldHdlZXRlZDAxdHdlZ','');
export const uploadedImages = atomWithStorage<string>('_RTBkamhYVVZSM2FrSjVla0ZVY0hkaFdWQkhU','');

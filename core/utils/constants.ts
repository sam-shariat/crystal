import { BgColorItem, LinkType, BgImageItem } from 'types';
import { WINNERS_PUNKS_AVATAR_CHALLENGE, WINNERS_STAX_AVATAR_CHALLENGE } from './challenges';

export const MINT_OPEN = true;
export const MINT_TOTAL_SUPPLY: number = 10000;
export const TLD = 'venom';
export const DOMAIN_REGISTER_FEE = 1;
export const MINT_DATE = 'Feb 03, 2024 18:00 UTC';
export const MINT_MESSAGE = 'Final Phase of venom testnet minting will start on';
export const SITE_URL = 'https://venomid.network/';
export const SITE_URL_SHORT = 'venomid.network';
export const VID_IMAGE_API = 'https://img.venomid.network/api/';
export const SITE_TITLE = 'Venom ID';
export const SITE_DESCRIPTION =
  'DNS for the Venom Blockchain, Empower Your Digital Presence with one simple name';
export const SITE_FULL_DESCRIPTION =
  '.Venom Domains from Venom ID allow you to assign human-readable names to your blockchain and non-blockchain resources like Venom, BTC and ETH addresses, Links and more';
export const NFT_IMAGE_URL = 'https://ipfs.io/ipfs/QmUvfedgHDXdiMsq5nfLPGLQrR4QAYXHzR5SETBZQ6RGyd';
export const SITE_MANAGE_URL = 'https://venomid.tools/';
export const SITE_PROFILE_URL = 'https://venomid.link/';
export const ZEALY_URL = 'https://zealy.io/c/venomid/';
export const AVATAR_API_URL = 'https://venomid.link/api/avatar?name=';
export const VENOMSCAN_NFT = 'https://venomscan.com/accounts/';
export const VENOMSCAN_TX = 'https://venomscan.com/transactions/';
export const VENTORY_NFT = 'https://ventory.gg/nft/';
export const VENOMART_NFT = 'https://venomart.io/nft/';
export const VENOMART_COLLECTION = 'https://venomart.io/collection/';
export const OASIS_COLLECTION = 'https://oasis.gallery/collection/';
export const OASIS_NFT = 'https://oasis.gallery/nft/';
export const BTCSCAN_ADDRESS = 'https://blockchair.com/bitcoin/';
export const ETHERSCAN_ADDRESS = 'https://etherscan.io/address/';
export const CONTRACT_ADDRESS =
  '0:5ecadfe4afcf90452bc448b5dabffeca63939bfce866f248d9493f57e748aff3';
export const CONTRACT_ADDRESS_V1 =
  '0:0f158efd58c06ff2f84726425de63d3deb4037d2c621ccd552cec61d6b6ee5bd';
export const CONTRACT_ADDRESS_V2 =
  '0:2787ba200fd3e45c1a4854768f69310fe4e9566383761f27936aff61ad79c8ab';

export const ROOT_CONTRACT_ADDRESS =
  '0:2b353a0c36c4c86a48b0392c69017a109c8941066ed1747708fc63b1ac79e408';
export const TESTNET_ROOT_CONTRACT_ADDRESS =
  '0:72034dfba65f6d63b362e51add677c0549ff4e5a4e18c943acb54f953bb53660';
export const OLD_TESTNET_ROOT_CONTRACT_ADDRESS =
  '0:5475e9e7b9d178f4c35cd1136e83a100ca95e28b38c5c52d0689771372ba43ec';
export const MAX_NAME_LENGTH = 63;
export const MIN_NAME_LENGTH = 2;
export const MIN_FEE = 660000000;
export const EARLY_ADOPTERS_CONTRACT_ADDRESS =
  '0:9e0ea0f0fe6229aee6580a96fd9c62aabf6f2430830877c5b1ad700680ac0486';
export const RAFFLE_CONTRACT_ADDRESS =
  '0:2172fdf5a4091b90aeacc2003a61a82f27d743aa7b5426711d9fa48036b8f59e';
export const WRAPPED_VENOM_ADDRESS =
  '0:2c3a2ff6443af741ce653ae4ef2c85c2d52a9df84944bbe14d702c3131da3f14';
export const TOKEN_WALLET_ADDRESS =
  '0:2b5bbfe1d86e4df852a2ff33512495c7038c585f5c6c8c0a84f7af8997e2ff05';
export enum CertificateStatus {
  RESERVED,
  NEW,
  IN_ZERO_AUCTION,
  COMMON,
  EXPIRING,
  GRACE,
  EXPIRED,
}

export const DISPLAY_RECORD_ID = 10;
export const AVATAR_RECORD_ID = 11;
export const HEADER_RECORD_ID = 12;
export const LOCATION_RECORD_ID = 13;
export const URL_RECORD_ID = 14;
export const DESCRIPTION_RECORD_ID = 15;
export const NOTICE_RECORD_ID = 15;
export const COLOR_RECORD_ID = 16;
export const BG_RECORD_ID = 17;
export const TEXTCOLOR_RECORD_ID = 18;
export const STYLES_RECORD_ID = 19;

export const TWITTER_RECORD_ID = 20;

export const LINKS_RECORD_ID = 30;
export const IPFS_RECORD_ID = 33;

export const CertificateStatusNames = [
  'RESERVED',
  'NEW',
  'IN AUCTION',
  'COMMON',
  'EXPIRING',
  'GRACE',
  'EXPIRED',
  'AVAILABLE',
];

export const VENTORY_NFT_V1_ADDRESS =
  '0:7df675a3c099ed318d36c54e62282b1185f78fb05c21d19292699d6e200b0bb6';
export const VENTORY_NFT_V2_ADDRESS =
  '0:b248dc8f494e6e8f4ff355e9032cdfaf0108889b19b06e3f11861faa0780a06c';

export const ZERO_ADDRESS = '0:0000000000000000000000000000000000000000000000000000000000000000';

export const TWITTER_CALLBACK_URL = 'https://venomid.network/api/twitter/callback';
//export const TWITTER_CALLBACK_URL = 'http://localhost:3000/api/twitter/callback';
export const TWITTER_ME = 'https://api.twitter.com/2/users/me';
export const TWITTER_SCOPES = ['tweet.read', 'users.read', 'offline.access'];
export const TWITTER_FOLLOW_URL = 'https://twitter.com/intent/user?screen_name=venomid_network';
export const TWITTER_RETWEET_URL =
  'https://twitter.com/intent/retweet?tweet_id=1750574775158624742';
export const ZEALY_USERS_API = 'https://api.zealy.io/communities/venomid/users';
export const IPFS_IO_URL = 'https://ipfs.io/ipfs/';

export const SOCIAL_TWITTER = 'venomid_network';
export const TWITTER_URL = 'https://twitter.com/';
export const DISCORD_URL = 'https://discord.gg/XPwdhCAMXQ';
export const GITHUB_URL = 'https://github.com/venomid-network';
export const TELEGRAM_URL = 'https://t.me/venomid_network';
export const DOCS_URL = 'https://docs.venomid.network/developer-docs/overview';
export const ROADMAP_URL = 'https://docs.venomid.network/overview/roadmap';
export const GUIDES_URL = 'https://docs.venomid.network/guides/overview';
export const GRINDING_URL = 'https://venom.grinding.today/product/venomid';
export const MEDIUM_URL = 'https://medium.com/@venomidapp';
export const YLIDE_URL = 'https://hub.ylide.io/project/venom_id/discussion';
export const YOUTUBE_URL = 'https://www.youtube.com/@VenomID_Network';
export const OPENSEA_URL = 'https://opensea.io/assets/';
export const FAUCET_URL = 'https://venom.network/faucet';

export const MARKETPLACE_URLS_COLLECTION: any = {
  venomtestnet: 'https://testnet.ventory.gg/collection/',
  venom: 'https://testnet.ventory.gg/collection/',
  ethereum: 'https://opensea.io/assets/ethereum/',
  polygon: 'https://opensea.io/assets/matic/',
  arbitrum: 'https://opensea.io/assets/arbitrum/',
  optimism: 'https://opensea.io/assets/optimism/',
};

export const MARKETPLACE_URLS: any = {
  venomtestnet: 'https://testnet.ventory.gg/nft/',
  venom: 'https://testnet.ventory.gg/nft/',
  ethereum: 'https://opensea.io/assets/ethereum/',
  polygon: 'https://opensea.io/assets/matic/',
  arbitrum: 'https://opensea.io/assets/arbitrum/',
  optimism: 'https://opensea.io/assets/optimism/',
};

export const ETHERSCAN_URLS: any = {
  venomtestnet: 'https://venomscan.com/accounts/',
  venom: 'https://venomscan.com/accounts/',
  bitcoin: 'https://blockchair.com/bitcoin/address/',
  tron: 'https://tronscan.org/#/address/',
  avalanche: 'https://snowtrace.io/address/',
  ethereum: 'https://etherscan.io/address/',
  polygon: 'https://polygonscan.com/address/',
  binance: 'https://bscscan.com/address/',
  solana: 'https://solscan.io/account/',
  arbitrum: 'https://arbiscan.io/address/',
  optimism: 'https://optimistic.etherscan.io/address/',
};

export const IPFS_IMAGE_URI = 'https://ipfs';

export const IPFS_URLS = [
  `https://${process.env.NEXT_PUBLIC_THIRDWEB_ID}.ipfscdn.io/ipfs/`,
  'https://cf-ipfs.com/ipfs/',
  'https://ipfs.io/ipfs/',
  'https://gateway.ipfs.io/',
  'https://gateway.pinata.cloud/ipfs/',
  'https://10.via0.com/ipfs/',
  'https://ipfs.cf-ipfs.com/',
];

export const SIGN_MESSAGE =
  'Welcome to Venom ID. By signing this message, you agree with our terms and conditions. timestamp=';

export const MAX_FILE_UPLOAD = 15728640;

export const DONATE_VALUES: any = {
  venomtestnet: ['1 VENOM', '10 VENOM', '50 VENOM'],
  ethereum: ['0.001 ETH', '0.01 ETH', '0.05 ETH'],
  bitcoin: ['0.0001 BTC', '0.001 BTC', '0.005 BTC'],
  paypal: ['1 USD', '10 USD', '50 USD'],
};

// export const LINK_VALIDATION_REGEX =
//   '^(https?:\\/\\/)?' + // protocol
//   '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
//   '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
//   '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
//   '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
//   '(\\#[-a-z\\d_]*)?$';

export const LINK_VALIDATION_REGEX =
  '^(https?:\\/\\/)?' + // protocol
  '([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)' + // subdomain and domain name
  '(\\.[a-zA-Z]{2,})+' + // top-level domain
  '(\\:\\d+)?' + // port
  '(\\/[\\-a-zA-Z\\d%_.~+:]*)*' + // path (updated to include colon)
  '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // query string
  '(\\#[-a-zA-Z\\d_]*)?$'; // fragment identifier

export const YOUTUBE_LINK_VALIDATION_REGEX =
  /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

export const SOUNDCLOUD_LINK_REGEX =
  /https?:\/\/(?:w\.|www\.|)(?:soundcloud\.com\/)(?:(?:player\/\?url=https\%3A\/\/api.soundcloud.com\/tracks\/)|)(((\w|-)[^A-z]{7})|([A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)*(?!\/sets(?:\/|$))(?:\/[A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)*){1,2}))/;

export const TWITTER_STATUS_REGEX =
  /^https?:\/\/(?:www\.)?(?:twitter\.com|x\.com)\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+)$/;

export const EXAMPLE_SOCIAL_URLS: any = {
  twitter: 'https://twitter.com/exampleuser',
  linkedin: 'https://www.linkedin.com/in/exampleuser/',
  github: 'https://github.com/exampleuser',
  medium: 'https://medium.com/@exampleuser',
  youtube: 'https://www.youtube.com/@exampleuser',
  instagram: 'https://www.instagram.com/exampleuser',
  tiktok: 'https://www.tiktok.com/@exampleuser',
  twitch: 'https://www.twitch.tv/exampleuser',
  snapchat: 'https://www.snapchat.com/add/exampleuser',
  facebook: 'https://www.facebook.com/exampleuser',
  dribbble: 'https://dribbble.com/exampleuser',
  pinterest: 'https://www.pinterest.com/exampleuser',
  soundcloud: 'https://soundcloud.com/exampleuser',
  spotify: 'https://open.spotify.com/user/exampleuser',
  patreon: 'https://www.patreon.com/exampleuser',
  substack: 'https://exampleuser.substack.com',
  galxe: 'https://galxe.com/exampleuser',
  opensea: 'https://opensea.io/exampleuser',
  zealy: 'https://zealy.io/c/exampleuser',
  ylide: 'https://hub.ylide.io/project/exampleuser',
  amazon: 'https://www.amazon.com/gp/profile/exampleuser',
  playstore: 'https://play.google.com/store/apps/developer?id=Example+User',
  appstore: 'https://apps.apple.com/us/developer/example-user/id123456789',
  applemusic: 'https://music.apple.com/profile/exampleuser',
  clubhouse: 'https://www.joinclubhouse.com/@exampleuser',
  etsy: 'https://www.etsy.com/shop/exampleuser',
  discord: 'https://discord.gg/exampleuser',
  skype: 'exampleuser',
  slack: 'https://exampleuser.slack.com',
  telegram: 'https://t.me/exampleuser',
  whatsapp: '44234567890',
  phone: '44234567890',
  email: 'example@example.com',
};

export const EXAMPLE_LINK_URLS: any = {
  nftlink: 'https://yourlink.com',
  simplelink: 'https://yourlink.com',
  imagelink: 'https://yourlink.com',
  youtubevideo: 'https://www.youtube.com/watch?v=6Bq132cv_G0',
  soundcloudtrack: 'https://soundcloud.com/symbolico/im-free',
  tweet: 'https://x.com/SamyWalters/status/1720165257019073014',
};

export const EXAMPLE_WALLETS: any = {
  venom: '0:4bc69a8c3889adee39f6f1e3b2353c86f960c9b835e93397a2015a62a4823765',
  ethereum: '0xBFd210db795A9Ac48D0C3be2a74232BE44144E84',
  bitcoin: 'bc1qpvsvcfzvz59h02hcuvc8y8jj385r2mlhnkt654',
  polygon: '0xBFd210db795A9Ac48D0C3be2a74232BE44144E84',
  arbitrum: '0xBFd210db795A9Ac48D0C3be2a74232BE44144E84',
  binance: '0xBFd210db795A9Ac48D0C3be2a74232BE44144E84',
  avalanche: '0xBFd210db795A9Ac48D0C3be2a74232BE44144E84',
  optimism: '0xBFd210db795A9Ac48D0C3be2a74232BE44144E84',
  solana: 'BfiZDeHXzuz8pz5EGM6eUv1B1hLsGJQPRoxqYsBRKW3i',
  tron: 'TR22H7PLMm1BUaGfhmfnPY7VLEhG2U6y3t',
};

export const TARGET_VENOM_RECORD_ID = 0;
export const TARGET_ETH_RECORD_ID = 1;
export const TARGET_BTC_RECORD_ID = 2;
export const TARGET_MATIC_RECORD_ID = 3;
export const TARGET_ARB_RECORD_ID = 4;
export const TARGET_BNB_RECORD_ID = 5;
export const TARGET_AVAX_RECORD_ID = 6;
export const TARGET_OP_RECORD_ID = 7;
export const TARGET_SOL_RECORD_ID = 8;
export const TARGET_TRX_RECORD_ID = 9;

export const SOCIALS: string[] = [
  'Twitter',
  'Linkedin',
  'Github',
  'Medium',
  'Youtube',
  'Instagram',
  'TikTok',
  'Twitch',
  'Snapchat',
  'Facebook',
  'Dribbble',
  'Pinterest',
  'Soundcloud',
  'Spotify',
  'Patreon',
  'Substack',
  'Galxe',
  'Opensea',
  'Zealy',
  'Ylide',
  'Amazon',
  'Play Store',
  'App Store',
  'Apple Music',
  'Clubhouse',
  'Etsy',
  'Discord',
  'Skype',
  'Slack',
  'Telegram',
  'Whatsapp',
  'Phone',
  'Email',
];

export const WALLETS = [
  'Venom',
  'Ethereum',
  'Bitcoin',
  'Polygon',
  'Arbitrum',
  'Binance',
  'Avalanche',
  'Optimism',
  'Solana',
  'Tron',
];

export const BG_COLORS: BgColorItem[] = [
  { color: 'var(--darkGradient)', lightMode: false },
  { color: 'var(--dark)', lightMode: false },
  { color: 'var(--darkGradient0)', lightMode: false },
  { color: 'var(--lightGradient)', lightMode: true },
  { color: 'var(--grayGradient)', lightMode: true },
  { color: 'var(--lightGreyGradient)', lightMode: true },
  { color: 'var(--venomGradient)', lightMode: false },
  { color: 'var(--purpleGradient)', lightMode: false },
  { color: 'var(--redGradient)', lightMode: false },
  { color: 'var(--blueGradient)', lightMode: true },
  { color: 'var(--orangeGradient)', lightMode: true },
  { color: 'var(--yellowGradient)', lightMode: true },
];

export const BG_IMAGES: BgImageItem[] = [
  { bg: 'var(--bg1Gradient)', lightMode: false },
  { bg: 'var(--bg3Gradient)', lightMode: false },
  { bg: 'var(--bg2Gradient)', lightMode: true },
  { bg: 'var(--bg4Gradient)', lightMode: false },
  { bg: 'var(--bg5Gradient)', lightMode: false },
  { bg: 'var(--bg6Gradient)', lightMode: false },
  { bg: 'var(--bg7Gradient)', lightMode: false },
  { bg: 'var(--bg8Gradient)', lightMode: false },
  { bg: 'var(--bg9Gradient)', lightMode: false },
  // {
  //   bg: 'url(https://ipfs.io/ipfs/QmedReDFjSXa9fuNppt2ubDftwL4sfttwENUySHrNEdhKL/stax4.webp)',
  //   lightMode: false,
  // },
];

export const AVAILABLE_LINKS: LinkType[] = [
  { type: 'heading', av: true, reg: '' },
  { type: 'text paragraph', av: true, reg: '' },
  { type: 'nft link', av: true, reg: '' },
  //{ type: 'wallet button', av: true, reg: '' },
  { type: 'simple link', av: true, reg: LINK_VALIDATION_REGEX },
  { type: 'image link', av: true, reg: LINK_VALIDATION_REGEX },
  { type: 'tweet', av: true, reg: TWITTER_STATUS_REGEX },
  { type: 'ipfs image', av: true, reg: '' },
  { type: 'youtube video', av: true, reg: YOUTUBE_LINK_VALIDATION_REGEX },
  { type: 'soundcloud track', av: true, reg: SOUNDCLOUD_LINK_REGEX },
  { type: 'pdf document', av: true, reg: LINK_VALIDATION_REGEX },
  { type: 'donate button', av: true, reg: '' },
  { type: 'payment button', av: true, reg: '' },
  { type: 'nft gallery', av: false, reg: '' },
  { type: 'nft collection', av: false, reg: '' },
  { type: 'token link', av: false, reg: '' },
  { type: 'typeform', av: false, reg: '' },
  { type: 'contact form', av: false, reg: '' },
  { type: 'contact info', av: false, reg: '' },
];

export const BUTTON_BG_COLORS = [
  'dark',
  'light',
  'gray',
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'cyan',
  'purple',
  'pink',
];
export const BUTTON_ROUNDS = ['none', 'md', 'full'];
export const BUTTON_VARIANTS = ['solid', 'outline', 'pop', 'border', 'border2', 'fill'];
export const FONTS = ['Poppins', 'Lato', 'Pixelify Sans', 'Space Mono', 'Playfair Display', 'Jost'];

export const VARIATIONS = [
  {
    avatar:
      'https://ipfs.io/ipfs/QmQvTRLhNmUru9w1WT1JB9om9cjADHVwu2aVdmBWYN2qNA/_cc53c525-8cdd-45a2-865c-e0fc244ad96d.jpg',
    avatarShape: 'hex',
    bg: BG_IMAGES[7].bg,
    lightMode: BG_IMAGES[7].lightMode,
    buttonBg: BUTTON_BG_COLORS[1],
    variant: BUTTON_VARIANTS[2],
    round: BUTTON_ROUNDS[1],
    font: FONTS[0],
    title: 'Jonathan',
    WalletButtons: true,
    subtitle: 'Crypto Agent',
    vid: 'jonathon.venom',
  },
  {
    avatar: 'https://ipfs.io/ipfs/QmWhLFCef3k23F51h4y1bH4Nr38FmKcy959hBFuX7atngk/samoel.vid',
    avatarShape: 'circle',
    bg: BG_IMAGES[3].bg,
    lightMode: BG_IMAGES[3].lightMode,
    buttonBg: BUTTON_BG_COLORS[1],
    variant: BUTTON_VARIANTS[1],
    round: BUTTON_ROUNDS[2],
    font: FONTS[3],
    WalletButtons: true,
    title: 'Crypto Explorer',
    vid: 'samoel.venom',
  },
  {
    avatar:
      'https://ipfs.io/ipfs/QmeEghR8KgWde6tELkTPLXVZdupRarPyYsb6yr74XrdA7Y/vid-avatar%20(1).jpg',
    avatarShape: 'circle',
    bg: BG_IMAGES[8].bg,
    lightMode: BG_IMAGES[8].lightMode,
    buttonBg: BUTTON_BG_COLORS[1],
    variant: BUTTON_VARIANTS[5],
    round: BUTTON_ROUNDS[2],
    font: FONTS[0],
    title: 'Community OAT',
    WalletButtons: true,
    subtitle: 'NFT Collection',
    vid: 'passport.venom',
  },
  {
    avatar:
      'https://ipfs.io/ipfs/QmQJqujUTHNj28W4tHXEEQh54Mwi5YuWUVjJFFePowUR3n/_b69ba694-3bb6-4cea-99a7-16fceddfafc3.jpg',
    avatarShape: 'hex',
    bg: BG_IMAGES[5].bg,
    lightMode: BG_IMAGES[5].lightMode,
    buttonBg: BUTTON_BG_COLORS[4],
    variant: BUTTON_VARIANTS[2],
    round: BUTTON_ROUNDS[1],
    font: FONTS[2],
    title: 'Walter Williams',
    subtitle: 'Crypto Enthusiast',
    WalletButtons: false,
    socialButtons: false,
    vid: 'walter.venom',
  },
  {
    avatar:
      'https://ipfs.io/ipfs/QmUkwpstMppjJDi6s8YLK7iGaaVYWJvrmv1yhvKHM8VpK5/05882773ea2030c4cc8ee5cabc7b7a4c.png',
    avatarShape: 'round',
    bg: BG_COLORS[10].color,
    lightMode: BG_COLORS[10].lightMode,
    buttonBg: BUTTON_BG_COLORS[1],
    variant: BUTTON_VARIANTS[3],
    round: BUTTON_ROUNDS[0],
    font: FONTS[2],
    title: 'Sam Walt',
    subtitle: 'Blockchain Dev',
    vid: 'sam.venom',
    WalletButtons: false,
  },
  {
    avatar:
      'https://ipfs.io/ipfs/QmTNgHnxMXqcno1A85vG3qxpsJty91FJDfXh6Mfi7HwRyB/vidiconcircle%20(1).png',
    avatarShape: 'round',
    bg: BG_IMAGES[4].bg,
    lightMode: BG_IMAGES[4].lightMode,
    buttonBg: BUTTON_BG_COLORS[1],
    variant: BUTTON_VARIANTS[0],
    round: BUTTON_ROUNDS[1],
    font: FONTS[0],
    title: 'Venom ID',
    subtitle: 'Domains on venom',
    WalletButtons: true,
    vid: 'venomid.venom',
  },
];

export const VARIATIONS_VIDS = [
  {
    avatar: 'https://ipfs.io/ipfs/QmXTudZtDkgcKJEPrH7TwCpGSmWkD84jD221ad96CAX6Q3/aichar8.jpg',
    vid: 'boo.venom',
  },
  {
    avatar: 'https://ipfs.io/ipfs/QmcG2ACTvtgtvW1MUV71S2ey6fXcFXtowSicxDE4bLb1Vs/aichar7.jpg',
    vid: 'luc.venom',
  },
  {
    avatar: 'https://ipfs.io/ipfs/QmXfa45TwRkSRaaERMpTFQmFKHoAzqHqZj28H9Sk9jMC3k/aichar4.jpg',
    vid: 'john.venom',
  },
  {
    avatar: 'https://ipfs.io/ipfs/QmTJhU4AChpi59NEWzCDNu3tV6Wxbrwpc9mmTu4USe5n8f/aichar2.jpg',
    vid: 'alice.venom',
  },
  {
    avatar: 'https://ipfs.io/ipfs/QmUhcvFsmos6HxdvUg2D2kuaeTJ3wpS76gUtNe8wdNgCt3/aichar3.jpg',
    vid: 'alex.venom',
  },
  {
    avatar: 'https://ipfs.io/ipfs/QmRy2qg6MevBD99bEFxXiD1yQ7q3AQbsnwcccHHTshcfKQ/aichar1.jpg',
    vid: 'sara.venom',
  },
  {
    avatar: 'https://ipfs.io/ipfs/QmR2QUrwXRAdXWUjMdDwzNKGtxynrTgLrub772GgtbdkLn/aichar6.jpg',
    vid: 'mary.venom',
  },
  {
    avatar: 'https://ipfs.io/ipfs/QmcbmCyGL1x1JFa4mAAyZZ1CJDdTqdjYqKFWo7G4cx48cK/aichar5.jpg',
    vid: 'joe.venom',
  },
];

export const LINK_VARIATIONS = [
  [
    {
      type: 'donate button',
      title: 'Buy me a coffee',
      content: 'Thank you very much for your donation',
      styles: {
        venom: '0:4bc69a8c3889adee39f6f1e3b2353c86f960c9b835e93397a2015a62a4823765',
        eth: '0xBFd210db795A9Ac48D0C3be2a74232BE44144E84',
        btc: 'tb1qshvfpzfa0p46gztp00jwccf0c4kdfac72lmuz7',
      },
    },
    {
      type: 'simple link',
      title: 'Message me',
      url: 'https://t.me/venomid_network',
      styles: {
        icon: 'RiTelegramFill',
        size: 'md',
      },
    },
  ],
  [
    {
      type: 'payment button',
      title: 'Make A Payment',
      content: 'Thank you very much for your Payment',
      styles: {
        venom: '0:4bc69a8c3889adee39f6f1e3b2353c86f960c9b835e93397a2015a62a4823765',
        eth: '0xBFd210db795A9Ac48D0C3be2a74232BE44144E84',
        btc: 'tb1qshvfpzfa0p46gztp00jwccf0c4kdfac72lmuz7',
      },
    },
    {
      type: 'nft link',
      title: 'Venom ID Family OAT',
      url: 'https://testnet.ventory.gg/nft/0:e4244873c4ab215bbc8cec48ae4b35d427f1aeac33475795bce8efc76472ba14',
      image:
        'https://ipfs.io/ipfs/QmSoTZi3B6FXLRVBXhsTCwfYPnWMCUHpBc6HiVrGpuBU6o/venomid-family.gif',
      content: '0:e4244873c4ab215bbc8cec48ae4b35d427f1aeac33475795bce8efc76472ba14',
      styles: {
        scanLink: false,
        size: 'sm',
        network: 'venom',
        type: 'normal',
      },
    },
  ],
  [
    {
      type: 'youtube video',
      title: 'video',
      url: 'https://www.youtube.com/watch?v=-uLJa7MDHXs',
      image: '',
      content: '',
      styles: {
        size: 'sm',
      },
    },
    {
      type: 'simple link',
      title: 'Youtube Channel',
      url: 'https://www.youtube.com/@Venomid_network',
      styles: {
        icon: 'RiYoutubeFill',
        size: 'md',
      },
    },
  ],
  [
    {
      content:
        '{"address":"0xa342f5D851E866E18ff98F351f2c6637f4478dB5/55464657044963196816950587289035428064568320970692304673817341489687665059844","metadata":{"name":"Bat Country Convertible","sandbox":{"creator":"0x7a9fe22691c811ea339d9b73150e6911a5343dca","creator_profile_url":"https://www.sandbox.game/en/users/sandboxgame/cfb94ffd-e3b9-4681-850c-95a4c3e65f2f/","classification":{"type":"Entity","theme":"None","categories":["Vehicle","Monster","Horror"]},"version":2,"voxel_model":"ipfs://bafybeihx2ovxcebflt7dp7x3kftwbzfscgivh33sfqrekudqsm3n3c22rq/bat-country-convertible.vxc"},"description":"He who makes a beast of himself gets rid of the pain of being a man.","image":"ipfs://bafybeihx2ovxcebflt7dp7x3kftwbzfscgivh33sfqrekudqsm3n3c22rq/bat-country-convertible.png","external_url":"https://www.sandbox.game/en/assets/bat-country-convertible/6ac21f68-db45-4e85-9e1c-26dfabd5d0fc/","animation_url":"ipfs://bafybeihx2ovxcebflt7dp7x3kftwbzfscgivh33sfqrekudqsm3n3c22rq/bat-country-convertible.gltf"}}',
      image: 'https://nft-cdn.alchemy.com/eth-mainnet/c4d71c82a77944cd4f82e39e88d2a2b7',
      styles: { size: 'lg', network: 'ethereum', scanLink: false, type: 'complex' },
      title: 'Bat Country Convertible',
      type: 'nft link',
      url: '',
    },
  ],
  [
    {
      type: 'pdf document',
      title: 'My Old CV',
      url: '',
      image: 'https://ipfs.io/ipfs/QmUeSvTQtZiBoa344JvfA8ekeKFH8pRMk8sY3tBjDEG3d9/CV.pdf',
      content: '',
      styles: {
        size: 'sm',
      },
    },
    {
      type: 'donate button',
      title: 'Buy me a coffee',
      content: 'Thank you very much for your donation',
      styles: {
        venom: '0:4bc69a8c3889adee39f6f1e3b2353c86f960c9b835e93397a2015a62a4823765',
        eth: '0xBFd210db795A9Ac48D0C3be2a74232BE44144E84',
        btc: 'tb1qshvfpzfa0p46gztp00jwccf0c4kdfac72lmuz7',
      },
    },
    {
      type: 'nft link',
      title: 'Bear Market Builder NFT',
      url: 'https://opensea.io/assets/polygon/0x3C29F6B19bcbeB85d26460bB2f7Bd4cd065cE28E/0',
      image: 'https://nft-cdn.alchemy.com/matic-mainnet/2e664665ea294c94798de67894c608ac',
      content:
        '{"address":"0x3C29F6B19bcbeB85d26460bB2f7Bd4cd065cE28E/0","metadata":{"image":"ipfs://QmTNi5umYXWV2THy65WDUMszTdHvuQRsZ9RuUmR7GEJyFx/bear-market-builder.png","external_url":"","animation_url":"ipfs://QmTNi5umYXWV2THy65WDUMszTdHvuQRsZ9RuUmR7GEJyFx/bear-market-builder.mp4","background_color":"","name":"Bear Market Builder NFT","description":"","attributes":[{"value":"common","trait_type":"rarity"}],"supply":"98477"}}',
      styles: {
        size: 'sm',
        scanLink: false,
        network: 'polygon',
        type: 'complex',
      },
    },
  ],
  [
    // {
    //   type: 'soundcloud track',
    //   title: 'music',
    //   styles: {
    //     size: 'sm',
    //   },
    //   url: 'https://soundcloud.com/sam-walters-715497925/sets/trippy',
    // },
  ],
];

export const SOCIALS_VARIATIONS = [
  {
    discord: '#',
    email: '#',
    twitter: '#',
    telegram: '#',
    whatsapp: '#',
  },
  {
    twitter: 'https://twitter.com/Venomid_network',
    ylide: 'https://hub.ylide.io/project/venom_id/discussion',
    medium: 'https://medium.com/@venomidapp',
    zealy: 'https://zealy.io/c/venomid/questboard',
    telegram: 'https://t.me/venomid_network',
  },
  {
    soundcloud: '#',
    opensea: '#',
    patreon: '#',
    twitter: '#',
    spotify: '#',
  },
  {
    telegram: 'https://t.me/venomid_network',
    ylide: 'https://hub.ylide.io/project/venom_id/discussion',
    zealy: 'https://zealy.io/c/venomid/questboard',
    github: 'https://github.com/sam-shariat/venomid-link',
    youtube: 'https://www.youtube.com/@VenomID_Network',
  },
  {
    facebook: '#',
    twitch: '#',
    snapchat: '#',
    tiktok: '#',
  },
  {
    pinterest: '#',
    slack: '#',
    skype: '#',
    dribbble: '#',
    twitter: '#',
  },
];

export const WALLETS_VARIATIONS = [
  {
    venom: '0:4bc69a8c3889adee39f6f1e3b2353c86f960c9b835e93397a2015a62a4823765',
    ethereum: '0xBFd210db795A9Ac48D0C3be2a74232BE44144E84',
    bitcoin: 'tb1qshvfpzfa0p46gztp00jwccf0c4kdfac72lmuz7',
  },
  {
    venom: '0:4bc69a8c3889adee39f6f1e3b2353c86f960c9b835e93397a2015a62a4823765',
  },
  {
    arbitrum: '0xBFd210db795A9Ac48D0C3be2a74232BE44144E84',
  },
  {
    venom: '0:4bc69a8c3889adee39f6f1e3b2353c86f960c9b835e93397a2015a62a4823765',
  },
  {},
  {
    venom: '0:4bc69a8c3889adee39f6f1e3b2353c86f960c9b835e93397a2015a62a4823765',
  },
];

export const TOUR_STEPS = [
  {
    element: '.title',
    intro: `Please provide a title for your Venom ID by entering your name or brand name, for example: John Doe.`,
  },
  {
    element: '.subtitle',
    intro: `Please enter a subtitle for your Venom ID, for example: Content Manager.`,
  },
  {
    element: '.avatar',
    intro: `Upload an avatar image for your Venom ID or choose one from your NFTs.`,
  },
  {
    element: '.bio',
    intro: `Please enter a short description for your Venom ID Profile, for example: I love Blockchain and AI/ML technologies and currently am learning how to read and write smart contracts.`,
  },
  {
    element: '.wallets',
    intro: `Your Venom wallet address is added to your Venom ID, You can add your wallet addresses from another chains, for example: Ethereum, BTC, Solana and More`,
  },
  {
    element: '.links',
    intro: `Add your resources like Headings, Texts, Links, Images, NFTs, Youtube Video, Soundcloud Track, Donate or Payment Button and More`,
  },
  {
    element: '.socials',
    intro: `Add a social media link to your Venom ID, for example: Twitter, Instagram, LinkedIn, Github and More`,
  },
  {
    element: '.add',
    intro: `Add your resources like wallet addresses, social media links, Headings, Texts, Links, Images, NFTs, Youtube Video, Soundcloud Track, Donate or Payment Button and More`,
  },
  {
    element: '.design',
    intro: `Design your Venom ID the way you like it! change the background color, customize the buttons style and font. change the layout and other settings`,
  },
  {
    element: '.save',
    intro: `Save your changes to the blockchain`,
  },
  {
    element: '.share',
    intro: `Share your Venom ID with the world`,
  },

  // ...
];

export const EARLY_ADOPTER_IMAGES: any = {
  explorer: {
    src: 'https://ipfs.io/ipfs/QmRdewFUw4jxTWnoVMSVLyQ7WmahWUMxDrCVYEwL7TuUDq/crypto-explorer.svg',
    type: 'image/svg+xml',
  },
  pioneer: {
    src: 'https://ipfs.io/ipfs/QmQ98JMocRupVnixhGcVupmDdmuMxXdsq1ozPyNhskzqEh/venom-id-pioneer.svg',
    type: 'image/svg+xml',
  },
  family: {
    src: 'https://ipfs.io/ipfs/QmSoTZi3B6FXLRVBXhsTCwfYPnWMCUHpBc6HiVrGpuBU6o/venomid-family.gif',
    type: 'image/gif',
  },
  geek: {
    src: 'https://ipfs.io/ipfs/QmPgY5KJ25cBmG4H4HkF6DTgxQ4gaUtzfChS8wS8EXScgH/venomid-geek.gif',
    type: 'image/gif',
  },
  identorian: {
    src: 'https://ipfs.io/ipfs/QmYK9CchybNS3HxrgvgxnKGHCzeRVwNZV1cmiLGf4qpx4m/identorian.svg',
    type: 'image/svg+xml',
  },
  maverick: {
    src: 'https://ipfs.io/ipfs/QmQt3CTiZEwDdrAW7ebSM7QX7ZLYts6nWfjfh36xB4iWM7/venomid-maverick.gif',
    type: 'image/gif',
  },
  champion: {
    src: 'https://ipfs.io/ipfs/QmSdjoBfigMQu2yGpMj5Fhd1xFQFYoTUVTLjUZjGcpnmee/venomid-champions.gif',
    type: 'image/gif',
  },
  earlier: {
    src: 'https://ipfs.io/ipfs/Qmb1huuaLMpA3JodFysEqpWc65vy4NkXfuix5mYkvaBkJE/earlier.svg',
    type: 'image/svg+xml',
  },
  catalyst: {
    src: 'https://ipfs.io/ipfs/QmUYe2xS43JB9d7qNB4KyU9ptGCJ9KG5bJcPj7rkdmfqxg/venomid-countdown-catalyst_nft.jpg',
    type: 'image/jpeg',
  },
  spring: {
    src: 'https://ipfs.io/ipfs/QmNt4zMpdSUtZ8p9ZQPWZy3U4anh9Pb6BxvUZzpFwkEWyk/venomid-springburst-nft.jpg',
    type: 'image/jpeg',
  },
};

export const RAFFLE_IMAGES = [
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(4).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(12).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(39).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(58).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(80).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(119).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(139).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(153).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(192).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(197).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(204).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(230).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(260).png',
];

export const RAFFLE_IMAGES2 = [
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(3).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(11).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(38).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(57).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(79).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(118).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(138).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(152).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(191).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(196).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(203).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(229).png',
  'https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(259).png',
];

export const RAFFLE_WINNERS = [
  {
    date: 'April 22nd',
    day: 1,
    txs: ['01292907552163a26a02f8181d4146b8faca18941f03a6c56688a386ff9ffa51'],
    winners: [
      {
        owner: '0:f25ad30d0389bf5cd8b15dbc4b29c816226832095d9ea55fa04fbf8063b112d3',
        prize: '40 VENOMS',
        tx: '01292907552163a26a02f8181d4146b8faca18941f03a6c56688a386ff9ffa51',
        name: '',
      },
      {
        owner: '0:be7b8f4fed809c72aba75f4c0a6e282354c7d5f8d9e9de82ec64eb6706d7a99a',
        prize: '3-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:36e661787e4019445567f4daaf01abe319d47234305defb3b1cbba88e3396ec4',
        prize: '4-char domain',
        tx: '0:03404ab6dd18b9c0c578ae9b51149cc2aa50beb6f0259a1ddece4fa90cbd77ad',
        name: 'bbbb.venom',
      },
      {
        owner: '0:9191121b39eb43bb08a6cba8b3cbe264766cfd7db8d5c83a1e9cfe42efcce91d',
        prize: '4-char domain',
        tx: '0:3cfa67e3ff25021900590753b931f6b0a4e0a6fd5597af1cedd303b89ceca1b2',
        name: 'cucu.venom',
      },
      {
        owner: '0:8f500a081d6fd947d2c3b5ea6ea525eff81e56129d65364f2d01ed7eaecc934d',
        prize: '5-char domain',
        tx: '0:d38214671488a2bcfd4fe5e47e5f0dce033fe36e4a3cc80911d3ec41d0f7871e',
        name: 'fvkvenom.venom',
      },
      {
        owner: '0:e4c0bb703e64873086cb468a9d7324ca23fcaacd790763c2849fe45d7ab0e84e',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:533f216d8581e78131c2bdba43d66d5f7a7d867a8027774d974df6aa15541b6c',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
    ],
  },

  {
    date: 'April 23rd',
    day: 2,
    txs: ['075bdab5e43024a897647613d5ada1683814ef3d6bb10d1eb6e6812e90f2b8c4'],
    winners: [
      {
        owner: '0:14d7aae23c0b9abd969f3104840d6b35271925a54e9ea91b7f16939e5f055b83',
        prize: '40 VENOMS',
        tx: '075bdab5e43024a897647613d5ada1683814ef3d6bb10d1eb6e6812e90f2b8c4',
        name: '',
      },
      {
        owner: '0:d087d630d89efa48ddf71e6bf552136404f167ac5dd01d8c9591f0561ab4a081',
        prize: '3-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:d98457456ea54b39d1691d2b0525cc9625260d818678d3d1e2a426eca93cedd8',
        prize: '4-char domain',
        tx: '0:4a7e14dd8c5f88c62a198911a46cb26301a3cdbdce602d1220f6fc0d9300f888',
        name: 'rune.venom',
      },
      {
        owner: '0:733d008614af9c8b341f088931ea6d40a1067fd4949b35f07a940945f702cf23',
        prize: '4-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:a5f58c82b766b9cc97c609ca6b5096a15bd29b235ff98904039dfd93a0a35888',
        prize: '5-char domain',
        tx: '0:77f4f98125ac412dc08459f2f1dd932c907ede4f0be00c9d58cc766f4c2f1d20',
        name: 'veres.venom',
      },
      {
        owner: '0:bb729d97156ec8ffcedf2823ffe0d50763f326b00c91a434d321d323c7c054ad',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:5dde0d725fc9f839992d12c04a7903070688106d91c922cd299333c0fbf8906f',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
    ],
  },
  {
    date: 'April 24th',
    day: 3,
    txs: ['647bc797158b0590bf3d8d32fe40190b1da323d5baa64bfd76ec01b625834254'],
    winners: [
      {
        owner: '0:81c6954e467897cba30b77ef708f58c234275ae8903fdc163d975cb1f854e0a8',
        prize: '40 VENOMS',
        tx: '647bc797158b0590bf3d8d32fe40190b1da323d5baa64bfd76ec01b625834254',
        name: '',
      },
      {
        owner: '0:6a003cc55aa6c4bba516dcff83385b55a5f4a0b4fafee92812678988052583fe',
        prize: '3-char domain',
        tx: '0:dc3ac5d5c33b44ab506c988d2ddb9aafa4df94b120f67d69c71014e886998def',
        name: 'not.venom',
      },
      {
        owner: '0:cd8b606d1f0f0ca96cba7ca666c164b19a40155402c77fa86187ea4a883e8b73',
        prize: '4-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:a05dfa01da9c6fbda761f7462ad37666c1de3af9d54ec5e6ad28d5e9d9f8a319',
        prize: '4-char domain',
        tx: '0:2ef6dcf13cb61604bf8d602606db275ba3b089d4c8d1965598366c7833d8a8e7',
        name: 'dado.venom',
      },
      {
        owner: '0:17826b649611f907b02163b36f33f16a79ce9afd29ffb6b9768ff9cad38bde5a',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:00d6d867baf113a9fb580a37f77d0fcd444cff2e203438626b290a27702e97c6',
        prize: '5-char domain',
        tx: '0:1b8bc6afded444d343066dad64c3749a87210bb2547f7b3d8d8a9a8f1f90c915',
        name: 'darkeh.venom',
      },
      {
        owner: '0:ab5e2796764d83cf9a08bc4cf341b38ad05a0703332846c9ddfa9dbfa067fbf2',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
    ],
  },
  {
    date: 'April 25th',
    day: 4,
    txs: ['13f1d8944416f469a06a2bc5859c4388b68d9da4d786cb4d93832996f0e67ea2'],
    winners: [
      {
        owner: '0:97f15f93a3702c9e10e3ced20451c1578041b0fe7b5ec0ffa2ee7173b299a13e',
        prize: '40 VENOMS',
        tx: '13f1d8944416f469a06a2bc5859c4388b68d9da4d786cb4d93832996f0e67ea2',
        name: '',
      },
      {
        owner: '0:6973cd2fabc41cd7720b702f8c95084e411ffb4bc990675cfe59e94553d627ec',
        prize: '3-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:202041e620b76f87825bd6ef01e13c98c8af4499729d4d1269dafbacd6892e3f',
        prize: '4-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:df5eaf75a9690b29272a985cd0b735cb9496846065580dcb21a3a72d6368835c',
        prize: '4-char domain',
        tx: '0:9118debd2a0e84dc50077acb31069712397d69036007e3ceacb4f0da31a0e4b8',
        name: 'prima.venom',
      },
      {
        owner: '0:fecfb92632ed19cea3c44e047e22169783e96d75070fc1ce49b1e56cb107eef3',
        prize: '5-char domain',
        tx: '0:3fdea9f48e128e66fd3bb96b45e15cbacaf632c48c2cc2bfa933935d0d15e593',
        name: 'smart.venom',
      },
      {
        owner: '0:a9e29e800f11372fb8368992ef7c0c4ed1983019bb421071786ef79b98dd2136',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:619f50935efa6c7731328ab510b293ba138f5565a03a07b85263b17d5c3ea01f',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
    ],
  },
  {
    date: 'April 26th',
    day: 5,
    txs: ['59047466df844bf64ff4cd6d7e02d0fccb6476fc906a968a56d83d0a2c0353f1'],
    winners: [
      {
        owner: '0:868cc927e565cb3ac210b2157cd8e05d3db415837febf54c2a80ebef1a454e3f',
        prize: '40 VENOMS',
        tx: '59047466df844bf64ff4cd6d7e02d0fccb6476fc906a968a56d83d0a2c0353f1',
        name: '',
      },
      {
        owner: '0:c3db2e6229f15253255f588eb9878f3f9e52c026d9e4f22065f8ad80a3f37531',
        prize: '3-char domain',
        tx: '0:655ef32800d8dca233aa7c58770366a61cac216e45a2b31a0f78ddf08005c094',
        name: 'xyz.venom',
      },
      {
        owner: '0:e835e64ce6f0ddd37f35abb13995c9c6320f22070f98393aaafff2771ac2c835',
        prize: '4-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:1855dc8b9b7dc88eb429964884ece0491e0ddb90c7deb2fa14653671dd75bd12',
        prize: '4-char domain',
        tx: '0:165c7c4380e3bf141a1c5ac5ae1587511d37e96dfaa8173c3ec00793c9f4f9ad',
        name: 'mars.venom',
      },
      {
        owner: '0:42e74d55a40719df55ea84b837284ae0c39731ced9da315d07a33b66e4f9d0e3',
        prize: '5-char domain',
        tx: '0:2ce049fe4eca9230a0c056c2ab7e8963884230547ce21d797bb55fd36eec490e',
        name: 'sixtozvenomnetwork.venom',
      },
      {
        owner: '0:3356e2effcd339e68b50f3fd2c3983d4e90b6f7bed66f7ee05939e477b55db55',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:03576331659a029693f82143a7754d3b7fbf4b347fd4418c858cb1815749cc7e',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
    ],
  },
  {
    date: 'April 27th',
    day: 6,
    txs: ['2d31a73663a22c770bb84970a66e18ff3ac9d77a0109e8d79702992bb5838145'],
    winners: [
      {
        owner: '0:58d4aed21db20fd7aafb2f2e71e218d5c62979218e22c03a2adc338daf74efc9',
        prize: '40 VENOMS',
        tx: '2d31a73663a22c770bb84970a66e18ff3ac9d77a0109e8d79702992bb5838145',
        name: '',
      },
      {
        owner: '0:8340ba153efffa5f567561768efd553dba501cf7d6780f1636c2dd59677fb01b',
        prize: '3-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:6141ecc2a6740d0f2ee6f4a23ef758eeb6a6a2910d7672be1c797a61717e89ef',
        prize: '4-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:9edae1366945a6e372a3fdefdfba4e7c7edcc2338747209588e1fc9049c5961f',
        prize: '4-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:7faab89f5570520e6b833b1914b2e308ffa624c115daa6aa7fb771991faa214e',
        prize: '5-char domain',
        tx: '0:56017add4444ec7ce89e7564509bb6c654b4e31590f4cc24e32d9f58390040a0',
        name: 'daddy.venom',
      },
      {
        owner: '0:33291ac5c53ad600f40d4051bbce93b37ed5e5b5d2ac998c22483845ac9db177',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:de358f4ebc0861bf900c4920a26bb1141a6763ab35b3ad88a6b900dd791166f1',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
    ],
  },
  {
    date: 'April 28th',
    day: 7,
    txs: ['04b4af9a4392d7fd79cd1075756715f728960c26e6b779679b7d5a164ea1550d'],
    winners: [
      {
        owner: '0:26896600ff041f7ea1c9f8e1399db99f8bbfe85945e457cf04de17670f6bf167',
        prize: '40 VENOMS',
        tx: '04b4af9a4392d7fd79cd1075756715f728960c26e6b779679b7d5a164ea1550d',
        name: '',
      },
      {
        owner: '0:f9e3877be6513168c723322c70ef4d4af01803585b3743d3b4d7272551cba601',
        prize: '3-char domain',
        tx: '0:df736e0e3e57de7d7065b0f5959953dd6064ee06df80a2f55a39ae0d536e3557',
        name: 'hafid.venom',
      },
      {
        owner: '0:99bb9467057c4043447358783b4aa6c96dee8f8be0ca9654432336f753f0e9ca',
        prize: '4-char domain',
        tx: '0:5bce2cdf2cb02dc0a2bb26ce0a103ec5c79649e2c1590ab705d7121d7eb17ad7',
        name: '8888.venom',
      },
      {
        owner: '0:23ec69a5b4dd89c0fe93612ff77cd8be8b471ac621dd6022afeb3f7e7322df53',
        prize: '4-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:cd8b606d1f0f0ca96cba7ca666c164b19a40155402c77fa86187ea4a883e8b73',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:4332c468cfa7cb84f3f62d4218e2965025495c938feacc4ae36249ddb13fe1dd',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:c933d8ebb8170382ed5a7080d75be1c2a1f5443c638706b0b252ea8f615b18ed',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
    ],
  },
  {
    date: 'April 29th',
    day: 8,
    txs: ['f9795edcbe022d3b29c0e46186f9f6d8bf35be8981489b16050fcf464881f5a8'],
    winners: [
      {
        owner: '0:b757a69dcae7e715a107ed8f4269aba7fa7e3cde5292e1e0cb0b619b8af776d5',
        prize: '40 VENOMS',
        tx: 'f9795edcbe022d3b29c0e46186f9f6d8bf35be8981489b16050fcf464881f5a8',
        name: '',
      },
      {
        owner: '0:66058afe5c4fffe62bdc262d569c39a87b62a07b23a02990073010f387d17950',
        prize: '3-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:00d6d867baf113a9fb580a37f77d0fcd444cff2e203438626b290a27702e97c6',
        prize: '4-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:e068ac39fd15217fa520c81f68c0997def7c274128c346ecdd151728c7247ca0',
        prize: '4-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:8ed63343f2cf0d4064b8ea2498cbe8d7d0858ae97d172e73c8b0bd3255192510',
        prize: '5-char domain',
        tx: '0:5cff38ac1ded437e03742bc6b808337b6aa5bdf7ebbda9ee5fd0ff94863281a0',
        name: '00002.venom',
      },
      {
        owner: '0:58a590bc90e8de51165b52034240508dd05d7011c9af4ac966afcf34df392a17',
        prize: '5-char domain',
        tx: '0:3cc3ffc1089e619a777d10b5ece4035ebd668797ab7f14e8d1d95f0158e00ed0',
        name: 'catts.venom',
      },
      {
        owner: '0:f815ed37b16ea15922f1dc62274b9cc17f0f4128fcc89ae2c47093af26817096',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
    ],
  },
  {
    date: 'April 30th',
    day: 9,
    txs: ['d80e4820b1a46bdbdef85bc3d1735c0ab67788b3968c78f66d7d83d051f84f95'],
    winners: [
      {
        owner: '0:4516edead8c3cb93b0bbbb4e385172d77329caca4d8675f08e48be923bb40329',
        prize: '40 VENOMS',
        tx: 'd80e4820b1a46bdbdef85bc3d1735c0ab67788b3968c78f66d7d83d051f84f95',
        name: '',
      },
      {
        owner: '0:9bf296149260b8fc947638406dab8aafd71ceb008a026138643a17cf679a2377',
        prize: '3-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:a050600f516251c75a9dafd15c65ce3d9bb06b34f8644f391bbca3c501dfda19',
        prize: '4-char domain',
        tx: '0:775e185097803b61563f4b0d789842cd59202de75bbfeafe0e12e3a4cf1ffad8',
        name: '7777.venom',
      },
      {
        owner: '0:56cb4d8fe48ebef61a635806acfc87a9e8b810c969748f75743e8838ab3c08aa',
        prize: '4-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:b1337a06eda59a43c73b41f50d99117675884fca14e4e32b26258bde4c764312',
        prize: '5-char domain',
        tx: '0:54c5928ab0d53df2dbd5d514fd9191298f6eeee0009d6cf098567ad1dfcf2f75',
        name: 'charx.venom',
      },
      {
        owner: '0:10e2f4674282efb68c2472a4ebdc0c453b9467d717ebc5d2e71dba32bcf9c061',
        prize: '5-char domain',
        tx: '0:a4bfa24c869543a3c8cd69aba003d8b988efd372efd9f94d8e16d554f7950650',
        name: 'ifree.venom',
      },
      {
        owner: '0:24d0039f8281769cf400b98341f0e73b1a9115cc4e879d17bd941dc7f7adcd40',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
    ],
  },
  {
    date: 'May 1st',
    day: 10,
    txs: ['efd896cee6dc4fcaccb09aa25857f6438e3d68f455241e3bfe3bf0713ba8bdd9'],
    winners: [
      {
        owner: '0:b9abb2020d66c03dd606f9a3f9a05faf281b773affe3f8e176b3461a6240c21e',
        prize: '40 VENOMS',
        tx: 'efd896cee6dc4fcaccb09aa25857f6438e3d68f455241e3bfe3bf0713ba8bdd9',
        name: '',
      },
      {
        owner: '0:cd30dcb71928f196b58fb7df9f5e3be96142f744d42c4c6b99e87942c0460805',
        prize: '3-char domain',
        tx: '0:53f1ec1bfe4bfbf96e7783c83968b4adfabffd77b9e4a72fa16f3a649ee9b2c8',
        name: 'v18.venom',
      },
      {
        owner: '0:67e791aa0170ea44b14528fe8564ddee9c3466ec0e7eff35fcc38e3cf10108c2',
        prize: '4-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:e5f9c7fcdf9fd0e3af33b2731fe207d1d6604dec94d862ced2c993cdd062e717',
        prize: '4-char domain',
        tx: '0:23a2236d6b30adaa05c285beef042abd05d364effabc1e14a7e75b17b1aa9dc4',
        name: 'rave.venom',
      },
      {
        owner: '0:9b69fdd68748944d449bfed5fe4c66961769ac579d23b5d7748fa20922c23bf6',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:01ea56c617604e8edc923d2d57a29bd108f6e8f0d143dff57af11fb860e75f77',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:9c402ea498f5c52d7aedacf7e907de73b2f2550ac1e54fca71e7ee07c4837d3c',
        prize: '5-char domain',
        tx: '0:8b119d5c08cfb4d0e23c8e0e401ab5154be79eaeb3abfcf0db3e88f3118980f3',
        name: 'gam3r.venom',
      },
    ],
  },
  {
    date: 'May 2nd',
    day: 11,
    txs: ['919698364411dcd6870d980cdbededcfba37c167dc8b8a217a38d25cd53ac775'],
    winners: [
      {
        owner: '0:a60bd9fb90dc79ee77fc4b8441640685b4132d0304a13c6b0cd9c17efd66a4b9',
        prize: '40 VENOMS',
        tx: '919698364411dcd6870d980cdbededcfba37c167dc8b8a217a38d25cd53ac775',
        name: '',
      },
      {
        owner: '0:29c49bcc18f96d22edc5805340d56b7b467f85a105b6a3427a091935eca68ef5',
        prize: '3-char domain',
        tx: '0:01e04e3f64de90ca0dba4886a2343770c124ca7f1384a5e3f9eb5506402ae4e4',
        name: 'www.venom',
      },
      {
        owner: '0:6d9849d5b51d79c277f49a3f5394e148191e36226f50a2a0d1e216234ee9d3b9',
        prize: '4-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:326e3f81f9ee452f96f805a9990ac3e0e468d57ea4873c993a8b40d0d4d199cc',
        prize: '4-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:b065889422ce4cb6d0abf7b41ed7dc65775c70a7ef7df4197d60c721c82b344a',
        prize: '5-char domain',
        tx: '0:9c0a0018271daef5af87f8e419bb09521da7a50174dfab93c04ef4077f87a11b',
        name: 'honey.venom',
      },
      {
        owner: '0:21aefb77d452a1472f1b07725ee3ed51991f2036179ad187ddf2a354cb538928',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:26e8a15b8faed74c56ae2c2c2b44eacb65b679e548290ad20b08345b2a34a1d8',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
    ],
  },
  {
    date: 'May 3rd',
    day: 12,
    txs: ['da2cfa95f6e47abe72265b56be3689b14dbd2fd574746436ed22749e0c420684'],
    winners: [
      {
        owner: '0:5718eb4db2ade139d1ce3067399c4f298720a6718f80f2aef7fdbcc8fd8a93ed',
        prize: '40 VENOMS',
        tx: 'da2cfa95f6e47abe72265b56be3689b14dbd2fd574746436ed22749e0c420684',
        name: '',
      },
      {
        owner: '0:940fd8bf337b8c0e0f8285b81555b83acef1f4e0bb93ab9fe198da6ce28ea53e',
        prize: '3-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:0d373a9cc3b2eb7c99455d76cfd8b1e3fa3a36b44aca48ea1e19d86e61eb0eb9',
        prize: '4-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:c172d2865ce54029a1d4fad14726d2fe71e1da859c002a8136fb86f0a5069882',
        prize: '4-char domain',
        tx: '0:3613e6850578023c4d362b1f0365fc559545a60215bed1edca19bdf8043e28d3',
        name: 'baba.venom',
      },
      {
        owner: '0:b37fb4af222ea80e7d96099ed2827145ac8aa2f596119a8254ffe6b10d31d675',
        prize: '5-char domain',
        tx: '0:d6131ea99e66f674401e7615f5c74670544061dc833d14790b4d89629aaf2604',
        name: '0x888.venom',
      },
      {
        owner: '0:b9e362f83db13f9f9a530d982eb9d0e63a0742e7e87efc0c3533d7a38b2c1ccd',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:72768de9553b46635f148003701ebb84491fde2bede1b9750121e9bd32d892b4',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
    ],
  },
  {
    date: 'May 4th',
    day: 13,
    txs: ['1ce8cd9d8c6c1fafc21f997413dc25cb36125cf47da24bb84fda84a11586ebc5'],
    winners: [
      {
        owner: '0:e7933da162e4539563edfef9495ac3fb6ed39e7ca85defcccae6503e50b53cbb',
        prize: '40 VENOMS',
        tx: '1ce8cd9d8c6c1fafc21f997413dc25cb36125cf47da24bb84fda84a11586ebc5',
        name: '',
      },
      {
        owner: '0:74917062452044fa9068e94480a518c5fc0febca3435857a73c7128f5ff74820',
        prize: '3-char domain',
        tx: '0:0b8e0e7358a18eb4cdaa0360161c5dcafed7b1c9a2f0026b9e40c4d54669df8a',
        name: 'vip.venom',
      },
      {
        owner: '0:e3777a263643bf940196fd856e432ae2be7b11e5c26ddff1620637e4a6d3ac16',
        prize: '4-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:203703a6a3c2747a1bde8444287d235bc1e0812ad9ef114b666190ff06e3d1c2',
        prize: '4-char domain',
        tx: '0:7d7e2a45e3c7980f9202f244ba83de39775815d43efdb291f5fe6ec4977ba127',
        name: 'lion.venom',
      },
      {
        owner: '0:b4f4f5f37873a5f7afda4c8b84feadcd6941acbe7eab538e0258d6cb68e4c4d0',
        prize: '5-char domain',
        tx: '0:bb157040427129415f0c6f408cc08189e03e007cb6dc61f0d3c7cc3f1246b202',
        name: 'trash.venom',
      },
      {
        owner: '0:b6b33d4631523d0504787202a4b67c9f7a1674612f1e4c9f3ddbbdf68c99063e',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:16d1e4c13934f92a4f1522229c4f2774dd43f81feefb0faa69a5ffb1f81d6f40',
        prize: '5-char domain',
        tx: '0:f694e84a3149932e6f681f5b8db32c061840dd5e5b66cdf21b9f31b5b562d100',
        name: 'runes.venom',
      },
    ],
  },
  {
    date: 'May 5th',
    day: 14,
    txs: ['a92c893018248a85c67ada46a15d24d238f68e6ce3caf4fb90aacb32cc3dbd00'],
    winners: [
      {
        owner: '0:107e86f498d4c7be5d86548c50767c79e66a9e92912f27b2bc458b709a30d79c',
        prize: '40 VENOMS',
        tx: 'a92c893018248a85c67ada46a15d24d238f68e6ce3caf4fb90aacb32cc3dbd00',
        name: '',
      },
      {
        owner: '0:0472b2b7dbb0bb245ac0d855674addd3a2b14b5f9648225879d94be1fbda4861',
        prize: '3-char domain',
        tx: '0:aeb3f2b977874be0d2aa96b6eccfa6c9ec0e9db02a97d4c5791739135b8f940d',
        name: '667.venom',
      },
      {
        owner: '0:a18a50590d5a60f0275ff0dd24f895a99a5d351ec69970aea55a243995df7204',
        prize: '4-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:cae2624e38257b0161691a68329ac6d4d7680e14de4c698c71e9a8e5c381c06e',
        prize: '4-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:e11c5ddc734873f3c101fe7923cddd27d1c714d1cdbc4a2a35f7e3edd8aecf61',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:5bc6784c9f15c41118c2c926ff0aaa5823fc3df87cbc142028023e8c1f5556b8',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:65ec578190fe0ca030b4ac15ad6d31f4e9d6c192b2571e08482a7978d2e62a38',
        prize: '5-char domain',
        tx: '0:e1c3a98e8d0bdbe5d9fdf5bc4379d223308a993bcca1ced59b398c47fbfa243e',
        name: 'lions.venom',
      },
    ],
  },
  {
    date: 'May 6th',
    day: 15,
    txs: ['57e1c396b07ec1a1e59b4514ba92409ac301a56597fe8ecb85aaa99e5c990e53'],
    winners: [
      {
        owner: '0:8ed63343f2cf0d4064b8ea2498cbe8d7d0858ae97d172e73c8b0bd3255192510',
        prize: '40 VENOMS',
        tx: '57e1c396b07ec1a1e59b4514ba92409ac301a56597fe8ecb85aaa99e5c990e53',
        name: '',
      },
      {
        owner: '0:3c44b265031539b92af98c2c3b4db3bf64d0f696fd6099552d8b8011d5ebb4f7',
        prize: '3-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:869b427caf160c973e4b3353396d0593e9f1168b1f181eab650cbde398dc7353',
        prize: '4-char domain',
        tx: '0:56ad8966cbfb0cad74cedd6bd55e9c3d895f689a7dbd6bba3aeeacb08c40606b',
        name: 'moon.venom',
      },
      {
        owner: '0:42266e99cc007b523544eee5cb9be8d20f2082c0b9d62b9aaf60034ce2b73deb',
        prize: '4-char domain',
        tx: '0:b804f2cb415ee163def5039e03c1358759e654c9bde923442769d10bf8740787',
        name: 'aceofz.venom',
      },
      {
        owner: '0:54bd8f629133336e80a42cafee7555e2638a980ac11e9f3251210ba98b1aa58c',
        prize: '5-char domain',
        tx: '0:eaee13afe083bd52ef6a71cbdc8b0a64d2ce91f92f995fc4b9ac6389e1b7f990',
        name: 'toxic.venom',
      },
      {
        owner: '0:982f2a2d2a57a0c215f0368497d44182eb0d21ecb5be89ff43d5aade7bf116c0',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:32f4bcf5ed33f6084018aabeb1fcf6d5751c7a1f02c6bd1813edb7c38f0b9197',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
    ],
  },
  {
    date: 'May 7th',
    day: 16,
    txs: ['b39b39de8bd9a713760fb5bc3bb444d23cfbd177a8c48e3909f14f59a517bc19'],
    winners: [
      {
        owner: '0:399105551b960a0d42128d2dfe893260519c29df49818da68f22bb3566676fb8',
        prize: '40 VENOMS',
        tx: 'b39b39de8bd9a713760fb5bc3bb444d23cfbd177a8c48e3909f14f59a517bc19',
        name: '',
      },
      {
        owner: '0:e99d4a326f90e24edc7e76c6e4a3e8849dbe4b1178b8a3bfa93c4cf9fa3f955e',
        prize: '3-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:e5b05b2b7b6bbb32cabef8155a6fd68276c8bae633db5a2359b0011fbe7df4a4',
        prize: '4-char domain',
        tx: '0:c05d4e665f499a17aca27dd9a6dffe60692d556da525b85e55fa7cc3ee19e6ff',
        name: '6666.venom',
      },
      {
        owner: '0:995f60a4dbe426b2a2762312d216eebd190abc8c175c7265f92c297e051217a4',
        prize: '4-char domain',
        tx: '0:5abc430ea83edda3403d64114f897401fef67885eeecf185c561187d4ea744fa',
        name: 'mayc.venom',
      },
      {
        owner: '0:eac96499b3c3e1a48754eadbad2d87fd3045e6960693191e277bd9e241389ef5',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:4cd2c8ef07afdbcf701a5e39e53ce75bb466f300ce9084cb85d33c716b4f30dc',
        prize: '5-char domain',
        tx: '0:ec330c7f4b2ce357a9ed0c65d78962e25036eb25ccf88485737b5c120317eb98',
        name: 'toros.venom',
      },
      {
        owner: '0:14d7aae23c0b9abd969f3104840d6b35271925a54e9ea91b7f16939e5f055b83',
        prize: '5-char domain',
        tx: '0:501b1ad5a1a818e372dc0576cde4e29ee8df540a6baa6b4fec7842b917347e5a',
        name: 'boyka.venom',
      },
    ],
  },
  {
    date: 'May 8th',
    day: 17,
    txs: ['be7e463c9a9bc004709543a52af883090ba14462ff86aa4502b5e01e3965bae2'],
    winners: [
      {
        owner: '0:c9d3cf47d5e200c98ccf7b775ec73f640cf90e1eae8f212d15e36d37e4a42d32',
        prize: '40 VENOMS',
        tx: 'be7e463c9a9bc004709543a52af883090ba14462ff86aa4502b5e01e3965bae2',
        name: '',
      },
      {
        owner: '0:7ea3372b6ff546d8a2ae82e7ba67edec9fe0a58971cd49a36f787cb282ef505a',
        prize: '3-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:5711679296a7c70b4b5252ce70c3dd30e17a0ba29fae293dacc389ddbe638a97',
        prize: '4-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:7db4b10c1f3ab8cb8c19426eeb8b8a10c5a04e53434ed9d98de786be38fc01fd',
        prize: '4-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:f76421fcc23426bcaf0cf8071b4f90858acc26961f13a8e32af8b337bd6b1558',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:6df28067b1aa9b875c7b0981e743599142fd4ccfb1b0894b367c0e097f0d28cb',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:6ec8c37cd8e3cd397484b35692e5ada59591fbbe3ac97de6ebe128295d967cf7',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
    ],
  },
  {
    date: 'May 9th',
    day: 18,
    txs: ['63ed95638e9fb77331e2223b0942968b51ac3744611bcd2032dbf1fe9990fdc8'],
    winners: [
      {
        owner: '0:1f999757deaee3082de3558b0e0f0640f39390fb871a806220590240fe206b02',
        prize: '40 VENOMS',
        tx: '63ed95638e9fb77331e2223b0942968b51ac3744611bcd2032dbf1fe9990fdc8',
        name: '',
      },
      {
        owner: '0:a60885229dadfc9ba9873b25df7e1b3e5935fc08bd896147dde7ad7ea735a173',
        prize: '3-char domain',
        tx: '0:c8abe5c0b11de14f07db8d4fa300d04426c3b3ae2d8463e11d25f5c00ae7e734',
        name: '007.venom',
      },
      {
        owner: '0:ec1adc7a910b21b261da24c7d8e33dc9f0f070ae40bc2798d8e048ceb3e3588b',
        prize: '4-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:ef14372b8d6a0fb2727e8acba00a0fe44b5bcce8423bc4ea48b89efa2ff18f33',
        prize: '4-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:7561b4d3d519a34a28dedeafcd5ca35d89e7553b726e10d7d581823467fa3e9c',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:960ad847b82efa32e076c318da6acdff63337325dcf6b5883c1acaff0fc6bb88',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:b116d8d61e6b71fd4e7f38cf0d5f0921a2b4872ebdccea0868d4c15c992482a4',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
    ],
  },
  {
    date: 'May 10th',
    day: 19,
    txs: ['ea77c81d064f240d2df5853ae76c6f816f06f84b2d2bb23d11d699aebbb02634'],
    winners: [
      {
        owner: '0:3601e9bd7042cf51a1271208b7667e38bcefebcb8f9fe217b872e9a4a4674822',
        prize: '40 VENOMS',
        tx: 'ea77c81d064f240d2df5853ae76c6f816f06f84b2d2bb23d11d699aebbb02634',
        name: '',
      },
      {
        owner: '0:cf7e19c72302483a331da960a8d85014285fa9522a2cc169d3d4eefee6617537',
        prize: '3-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:389557204dc73d5a9dc161c5fd309260011b73c7b574f09c9e17bc3ab3052138',
        prize: '4-char domain',
        tx: '0:b9993a0f7276bcf91cb9bbcaba510f6dad554c61908284803401a796160e4c6c',
        name: '5555.venom',
      },
      {
        owner: '0:07035e4acd005b576c7a02b92a71feafe6a1d016b7b9bbb55e418d6d26cc7e11',
        prize: '4-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:b4b87997cf1f4297a6fc6fb837af4a3e11a5db5feb83f4da6a1fee9eb3f2c50d',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:b9abb2020d66c03dd606f9a3f9a05faf281b773affe3f8e176b3461a6240c21e',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:7e3635cf2257e58128b97d4a1105dc77fb5311a0b7e56b645dfec4a6a102765c',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
    ],
  },
  {
    date: 'May 11th',
    day: 20,
    txs: ['0bc3076fb8a7285a2f6f10df14c0f3741b6a636f58e22b9cf417e4828cf2dcfc'],
    winners: [
      {
        owner: '0:58708285eeb4e8b6f99865437c9553b5f68ee118ebaebed90542d17bdc25842d',
        prize: '40 VENOMS',
        tx: '0bc3076fb8a7285a2f6f10df14c0f3741b6a636f58e22b9cf417e4828cf2dcfc',
        name: '',
      },
      {
        owner: '0:e6d5d2c8ea6287c3e032b33f582f85a98cfb4abf57eb1757aa0aab8b0055cd2c',
        prize: '3-char domain',
        tx: '0:7eebcc65240b7d1d9c8114ee62ae26d4625ef8e232c7104cd2d49fc713ca8250',
        name: 'xxx.venom',
      },
      {
        owner: '0:7bd18e4142ffdaa5f3db7bfadc0adbd827e05b5977766abf1ef45d9ced37ce1e',
        prize: '4-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:177a4d360c229fb8bf25463d460336ba485b91e626378af1f2f1e6be0898669a',
        prize: '4-char domain',
        tx: '0:65667065df4d9ba81d45d676290ab0a8eaa710b242385787f9850863ef55b509',
        name: 'venx.venom',
      },
      {
        owner: '0:34d34a58e63edf96cd3a66f3376052c5a481104576fbc1d70b4b8e027d5b85af',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:1fec5aca38554b3e3cebf6f12cfe058d1a00ca2ac117b15d78b6fc596d9f0164',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:32f4bcf5ed33f6084018aabeb1fcf6d5751c7a1f02c6bd1813edb7c38f0b9197',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
    ],
  },
  {
    date: 'May 12th',
    day: 21,
    txs: ['929787aed45919344b40d0d5c3f936248f7bd1f8b3b55d97f03a3eff2f551302'],
    winners: [
      {
        owner: '0:18f1b88fedd1277132b9417df8f38c5249a16f758bb648bf973d8047b9ed4e24',
        prize: '40 VENOMS',
        tx: '929787aed45919344b40d0d5c3f936248f7bd1f8b3b55d97f03a3eff2f551302',
        name: '',
      },
      {
        owner: '0:0fdcaf71809fa83e761d29a40efedf0a111ac63a7cde5faabbd50af91d6a3f3f',
        prize: '3-char domain',
        tx: '0:d9a0818c7112593ce8d17f5677765bdd9dd72404c9b42c288e6ce7a645cf17f1',
        name: 'gym.venom',
      },
      {
        owner: '0:62d04df4b39428ab5f5eb41e8271d603a6ca0141e4cf9081b08960c567e17ebb',
        prize: '4-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:9b62539804f693768a752205432cb4b57923f14b519e340a83d921559df8bfc0',
        prize: '4-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:1b1138f3ba3bd5cc50d04f14dd7da2ba70f367d15c2495eca952477a9a326b6d',
        prize: '5-char domain',
        tx: '0:50fb94737b7421e11458a732772a4cd0380982b630089ed5bba05d842ab581a9',
        name: 'habib.venom',
      },
      {
        owner: '0:878bb4fe995c642501ccb288c9b3eb5efdb48e55b3bbf53947519639c5155f20',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:e12e6d899c87723c5b288dd80679796295f507f81a6f5f817c327f226987f434',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
    ],
  },
  {
    date: 'May 13th',
    day: 22,
    txs: ['99e1d4b931be55d6d68f9e7f98279cfe54a0434bbea2808fcc9c9eeab81f12b1'],
    winners: [
      {
        owner: '0:dacdea10bceec247cf26639af23468aa3790c15f016d2df96d0554b393340474',
        prize: '40 VENOMS',
        tx: '99e1d4b931be55d6d68f9e7f98279cfe54a0434bbea2808fcc9c9eeab81f12b1',
        name: '',
      },
      {
        owner: '0:889845c33195fb5c744563495dee8328359beea85a414d91de7500fc70635a7a',
        prize: '3-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:16f7ec2235c0efae31ed8a2b464b5938cd2063a8c55a25637d5b075c021abddf',
        prize: '4-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:20be50ed8205488b0f65d69bcc04b0314d5c63ab9f38b3d53e52a3cc48cc73d7',
        prize: '4-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:e6eb3478807d5a04d209764cb48e811422c4f018f4dc1601adc1b0033b9032f6',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:37ec15fda8d77399ea5f94f13ea1bafe7a65294060468d43e7f64f693d332c41',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:01c1eaedc4a8a9d93905afcd2a48b25a820d1e5cc2c535fa4c8ec0c55f86534c',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
    ],
  },
  {
    date: 'May 14th',
    day: 23,
    txs: ['0108feea8555a4c0076d967e09a130bfba74bf2bea94eeab6ebffaad24185cee'],
    winners: [
      {
        owner: '0:e7933da162e4539563edfef9495ac3fb6ed39e7ca85defcccae6503e50b53cbb',
        prize: '40 VENOMS',
        tx: '0108feea8555a4c0076d967e09a130bfba74bf2bea94eeab6ebffaad24185cee',
        name: '',
      },
      {
        owner: '0:c65ed1b1e6337dfdb504d8bd78adc35ca87aaf6147d8f95e04224f9c7e9aa7aa',
        prize: '3-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:b0dad4c4d89187ada9c4752b42bc9e48510ecd37685ba4a53c9ae5d021fccb70',
        prize: '4-char domain',
        tx: '0:7a2a6becd592269a0076241cf8e7c0366b7431a4e06da032592a675dfca55df7',
        name: 'defi.venom',
      },
      {
        owner: '0:0bbbd58858059338455bebd072ee6ff3cb661dfa196dcb18f85e9e71ca64a6c1',
        prize: '4-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:7041fa680f199ea9350a61d4b058d6d07a332c77ce0af0ae202736012a97dfbc',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:a32ad534324bd95d0d55ad924ae7bff70b24a4f3f95301282548b08362745f90',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:47cdebb84a778d63cded1ad7325a6ee7a0a91d49724b72bbd1dedb9092e7c0b6',
        prize: '5-char domain',
        tx: '0:d54f2142478dcf237b3ff0794e8ddfb560d67fe68e93109e832179e3ea9d91e7',
        name: 'block.venom',
      },
    ],
  },
  {
    date: 'May 15th',
    day: 24,
    txs: ['de50c5edbff8eddc95126f764c4d7b902f5d95e237c8e06f067c54884a1d2f93'],
    winners: [
      {
        owner: '0:c74a06b138762b1057cf8ef61a58ac7f6f573aade0454fa26083499ab456e3ba',
        prize: '40 VENOMS',
        tx: 'de50c5edbff8eddc95126f764c4d7b902f5d95e237c8e06f067c54884a1d2f93',
        name: '',
      },
      {
        owner: '0:536a0b3c7d580f2475281f92f196435a4b23f5d8a7c3c19cd4212328df9d3075',
        prize: '3-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:9320ffc62705ec6999298bdbb760ef0120d637321b2069ec3edebad26da3c3ed',
        prize: '4-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:8edef49d929e058b2bf462ec20a94cfc774579a0e5d747c38f6e09cf304769cb',
        prize: '4-char domain',
        tx: '0:ee702c4d8523b0517231585b682c8d4de55f5b6813886db5a1e9a327eb8a18e9',
        name: 'mkmk.venom',
      },
      {
        owner: '0:9b62539804f693768a752205432cb4b57923f14b519e340a83d921559df8bfc0',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:601b1b1438d6346a90e6e0803d857142a3217642c27b8f190cc6b37b18f7eed6',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:021215b6fba59112b93684ebe68c32e4527f517716efb101aab38e011d30213f',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
    ],
  },
  {
    date: 'May 16th',
    day: 25,
    txs: ['aabd730665f4362b0bc9700a3696bbb7a469b747cd0eb6a6d2d8fdcbc4f09179'],
    winners: [
      {
        owner: '0:1dcce922aac2904b3c494ffe179e81d6fc48abe369482be19f99c3b8cc245a4c',
        prize: '40 VENOMS',
        tx: 'aabd730665f4362b0bc9700a3696bbb7a469b747cd0eb6a6d2d8fdcbc4f09179',
        name: '',
      },
      {
        owner: '0:6e0d9a66ac4f384119c9fc02ef74aaff4a73aeb0532c96b4c56e2a2420593c70',
        prize: '3-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:627c6ebc0d3423eff59da83e81d5d266e768f63863a94302e69e6bc988f85570',
        prize: '4-char domain',
        tx: '0:14598a131bbb779356026a8bf5d8dd861687999538a0310d3c97614b3fca295c',
        name: 'meta.venom',
      },
      {
        owner: '0:6d9df5385147815b08c16888f44ac48d2a98a46ad7355051ca49bb30aa69c940',
        prize: '4-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:c823a0636ea2da9c836fc7bea31e6ad6775baaf9bfb02ddca03607459df4ba6b',
        prize: '5-char domain',
        tx: '0:6f02ef73d362c760ad8e3adc5c64154129590851a22d39bf343a24cef1f6fa1f',
        name: 'eight.venom',
      },
      {
        owner: '0:68933fe0c07c1b3183d24d87cff6f2802b20343ebd716477cfdabb46fab0027b',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:8a6addf9c205319449b148e85f0b477179ef023f59136efc31ca8f55380d725b',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
    ],
  },
  {
    date: 'May 17th',
    day: 26,
    txs: ['1de3ce96e2d33a32fe975179288d6c70b60b88cca04578e92140767308fdcce2'],
    winners: [
      {
        owner: '0:f35d3048ab0d0383e9fbf01fa3cc28160b087a6fada534e9e461a840b42bf542',
        prize: '40 VENOMS',
        tx: '1de3ce96e2d33a32fe975179288d6c70b60b88cca04578e92140767308fdcce2',
        name: '',
      },
      {
        owner: '0:1f450f09a9ab14fe45e10e2178e7acb86a3e17fa0d97652995ab7ad90eaab5f0',
        prize: '3-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:a7d5b62afa9e1fe582031879c0b0272281970262adefe780dca77babe3645eb0',
        prize: '4-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:d45750781e82ab935c869e60ca125b3fd538f7eb9432da694d84ab5a9d8c3815',
        prize: '4-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:b9f504fd32f231c6f22998288a70b90e411c6fd0267adeb0e9637f20e0bcecdf',
        prize: '5-char domain',
        tx: '0:89692c609b64221068f48b6a5e685bcd77194cea1b661c3730dc2677d6bfd174',
        name: 'agora.venom',
      },
      {
        owner: '0:ec4b82acdeba83589657e2a81cc345e130074a99c5e461a76e93a66bead0c178',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:0d5109846e868c8708fbd8d3a8b0463cee613b6ab3c2611a0f320c8eb1b0d1b5',
        prize: '5-char domain',
        tx: '0:5cd9fd6c2a531c64267f1abd9c23f0c2750bda386f48a3293dcb86914e8464b7',
        name: 'sextoy.venom',
      },
    ],
  },
  {
    date: 'May 18th',
    day: 27,
    txs: ['0ce9a09d4060ee2e496d28a1e086eeb7d8449a79695dcc9458af8360587dea09'],
    winners: [
      {
        owner: '0:d5379f1049dcc8250e483fd061b4f7fea126e208860ebd8f70cc18e9d642f40b',
        prize: '40 VENOMS',
        tx: '0ce9a09d4060ee2e496d28a1e086eeb7d8449a79695dcc9458af8360587dea09',
        name: '',
      },
      {
        owner: '0:a7cb16870d8d703938fd8e5a63da09ead769408440f9a535532fab7e2dbbbd31',
        prize: '3-char domain',
        tx: '0:b1a1c9335007c42265d6f4f857067dbc1c5b0e390befbce901513f23f9d02738',
        name: 'eth.venom',
      },
      {
        owner: '0:d094934cacd46ddd6707166a54700bbab9bce2d1e45111f056f8ef458c09c94c',
        prize: '4-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:d2fcafd1499c71c780f699a59444f1e346a046b08710e55d30a58192f631e2f5',
        prize: '4-char domain',
        tx: '0:3aa8699f30b7e3a86c5863be3c19a4643a05769155abfeac29ba990192f8c630',
        name: 'meme.venom',
      },
      {
        owner: '0:83453646f12072f96bea4cdb93c679982a72583056e23f17047be17caa9859fc',
        prize: '5-char domain',
        tx: '0:7cc5a7039e8205ae17998e5d52b99893e3440bd643cda3d81a400bd55928d63b',
        name: 'virus.venom',
      },
      {
        owner: '0:21aaf8acd2490714890e056ef84e3c16cae34a8a76c42ef548f1bfd1f676d05b',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:2e7acbb3ebb3a04cdf6ab37cccb50fbdf334a6bfef5902726a059bcbc1c7abc9',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
    ],
  },
  {
    date: 'May 19th',
    day: 28,
    txs: ['1953828479b3ecbf9d48239d2e8b4179b3e3b10a0bab12a4100a51f25cf398b9'],
    winners: [
      {
        owner: '0:eba7a81a2d738e1cf938e0d6c673ee5eeb81c4e032ed6794c3ebf7c577365b35',
        prize: '40 VENOMS',
        tx: '1953828479b3ecbf9d48239d2e8b4179b3e3b10a0bab12a4100a51f25cf398b9',
        name: '',
      },
      {
        owner: '0:7dbbec1b74ae73343dc1b2d66aa7196ac9383532684c51e13c141e70cdd94135',
        prize: '3-char domain',
        tx: '0:1f0c0d537d26c6bac84b923fa3588894674f4aedeaf6070f58bb969647bbfebf',
        name: 'abc.venom',
      },
      {
        owner: '0:abd184ab8cc861cfb54b9e240b536f25d5eefe7b9a36a059a7773a7051dcae29',
        prize: '4-char domain',
        tx: '0:f067f37abb9d6e45510a625eb564cd1d38f7144bddc11c97a05be0f4971022c0',
        name: 'sako.venom',
      },
      {
        owner: '0:e3823a6e757002c5f35e1a47bfe69ace938db5882217192215e975784fba8689',
        prize: '4-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:243557751dbbbc4810087d4408d7350453eb5a8203cde9196c862c37ebf865a3',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:74cd0beacbe2bc9f2992f3c1d48d1b780f6e1c81f8f1bab87ebc4da5db6e6aa4',
        prize: '5-char domain',
        tx: '0:635638d2971dc3bbcd0ea888d752857158835082bd769e9a4c16d9a094446e50',
        name: 'speed.venom',
      },
      {
        owner: '0:40b1057806c2a076e813628cfe36b958d53e7212e8772ba2fe4971b03198a6f6',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
    ],
  },
  {
    date: 'May 20th',
    day: 29,
    txs: ['f83db980443be71acac31db0d43628c8b6a15fe9c66f16d37a5e9d19c918285d'],
    winners: [
      {
        owner: '0:8ec970cafd1b8aa3f3190c3d655a71bb6ba6aeaa15d3acd55e41ba9bf406c60b',
        prize: '40 VENOMS',
        tx: 'f83db980443be71acac31db0d43628c8b6a15fe9c66f16d37a5e9d19c918285d',
        name: '',
      },
      {
        owner: '0:d8a17189b46ec5f91db14f4a58990fb68bd58ca693725d0c3cfb809f4eda4949',
        prize: '3-char domain',
        tx: '0:22121e7459389bf671066fbf9ee1f867184b3d6bc58b0ff0acffa8bd82942a7e',
        name: 'nyc.venom',
      },
      {
        owner: '0:ba49cd7ce948b7fbff38fe190f1c0db189d46cbbbefc9145aaf462445b77732b',
        prize: '4-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:6168eb11209a84f1d9031f575200d39601f82ec2ac959baaff1abcb98907f58b',
        prize: '4-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:37c7f4aa0b64eac9afad13783070ba5f98fc8a07d8782e7c7ab389a10cf28fca',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:39f7738e6051de1c812810aa05b270fa20aa95b774edae0d21f53e6750561532',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:251ca790ffdcf5f8d893748e0f3a48ce757687217ea75043608f02f21ba8c8ae',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
    ],
  },
  {
    date: 'May 21th',
    day: 30,
    txs: ['d8659dde2aa3de7a3e8b4fbaef9cb8e102fd36ccbe21bf738e6ccdab115d19d4'],
    winners: [
      {
        owner: '0:0d10c577c934758c77a96805ebc59aaea8b511bd4fd18a8ef80f62a8b336c46c',
        prize: '40 VENOMS',
        tx: 'd8659dde2aa3de7a3e8b4fbaef9cb8e102fd36ccbe21bf738e6ccdab115d19d4',
        name: '',
      },
      {
        owner: '0:a3fa5933bf1801a9faf1717109c92ccd419918e0f00db58903f657eae157246e',
        prize: '3-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:51e1ff4b0724c381a007c81b0a8e0e1f8f363a771cdcc199fee51114e249743a',
        prize: '4-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:8b17b6554e402989482c503f5c7b75e0cf6e1575a7829ec0809ef0e43b17ec8b',
        prize: '4-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:a6adf8d3c0941f6c75ab3d5502b470dac7d0ef28896251f6ad9b191821a9d102',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:34997c05f9848aa516eda509d317a7925d0242c663726f3ebcb2817d43c912d0',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
      {
        owner: '0:384ff8f176d6eab33f1300abee7e8624441fe8114e58e314a24b24f5786ac05c',
        prize: '5-char domain',
        tx: '',
        name: '',
      },
    ],
  },
];

export const SOCIAL_URLS: any = {
  twitter: 'twitter.com/',
  linkedin: 'linkedin.com/in/',
  github: 'github.com/',
  medium: 'medium.com/',
  youtube: 'youtube.com/',
  instagram: 'instagram.com/',
  tiktok: 'tiktok.com/',
  twitch: 'twitch.tv/',
  snapchat: 'snapchat.com/add/',
  facebook: 'facebook.com/',
  dribbble: 'dribbble.com/',
  pinterest: 'pinterest.com/',
  soundcloud: 'soundcloud.com/',
  spotify: 'open.spotify.com/user/',
  patreon: 'patreon.com/',
  substack: 'substack.com/',
  galxe: 'galxe.com/',
  opensea: 'opensea.io/',
  zealy: 'zealy.io/c/',
  ylide: 'hub.ylide.io/project/',
  amazon: 'amazon.com/gp/profile/eampleuser/',
  playstore: 'play.google.com/store/apps/developer?id=',
  appstore: 'apps.apple.com/us/developer/',
  applemusic: 'music.apple.com/profile/',
  clubhouse: 'joinclubhouse.com/',
  etsy: 'etsy.com/shop/',
  discord: 'discord.gg/',
  skype: 'skype:',
  slack: 'slack.com/',
  telegram: 't.me/',
  whatsapp: 'wa.me/',
  phone: 'tel:',
  email: 'mailto:',
};

export const WINNERS: {
  [key: string]: {
    title: string;
    sent: string;
    domain: string;
    slug: string;
    link: string;
    tweet: string;
    challenge: string;
    prize_img: string;
    prizes: string[];
    image: string;
    screenImage: string;
    winners: any[];
    status: string;
  };
} = {
  staxavatarchallenge: {
    title: 'STAX Avatar Challenge',
    sent: '10',
    domain: 'stax.venom',
    slug: 'stax-avatar-challenge',
    link: 'STAX COIN FLIP',
    tweet: 'https://twitter.com/Venomid_network/status/1792241267428192357',
    challenge:
      'Set STAX NFT as your avatar on your .venom domain ID and save your avatar, you can use the static stax image if you do not own a stax nft! (full guides in the tweet)',
    prize_img:
      'https://ipfs.io/ipfs/QmRFe5HjkmjEoE7P77zzq4QKqzGP5fDivwCiDZ9ci4zb7Y/photo_2024-03-26_22-24-00.jpg',
    prizes: ['10 STAX NFTS', '60 .venom Domains'],
    image: 'staxavatarchallenge.jpg',
    screenImage: 'staxavatarchallenge.png',
    winners: WINNERS_STAX_AVATAR_CHALLENGE,
    status: 'Winners Announced',
  },
  punksavatarchallenge: {
    title: 'Punks Avatar Challenge',
    sent: '10',
    domain: 'punks.venom',
    slug: 'punks-avatar-challenge',
    link: 'Venom-Punks.Com',
    tweet: 'https://twitter.com/Venomid_network/status/1779553947612774631',
    challenge:
      'Set venom-punks image as your avatar on your .venom domain ID and save your avatar! (full guides in the tweet)',
    prize_img:
      'https://ipfs.io/ipfs/QmdwW8egQuQAYsEYgdz1coTExinMrjfheAYHm4PxX6stJB/punks.venom.png',
    prizes: ['10 PUNK NFTS', '30 .venom Domains'],
    image: 'punksavatarchallenge.jpg',
    screenImage: 'punksavatarchallenge.png',
    winners: WINNERS_PUNKS_AVATAR_CHALLENGE,
    status: 'Winners Announced',
  },
};

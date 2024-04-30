import { BgColorItem, LinkType, BgImageItem } from 'types';

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
export const SITE_DESCRIPTION = 'Empower Your Digital Presence with one simple name';
export const SITE_FULL_DESCRIPTION =
  'With VenomID, you can assign human-readable names to your blockchain and non-blockchain resources like Venom, BTC and ETH addresses, Links and more';
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

export const TARGET_RECORD_ID = 0;
export const TARGET_ETH_RECORD_ID = 1;

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
export const GITHUB_URL = 'https://github.com/sam-shariat/venomidapp';
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
    txs :[
      '01292907552163a26a02f8181d4146b8faca18941f03a6c56688a386ff9ffa51'
    ],
    winners: [
      {owner : '0:f25ad30d0389bf5cd8b15dbc4b29c816226832095d9ea55fa04fbf8063b112d3', prize: '40 VENOMS', tx: '01292907552163a26a02f8181d4146b8faca18941f03a6c56688a386ff9ffa51', name:''},
      {owner : '0:be7b8f4fed809c72aba75f4c0a6e282354c7d5f8d9e9de82ec64eb6706d7a99a', prize: '3-char domain', tx: '', name: ''},
      {owner : '0:36e661787e4019445567f4daaf01abe319d47234305defb3b1cbba88e3396ec4', prize: '4-char domain', tx: '0:03404ab6dd18b9c0c578ae9b51149cc2aa50beb6f0259a1ddece4fa90cbd77ad', name: 'bbbb.venom'},
      {owner : '0:9191121b39eb43bb08a6cba8b3cbe264766cfd7db8d5c83a1e9cfe42efcce91d', prize: '4-char domain', tx: '0:3cfa67e3ff25021900590753b931f6b0a4e0a6fd5597af1cedd303b89ceca1b2', name: 'cucu.venom'},
      {owner : '0:8f500a081d6fd947d2c3b5ea6ea525eff81e56129d65364f2d01ed7eaecc934d', prize: '5-char domain', tx: '', name: ''},
      {owner : '0:e4c0bb703e64873086cb468a9d7324ca23fcaacd790763c2849fe45d7ab0e84e', prize: '5-char domain', tx: '', name: ''},
      {owner : '0:533f216d8581e78131c2bdba43d66d5f7a7d867a8027774d974df6aa15541b6c', prize: '5-char domain', tx: '', name: ''}
    ],
  },
 
  {
    date: 'April 23rd',
    day: 2,
    txs :[
      '075bdab5e43024a897647613d5ada1683814ef3d6bb10d1eb6e6812e90f2b8c4'
    ],
    winners: [
      {owner : '0:14d7aae23c0b9abd969f3104840d6b35271925a54e9ea91b7f16939e5f055b83', prize: '40 VENOMS', tx: '075bdab5e43024a897647613d5ada1683814ef3d6bb10d1eb6e6812e90f2b8c4', name:''},
      {owner : '0:d087d630d89efa48ddf71e6bf552136404f167ac5dd01d8c9591f0561ab4a081', prize: '3-char domain', tx: '', name: ''},
      {owner : '0:d98457456ea54b39d1691d2b0525cc9625260d818678d3d1e2a426eca93cedd8', prize: '4-char domain', tx: '0:4a7e14dd8c5f88c62a198911a46cb26301a3cdbdce602d1220f6fc0d9300f888', name: 'rune.venom'},
      {owner : '0:733d008614af9c8b341f088931ea6d40a1067fd4949b35f07a940945f702cf23', prize: '4-char domain', tx: '', name: ''},
      {owner : '0:a5f58c82b766b9cc97c609ca6b5096a15bd29b235ff98904039dfd93a0a35888', prize: '5-char domain', tx: '0:77f4f98125ac412dc08459f2f1dd932c907ede4f0be00c9d58cc766f4c2f1d20', name: 'veres.venom'},
      {owner : '0:bb729d97156ec8ffcedf2823ffe0d50763f326b00c91a434d321d323c7c054ad', prize: '5-char domain', tx: '', name: ''},
      {owner : '0:5dde0d725fc9f839992d12c04a7903070688106d91c922cd299333c0fbf8906f', prize: '5-char domain', tx: '', name: ''}
    ],
  },
  {
    date: 'April 24th',
    day: 3,
    txs :[
      '647bc797158b0590bf3d8d32fe40190b1da323d5baa64bfd76ec01b625834254'
    ],
    winners: [
      {owner : '0:81c6954e467897cba30b77ef708f58c234275ae8903fdc163d975cb1f854e0a8', prize: '40 VENOMS', tx: '647bc797158b0590bf3d8d32fe40190b1da323d5baa64bfd76ec01b625834254', name:''},
      {owner : '0:6a003cc55aa6c4bba516dcff83385b55a5f4a0b4fafee92812678988052583fe', prize: '3-char domain', tx: '', name: ''},
      {owner : '0:cd8b606d1f0f0ca96cba7ca666c164b19a40155402c77fa86187ea4a883e8b73', prize: '4-char domain', tx: '', name: ''},
      {owner : '0:a05dfa01da9c6fbda761f7462ad37666c1de3af9d54ec5e6ad28d5e9d9f8a319', prize: '4-char domain', tx: '', name: ''},
      {owner : '0:17826b649611f907b02163b36f33f16a79ce9afd29ffb6b9768ff9cad38bde5a', prize: '5-char domain', tx: '', name: ''},
      {owner : '0:00d6d867baf113a9fb580a37f77d0fcd444cff2e203438626b290a27702e97c6', prize: '5-char domain', tx: '', name: ''},
      {owner : '0:ab5e2796764d83cf9a08bc4cf341b38ad05a0703332846c9ddfa9dbfa067fbf2', prize: '5-char domain', tx: '', name: ''}
    ],
  },
  {
    date: 'April 25th',
    day: 4,
    txs :[
      '13f1d8944416f469a06a2bc5859c4388b68d9da4d786cb4d93832996f0e67ea2'
    ],
    winners: [
      {owner : '0:97f15f93a3702c9e10e3ced20451c1578041b0fe7b5ec0ffa2ee7173b299a13e', prize: '40 VENOMS', tx: '13f1d8944416f469a06a2bc5859c4388b68d9da4d786cb4d93832996f0e67ea2', name:''},
      {owner : '0:6973cd2fabc41cd7720b702f8c95084e411ffb4bc990675cfe59e94553d627ec', prize: '3-char domain', tx: '', name: ''},
      {owner : '0:202041e620b76f87825bd6ef01e13c98c8af4499729d4d1269dafbacd6892e3f', prize: '4-char domain', tx: '', name: ''},
      {owner : '0:df5eaf75a9690b29272a985cd0b735cb9496846065580dcb21a3a72d6368835c', prize: '4-char domain', tx: '0:9118debd2a0e84dc50077acb31069712397d69036007e3ceacb4f0da31a0e4b8', name: 'prima.venom'},
      {owner : '0:fecfb92632ed19cea3c44e047e22169783e96d75070fc1ce49b1e56cb107eef3', prize: '5-char domain', tx: '0:3fdea9f48e128e66fd3bb96b45e15cbacaf632c48c2cc2bfa933935d0d15e593', name: 'smart.venom'},
      {owner : '0:a9e29e800f11372fb8368992ef7c0c4ed1983019bb421071786ef79b98dd2136', prize: '5-char domain', tx: '', name: ''},
      {owner : '0:619f50935efa6c7731328ab510b293ba138f5565a03a07b85263b17d5c3ea01f', prize: '5-char domain', tx: '', name: ''}
    ],
  },
  {
    date: 'April 26th',
    day: 5,
    txs :[
      '59047466df844bf64ff4cd6d7e02d0fccb6476fc906a968a56d83d0a2c0353f1'
    ],
    winners: [
      {owner : '0:868cc927e565cb3ac210b2157cd8e05d3db415837febf54c2a80ebef1a454e3f', prize: '40 VENOMS', tx: '59047466df844bf64ff4cd6d7e02d0fccb6476fc906a968a56d83d0a2c0353f1', name:''},
      {owner : '0:c3db2e6229f15253255f588eb9878f3f9e52c026d9e4f22065f8ad80a3f37531', prize: '3-char domain', tx: '0:655ef32800d8dca233aa7c58770366a61cac216e45a2b31a0f78ddf08005c094', name: 'xyz.venom'},
      {owner : '0:e835e64ce6f0ddd37f35abb13995c9c6320f22070f98393aaafff2771ac2c835', prize: '4-char domain', tx: '', name: ''},
      {owner : '0:1855dc8b9b7dc88eb429964884ece0491e0ddb90c7deb2fa14653671dd75bd12', prize: '4-char domain', tx: '', name: ''},
      {owner : '0:42e74d55a40719df55ea84b837284ae0c39731ced9da315d07a33b66e4f9d0e3', prize: '5-char domain', tx: '0:2ce049fe4eca9230a0c056c2ab7e8963884230547ce21d797bb55fd36eec490e', name: 'sixtozvenomnetwork.venom'},
      {owner : '0:3356e2effcd339e68b50f3fd2c3983d4e90b6f7bed66f7ee05939e477b55db55', prize: '5-char domain', tx: '', name: ''},
      {owner : '0:03576331659a029693f82143a7754d3b7fbf4b347fd4418c858cb1815749cc7e', prize: '5-char domain', tx: '', name: ''}
    ],
  },
  {
    date: 'April 27th',
    day: 6,
    txs :[
      '2d31a73663a22c770bb84970a66e18ff3ac9d77a0109e8d79702992bb5838145'
    ],
    winners: [
      {owner : '0:58d4aed21db20fd7aafb2f2e71e218d5c62979218e22c03a2adc338daf74efc9', prize: '40 VENOMS', tx: '2d31a73663a22c770bb84970a66e18ff3ac9d77a0109e8d79702992bb5838145', name:''},
      {owner : '0:9c402ea498f5c52d7aedacf7e907de73b2f2550ac1e54fca71e7ee07c4837d3c', prize: '3-char domain', tx: '', name: ''},
      {owner : '0:6141ecc2a6740d0f2ee6f4a23ef758eeb6a6a2910d7672be1c797a61717e89ef', prize: '4-char domain', tx: '', name: ''},
      {owner : '0:9edae1366945a6e372a3fdefdfba4e7c7edcc2338747209588e1fc9049c5961f', prize: '4-char domain', tx: '', name: ''},
      {owner : '0:7faab89f5570520e6b833b1914b2e308ffa624c115daa6aa7fb771991faa214e', prize: '5-char domain', tx: '0:56017add4444ec7ce89e7564509bb6c654b4e31590f4cc24e32d9f58390040a0', name: 'daddy.venom'},
      {owner : '0:33291ac5c53ad600f40d4051bbce93b37ed5e5b5d2ac998c22483845ac9db177', prize: '5-char domain', tx: '', name: ''},
      {owner : '0:de358f4ebc0861bf900c4920a26bb1141a6763ab35b3ad88a6b900dd791166f1', prize: '5-char domain', tx: '', name: ''}
    ],
  },
  {
    date: 'April 28th',
    day: 7,
    txs :[
      '04b4af9a4392d7fd79cd1075756715f728960c26e6b779679b7d5a164ea1550d'
    ],
    winners: [
      {owner : '0:26896600ff041f7ea1c9f8e1399db99f8bbfe85945e457cf04de17670f6bf167', prize: '40 VENOMS', tx: '04b4af9a4392d7fd79cd1075756715f728960c26e6b779679b7d5a164ea1550d', name:''},
      {owner : '0:f9e3877be6513168c723322c70ef4d4af01803585b3743d3b4d7272551cba601', prize: '3-char domain', tx: '', name: ''},
      {owner : '0:99bb9467057c4043447358783b4aa6c96dee8f8be0ca9654432336f753f0e9ca', prize: '4-char domain', tx: '', name: ''},
      {owner : '0:23ec69a5b4dd89c0fe93612ff77cd8be8b471ac621dd6022afeb3f7e7322df53', prize: '4-char domain', tx: '', name: ''},
      {owner : '0:cd8b606d1f0f0ca96cba7ca666c164b19a40155402c77fa86187ea4a883e8b73', prize: '5-char domain', tx: '', name: ''},
      {owner : '0:4332c468cfa7cb84f3f62d4218e2965025495c938feacc4ae36249ddb13fe1dd', prize: '5-char domain', tx: '', name: ''},
      {owner : '0:c933d8ebb8170382ed5a7080d75be1c2a1f5443c638706b0b252ea8f615b18ed', prize: '5-char domain', tx: '', name: ''}
    ],
  },
  {
    date: 'April 29th',
    day: 8,
    txs :[
      'f9795edcbe022d3b29c0e46186f9f6d8bf35be8981489b16050fcf464881f5a8'
    ],
    winners: [
      {owner : '0:b757a69dcae7e715a107ed8f4269aba7fa7e3cde5292e1e0cb0b619b8af776d5', prize: '40 VENOMS', tx: 'f9795edcbe022d3b29c0e46186f9f6d8bf35be8981489b16050fcf464881f5a8', name:''},
      {owner : '0:66058afe5c4fffe62bdc262d569c39a87b62a07b23a02990073010f387d17950', prize: '3-char domain', tx: '', name: ''},
      {owner : '0:00d6d867baf113a9fb580a37f77d0fcd444cff2e203438626b290a27702e97c6', prize: '4-char domain', tx: '', name: ''},
      {owner : '0:e068ac39fd15217fa520c81f68c0997def7c274128c346ecdd151728c7247ca0', prize: '4-char domain', tx: '', name: ''},
      {owner : '0:8ed63343f2cf0d4064b8ea2498cbe8d7d0858ae97d172e73c8b0bd3255192510', prize: '5-char domain', tx: '', name: ''},
      {owner : '0:58a590bc90e8de51165b52034240508dd05d7011c9af4ac966afcf34df392a17', prize: '5-char domain', tx: '', name: ''},
      {owner : '0:f815ed37b16ea15922f1dc62274b9cc17f0f4128fcc89ae2c47093af26817096', prize: '5-char domain', tx: '', name: ''}
    ],
  },
];



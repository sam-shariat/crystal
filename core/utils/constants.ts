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

export const ROOT_CONTRACT_ADDRESS = '0:2b353a0c36c4c86a48b0392c69017a109c8941066ed1747708fc63b1ac79e408';
export const TESTNET_ROOT_CONTRACT_ADDRESS = '0:72034dfba65f6d63b362e51add677c0549ff4e5a4e18c943acb54f953bb53660';
export const OLD_TESTNET_ROOT_CONTRACT_ADDRESS = '0:5475e9e7b9d178f4c35cd1136e83a100ca95e28b38c5c52d0689771372ba43ec';
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

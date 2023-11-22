import VenomFoundation from './VenomFoundation';
import VenomScanIcon from './VenomScan';
import Zealy from './Zealy';
import Galxe from './Galxe';
import Metamask from './Metamask';
import {
  RiTwitterFill,
  RiTelegramFill,
  RiFacebookFill,
  RiDiscordFill,
  RiMediumFill,
  RiYoutubeFill,
  RiLinkedinFill,
  RiGithubFill,
  RiPinterestFill,
  RiInstagramFill,
  RiWhatsappFill,
  RiSailboatFill,
  RiTwitterLine,
  RiTelegramLine,
  RiFacebookLine,
  RiDiscordLine,
  RiMediumLine,
  RiYoutubeLine,
  RiLinkedinLine,
  RiGithubLine,
  RiPinterestLine,
  RiInstagramLine,
  RiWhatsappLine,
  RiSailboatLine,
  RiMailLine,
  RiMailFill,
  RiPhoneLine,
  RiPhoneFill,
  RiLinksFill,
  RiLinksLine,
  RiImage2Line,
  RiImage2Fill,
  RiText,
  RiImageFill,
  RiImageLine,
  RiArticleFill,
  RiArticleLine,
  RiVideoFill,
  RiVideoLine,
  RiHeading,
  RiFilePdfFill,
  RiFilePdfLine,
  RiFileGifFill,
  RiFileGifLine,
  RiHandCoinLine,
  RiHandCoinFill,
  RiServiceLine,
  RiServiceFill,
  RiP2PLine,
  RiP2PFill,
  RiMoreLine,
  RiMoreFill,
  RiSnapchatLine,
  RiSnapchatFill,
  RiDribbbleLine,
  RiDribbbleFill,
  RiTiktokLine,
  RiTiktokFill,
  RiTwitchLine,
  RiTwitchFill,
  RiSkypeLine,
  RiSkypeFill,
  RiSoundcloudLine,
  RiSoundcloudFill,
  RiSpotifyLine,
  RiSpotifyFill,
  RiPatreonLine,
  RiPatreonFill,
  RiSlackLine,
  RiSlackFill,
} from 'react-icons/ri';
import { NftFill, NftLine } from './NFT';
import Polygon from './Polygon';
import Arbitrum from './Arbitrum';
import Optimism from './Optimism';
import Logo from './Logo';
import LogoIcon from './LogoIcon';
import { FaBitcoin, FaEthereum } from 'react-icons/fa';
import Binance from './Binance';
import Avalanche from './Avalanche';
import Solana from './Solana';
import Tron from './Tron';
import Ylide from './Ylide';

interface LinkIconProps {
  type: string;
  line?: boolean;
  color?: string;
}

const LinkIcon = ({ type, line, color }: LinkIconProps) => {
  switch (type) {
    case 'twitter':
    case 'tweet':
      return line ? (
        <RiTwitterLine size="28" color={color ? color : undefined} />
      ) : (
        <RiTwitterFill size="28" color={color ? color : undefined} />
      );
    case 'linkedin':
      return line ? (
        <RiLinkedinLine size="28" color={color ? color : undefined} />
      ) : (
        <RiLinkedinFill size="28" color={color ? color : undefined} />
      );
    case 'medium':
      return line ? (
        <RiMediumLine size="28" color={color ? color : undefined} />
      ) : (
        <RiMediumFill size="28" color={color ? color : undefined} />
      );
    case 'telegram':
      return line ? (
        <RiTelegramLine size="28" color={color ? color : undefined} />
      ) : (
        <RiTelegramFill size="28" color={color ? color : undefined} />
      );
    case 'facebook':
      return line ? (
        <RiFacebookLine size="28" color={color ? color : undefined} />
      ) : (
        <RiFacebookFill size="28" color={color ? color : undefined} />
      );
    case 'discord':
      return line ? (
        <RiDiscordLine size="28" color={color ? color : undefined} />
      ) : (
        <RiDiscordFill size="28" color={color ? color : undefined} />
      );
    case 'youtube':
      return line ? (
        <RiYoutubeLine size="28" color={color ? color : undefined} />
      ) : (
        <RiYoutubeFill size="28" color={color ? color : undefined} />
      );
    case 'github':
      return line ? (
        <RiGithubLine size="28" color={color ? color : undefined} />
      ) : (
        <RiGithubFill size="28" color={color ? color : undefined} />
      );
    case 'pinterest':
      return line ? (
        <RiPinterestLine size="28" color={color ? color : undefined} />
      ) : (
        <RiPinterestFill size="28" color={color ? color : undefined} />
      );
    case 'instagram':
      return line ? (
        <RiInstagramLine size="28" color={color ? color : undefined} />
      ) : (
        <RiInstagramFill size="28" color={color ? color : undefined} />
      );
    case 'snapchat':
      return line ? (
        <RiSnapchatLine size="28" color={color ? color : undefined} />
      ) : (
        <RiSnapchatFill size="28" color={color ? color : undefined} />
      );
    case 'dribbble':
      return line ? (
        <RiDribbbleLine size="28" color={color ? color : undefined} />
      ) : (
        <RiDribbbleFill size="28" color={color ? color : undefined} />
      );
    case 'tiktok':
      return line ? (
        <RiTiktokLine size="28" color={color ? color : undefined} />
      ) : (
        <RiTiktokFill size="28" color={color ? color : undefined} />
      );
    case 'twitch':
      return line ? (
        <RiTwitchLine size="28" color={color ? color : undefined} />
      ) : (
        <RiTwitchFill size="28" color={color ? color : undefined} />
      );
    case 'skype':
      return line ? (
        <RiSkypeLine size="28" color={color ? color : undefined} />
      ) : (
        <RiSkypeFill size="28" color={color ? color : undefined} />
      );
    case 'soundcloud':
    case 'soundcloud song':
      return line ? (
        <RiSoundcloudLine size="28" color={color ? color : undefined} />
      ) : (
        <RiSoundcloudFill size="28" color={color ? color : undefined} />
      );
    case 'spotify':
      return line ? (
        <RiSpotifyLine size="28" color={color ? color : undefined} />
      ) : (
        <RiSpotifyFill size="28" color={color ? color : undefined} />
      );
    case 'patreon':
      return line ? (
        <RiPatreonLine size="28" color={color ? color : undefined} />
      ) : (
        <RiPatreonFill size="28" color={color ? color : undefined} />
      );
    case 'slack':
      return line ? (
        <RiSlackLine size="28" color={color ? color : undefined} />
      ) : (
        <RiSlackFill size="28" color={color ? color : undefined} />
      );
    case 'opensea':
      return line ? (
        <RiSailboatLine size="28" color={color ? color : undefined} />
      ) : (
        <RiSailboatFill size="28" color={color ? color : undefined} />
      );
    case 'zealy':
      return line ? (
        <Zealy color={color ? color : undefined} />
      ) : (
        <Zealy color={color ? color : undefined} />
      );
    case 'galxe':
      return line ? (
        <Galxe color={color ? color : undefined} />
      ) : (
        <Galxe color={color ? color : undefined} />
      );
    case 'email':
      return line ? (
        <RiMailLine size="28" color={color ? color : undefined} />
      ) : (
        <RiMailFill size="28" color={color ? color : undefined} />
      );
    case 'phone':
      return line ? (
        <RiPhoneLine size="28" color={color ? color : undefined} />
      ) : (
        <RiPhoneFill size="28" color={color ? color : undefined} />
      );
    case 'whatsapp':
      return line ? (
        <RiWhatsappLine size="28" color={color ? color : undefined} />
      ) : (
        <RiWhatsappFill size="28" color={color ? color : undefined} />
      );
    case 'soundcloud song':
      return line ? (
        <RiSoundcloudLine size="28" color={color ? color : undefined} />
      ) : (
        <RiSoundcloudFill size="28" color={color ? color : undefined} />
      );
    case 'nft link':
      return line ? <NftLine /> : <NftFill />;
    case 'simple link':
      return line ? <RiLinksLine size="28" /> : <RiLinksFill size="28" />;
    case 'image link':
    case 'image/png':
    case 'image/svg':
    case 'image/svg+xml':
    case 'image/jpeg':
      return line ? <RiImage2Line size="28" /> : <RiImage2Fill size="28" />;
    case 'youtube video':
      return line ? <RiYoutubeLine size="28" /> : <RiYoutubeFill size="28" />;
    case 'text':
    case 'simple text':
      return line ? <RiText size="28" /> : <RiText size="28" />;
    case 'heading':
      return line ? <RiHeading size="28" /> : <RiHeading size="28" />;
    case 'ipfs video':
    case 'video/mp4':
    case 'mp4':
      return line ? <RiVideoLine size="28" /> : <RiVideoFill size="28" />;
    case 'ipfs image':
      return line ? <RiImageLine size="28" /> : <RiImageFill size="28" />;
    case 'pdf doc':
    case 'application/pdf':
      return line ? <RiFilePdfLine size="28" /> : <RiFilePdfFill size="28" />;
    case 'venom testnet':
    case 'venom':
    case 'venomtestnet':
      return <VenomFoundation color={color ? color : undefined} />;
    case 'donate':
    case 'donate button':
      return line ? <RiServiceLine size="28" /> : <RiServiceFill size="28" />;
    case 'pay':
    case 'payment':
    case 'pay button':
      return line ? <RiP2PLine size="28" /> : <RiP2PFill size="28" />;
    case 'more':
      return line ? <RiMoreLine size="28" /> : <RiMoreFill size="28" />;
    case 'ethereum':
    case 'eth':
      return <FaEthereum size={'28'} color={color ? color : undefined} />;
    case 'bitcoin':
    case 'btc':
      return <FaBitcoin size={'28'} color={color ? color : undefined} />;
    case 'arbitrum':
    case 'arb':
      return <Arbitrum color={color ? color : undefined} />;
    case 'polygon':
    case 'matic':
      return <Polygon color={color ? color : undefined} />;
    case 'optimism':
    case 'opt':
      return <Optimism color={color ? color : undefined} />;
    case 'binance':
    case 'bsc':
      return <Binance color={color ? color : undefined} />;
    case 'avalanche':
    case 'avax':
      return <Avalanche color={color ? color : undefined} />;
    case 'solana':
    case 'sol':
      return <Solana color={color ? color : undefined} />;
    case 'ylide':
      return <Ylide color={color ? color : undefined} />;
    case 'tron':
    case 'trx':
      return <Tron color={color ? color : undefined} />;
    case 'image/gif':
    case 'gif':
      return line ? <RiFileGifLine size="28" /> : <RiFileGifFill size="28" />;
    default:
      return <></>;
  }
};
export { Logo, LogoIcon, VenomFoundation, VenomScanIcon, LinkIcon, Zealy, Metamask };

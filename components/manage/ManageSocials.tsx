import { Stack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import ManageLink from 'components/manage/ManageLink';
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
  RiSailboatLine,
} from 'react-icons/ri';
import { useAtom } from 'jotai';
import {
  discordAtom,
  facebookAtom,
  githubAtom,
  instagramAtom,
  linkedinAtom,
  mediumAtom,
  openseaAtom,
  pinterestAtom,
  telegramAtom,
  twitterAtom,
  youtubeAtom,
} from 'core/atoms';

interface Props {
  json: any;
}

export default function ManageSocials({ json }: Props) {
  const [twitter, setTwitter] = useAtom(twitterAtom);
  const [discord, setDiscord] = useAtom(discordAtom);
  const [medium, setMedium] = useAtom(mediumAtom);
  const [linkedin, setLinkedin] = useAtom(linkedinAtom);
  const [youtube, setYoutube] = useAtom(youtubeAtom);
  const [github, setGithub] = useAtom(githubAtom);
  const [pinterest, setPinterest] = useAtom(pinterestAtom);
  const [instagram, setInstagram] = useAtom(instagramAtom);
  const [opensea, setOpensea] = useAtom(openseaAtom);
  const [telegram, setTelegram] = useAtom(telegramAtom);
  const [facebook, setFacebook] = useAtom(facebookAtom);

  useEffect(() => {
    setTwitter(json.socials.twitter);
    setDiscord(json.socials.discord);
    setMedium(json.socials.medium);
    setLinkedin(json.socials.linkedin);
    setYoutube(json.socials.youtube);
    setPinterest(json.socials.pinterest);
    setGithub(json.socials.github);
    setInstagram(json.socials.instagram);
    setOpensea(json.socials.opensea);
    setTelegram(json.socials.telegram);
    setFacebook(json.socials.facebook);
  },);

  return (
    <Stack my={2}>
      <ManageLink
        icon={json.lineIcons ? <RiTwitterLine size="28" /> : <RiTwitterFill size="28" />}
        title="Twitter"
        url={twitter}
        setUrl={setTwitter}
      />
      <ManageLink
        icon={json.lineIcons ? <RiDiscordLine size="28" /> : <RiDiscordFill size="28" />}
        title="Discord"
        url={discord}
        setUrl={setDiscord}
      />

      <ManageLink
        icon={json.lineIcons ? <RiMediumLine size="28" /> : <RiMediumFill size="28" />}
        title="Medium"
        url={medium}
        setUrl={setMedium}
      />

      <ManageLink
        icon={json.lineIcons ? <RiLinkedinLine size="28" /> : <RiLinkedinFill size="28" />}
        title="LinkedIn"
        url={linkedin}
        setUrl={setLinkedin}
      />

      <ManageLink
        icon={json.lineIcons ? <RiYoutubeLine size="28" /> : <RiYoutubeFill size="28" />}
        title="Youtube"
        url={youtube}
        setUrl={setYoutube}
      />
      <ManageLink
        icon={json.lineIcons ? <RiGithubLine size="28" /> : <RiGithubFill size="28" />}
        title="Github"
        url={github}
        setUrl={setGithub}
      />
      <ManageLink
        icon={json.lineIcons ? <RiPinterestLine size="28" /> : <RiPinterestFill size="28" />}
        title="Pinterest"
        url={pinterest}
        setUrl={setPinterest}
      />
      <ManageLink
        icon={json.lineIcons ? <RiFacebookLine size="28" /> : <RiFacebookFill size="28" />}
        title="Facebook"
        url={facebook}
        setUrl={setFacebook}
      />
      <ManageLink
        icon={json.lineIcons ? <RiInstagramLine size="28" /> : <RiInstagramFill size="28" />}
        title="Instagram"
        url={instagram}
        setUrl={setInstagram}
      />
      <ManageLink
        icon={json.lineIcons ? <RiSailboatLine size="28" /> : <RiSailboatFill size="28" />}
        title="Opensea"
        url={opensea}
        setUrl={setOpensea}
      />
      <ManageLink
        icon={json.lineIcons ? <RiTelegramLine size="28" /> : <RiTelegramFill size="28" />}
        title="Telegram"
        url={telegram}
        setUrl={setTelegram}
      />
    </Stack>
  );
}

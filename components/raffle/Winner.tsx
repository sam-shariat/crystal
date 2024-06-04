import {
  Tag,
  Td,
  Tr,
  Text,
  Link,
  Tooltip,
  useColorMode,
  Stack,
  useMediaQuery,
  useDisclosure,
  Avatar,
} from '@chakra-ui/react';
import { LinkIcon, Logo } from 'components/logos';
import { connectedAccountAtom, venomProviderAtom } from 'core/atoms';
import { sleep, truncAddress } from 'core/utils';
import { AVATAR_API_URL, SITE_PROFILE_URL, VENOMSCAN_NFT, VENOMSCAN_TX } from 'core/utils/constants';
import { lookupNames } from 'core/utils/reverse';
import { useAtomValue } from 'jotai';
import React, { useEffect, useState } from 'react';

interface WinnerProps {
  owner: string;
  prize: string;
  tx: string;
  name: string;
}

const Winner = ({ owner, prize, tx, name }: WinnerProps) => {
  const lightMode = useColorMode().colorMode === 'light';
  const provider = useAtomValue(venomProviderAtom);
  const connectedAccount = useAtomValue(connectedAccountAtom);
  const { isOpen, onToggle } = useDisclosure();
  const [notMobile] = useMediaQuery('(min-width: 768px)');
  const [small] = useMediaQuery('(min-width: 376px)');
  const [_name, setName] = useState(owner);

  const getOwnerName = async () => {
    await sleep(300); 
    const _name = await lookupNames(provider, owner);
    console.log(_name);
    if (_name.length > 0) setName(_name[0]);
  };

  useEffect(() => {
    if (connectedAccount.length > 60 && provider) {
      getOwnerName();
    }
  }, [provider, connectedAccount]);

  return (
    <Tr>
      <Td gap={3} display={'flex'} alignItems="center" minH={'54px'}>
        {notMobile && (
          <>
            {prize.includes('VENOM') ? (
              <LinkIcon type="venom" color="#2bb673" />
            ) : prize.includes('PUNK') ? (<LinkIcon type="https://ipfs.io/ipfs/QmdwW8egQuQAYsEYgdz1coTExinMrjfheAYHm4PxX6stJB/punks.venom.png" size={'md'} />
          ) : prize.includes('STAX') ? <LinkIcon type="https://ipfs.io/ipfs/QmRFe5HjkmjEoE7P77zzq4QKqzGP5fDivwCiDZ9ci4zb7Y/photo_2024-03-26_22-24-00.jpg" size={'md'} /> : (<Logo w={'35px'} h={'26px'} />
            )}
          </>
        )}
        <Stack gap={2} justify={'left'} minH={'54px'} justifyContent={'center'}>
          <Text>{prize}</Text>
          {tx !== '' && prize.includes('VENOM') && (
            <Link style={{ textDecoration: 'underline' }} href={VENOMSCAN_TX + tx} target="_blank">
              <Tag
                px={3}
                colorScheme='yellow'
                py={1}
                rounded={'full'}
                textAlign={'center'}
                fontSize={!small ? 'md' : ['lg', 'xl']}
                onClick={onToggle}
                fontWeight={'bold'}>
                transaction
              </Tag>
            </Link>
          )}
          {tx !== '' && prize.includes('domain') && (
            <Link style={{ textDecoration: 'underline' }} href={VENOMSCAN_NFT + tx} target="_blank">
              <Tag
                px={3}
                colorScheme='yellow'
                py={1}
                rounded={'full'}
                textAlign={'center'}
                fontSize={!small ? 'md' : ['lg', 'xl']}
                onClick={onToggle}
                fontWeight={'bold'}>
                {name}
              </Tag>
            </Link>
          )}
        </Stack>
      </Td>
      <Td >
        <Tooltip
          hasArrow
          color="white"
          bgColor={'black'}
          p={4}
          rounded={'2xl'}
          label={owner}
          aria-label={`winner-${prize}-tooltip`}>
          <Tag
            px={3}
            pl={_name.includes('.venom') ? 1 : 3}
            py={1}
            gap={2}
            rounded={'full'}
            textAlign={'center'}
            fontSize={!small ? 'md' : ['lg', 'xl']}
            as={Link} style={{ textDecoration: 'none' }} href={_name.includes('.venom') ? SITE_PROFILE_URL + _name : VENOMSCAN_NFT + owner} target="_blank"
            fontWeight={'bold'}>
              {_name.includes('.venom') && <Avatar
                    
                    icon={<LinkIcon type="RiUserLine" size={22} color="#ffffff" />}
                    rounded={'full'}
                    src={AVATAR_API_URL + _name + '&v='+Math.random()}
                    size={['md']}
                  />}
            <Text
              bgGradient={
                lightMode
                  ? 'linear(to-r, var(--venom2), var(--bluevenom2))'
                  : 'linear(to-r, var(--venom0), var(--bluevenom0))'
              }
              bgClip="text">
              {_name.includes('.venom')
                ? notMobile
                  ? _name
                  : _name.length > 13
                  ? _name.slice(0, 10) + '...'
                  : _name
                : truncAddress(owner)}
            </Text>
          </Tag>
        </Tooltip>
      </Td>
    </Tr>
  );
};

export default Winner;

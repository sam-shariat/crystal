import {
  Button,
  Flex,
  useMediaQuery,
  useColorMode,
  Stack,
  Text,
  useColorModeValue,
  IconButton,
  Heading,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { LinkIcon, Logo } from 'components/logos';
import { colorModeAtom, nameAtom } from 'core/atoms';
import { useAtom, useAtomValue } from 'jotai';

export default function ManageHeader() {
  const name = useAtomValue(nameAtom);
  const [notMobile] = useMediaQuery('(min-width: 992px)');

  return (
    <Flex gap={2} justify={'space-between'} align={'center'} mb={2}>
      <NextLink href="/manage" passHref>
        <Button id="venomidlogo" fontWeight="bold" p={2} gap={[0,0,0,2]} size={'lg'}>
          <LinkIcon type='RiArrowLeftLine' />
          <Text>
            {notMobile ? 'Dashboard' : ''}
          </Text>
        </Button>
      </NextLink>
    <Button id="venomidlogo" fontWeight="bold" variant="ghost" p={2} gap={2} size={'lg'}>
      <Logo />
      <Heading bgGradient={useColorModeValue(
              'linear(to-r, var(--venom2), var(--bluevenom2))',
              'linear(to-r, var(--venom0), var(--bluevenom0))'
            )}
            bgClip="text" fontSize={'xl'} fontWeight={'bold'}>
        {name}
      </Heading>
      </Button>
    </Flex>
  );
}

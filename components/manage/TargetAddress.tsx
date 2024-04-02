import {
  Button,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  useColorMode,
  Flex,
  useToast,
  Link,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { LinkIcon } from 'components/logos';
import WalletInput from './WalletInput';
import { isValidVenomAddress, truncAddress } from 'core/utils';
import { useConnect, useVenomProvider } from 'venom-react-hooks';
import { Address } from 'everscale-inpage-provider';
import DomainAbi from 'abi/Domain.abi.json';
import { useAtom, useAtomValue } from 'jotai';
import { nameAtom, targetAtom } from 'core/atoms';
import { VENOMSCAN_NFT } from 'core/utils/constants';

interface Props {
  nftAddress: string;
}

export default function TargetAddress({ nftAddress }: Props) {
  const [target, setTarget] = useAtom(targetAtom);
  const [_target, _setTarget] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const lightMode = useColorMode().colorMode === 'light';
  const { provider } = useVenomProvider();
  const { account } = useConnect();
  const toast = useToast();

  async function saveTarget() {
    if (!provider?.isInitialized || !account) return;

    setIsSaving(true);
    toast({
      status: 'loading',
      title: `setting ${_target} as the target wallet`,
      description: 'Please confirm the transaction in your wallet',
      duration: null,
      isClosable: true,
    });

    const domainContract = new provider.Contract(DomainAbi, new Address(nftAddress));
    // @ts-ignore
    const setTargetTransaction = await domainContract.methods.setTarget({ target: new Address(_target) })
      .send({ from: account.address, amount: String(3e8), bounce: true });

    if (setTargetTransaction) {
      console.log(setTargetTransaction)
      toast.closeAll();
      toast({
        status: 'success',
        title: 'Save Successful',
        description: 'Target Venom Address Saved Successfully',
        duration: 5000,
        isClosable: true,
      });
      setTarget(_target);
    } else {
      toast.closeAll();
      toast({
        status: 'error',
        title: 'Save Failed',
        description: 'Target Venom Address Could Not Be Saved, Please Try Again',
        duration: null,
        isClosable: true,
      });
    }

    setIsSaving(false);
  }

  return (
    <>
      <Accordion
        allowToggle
        allowMultiple={false}
        size="lg"
        display={'flex'}
        w={'100%'}
        defaultIndex={target === '' ? [0] : undefined}>
        <AccordionItem border={0} borderRadius={0} width={'100%'}>
          <AccordionButton
            as={Button}
            size={'lg'}
            bgGradient={target === '' ?
              lightMode
                ? 'linear(to-r, var(--venom1), var(--bluevenom1))'
                : 'linear(to-r, var(--venom2), var(--bluevenom2))'
                : 'none'
            }
            _expanded={{
              bgGradient: lightMode
                ? 'linear(to-r, var(--venom1), var(--bluevenom1))'
                : 'linear(to-r, var(--venom2), var(--bluevenom2))',
              borderBottomRadius: 0,
            }}
            _hover={{
              bgGradient: lightMode
                ? 'linear(to-r, var(--venom0), var(--bluevenom0))'
                : 'linear(to-r, var(--venom0), var(--bluevenom0))',
            }}
            gap={4}
            color={target === '' ? 'white' : lightMode ? 'var(--dark)' : 'white'}
            variant="solid"
            width={'100%'}>
            <LinkIcon type="venom" size={26} color={target === '' ? 'white' : lightMode ? 'black' : 'white'} />
            <Text fontSize={'lg'}>{target === '' ? 'Set Target Wallet Address' : 'Update Target Wallet Address'}</Text>
          </AccordionButton>
          <AccordionPanel
            py={4}
            gap={4}
            display={'flex'}
            borderBottomRadius={8}
            flexDirection={'column'}
            bgColor={lightMode ? 'blackAlpha.200' : 'whiteAlpha.200'}>
            {target !==  '' ? <Link href={VENOMSCAN_NFT + target} target="_blank">
                    <Flex opacity={0.5} gap={2} fontSize={'md'} align={'center'}>
                      <LinkIcon type={'wallet'} line />
                      domain is pointing to {truncAddress(target)}
                    </Flex>
                  </Link> : <Text>point your domain to a venom wallet</Text>}
            <WalletInput
              setValue={_setTarget}
              title={'Venom'}
              value={_target}
              hideTitle={true}
              key={'target-venom-address'}
            />
            <Flex gap={4}>
              <Button
                colorScheme="green"
                isLoading={isSaving}
                loadingText='Saving ...'
                isDisabled={isSaving || !isValidVenomAddress(_target) || _target === target}
                w={'100%'}
                onClick={() => saveTarget()}>
                {target === '' ? 'Set Target Address' : target === _target ? 'Target Address is Set' : 'Update Target Address'}
              </Button>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}

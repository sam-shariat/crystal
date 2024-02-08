import {
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Button,
  Text,
  Flex,
  useMediaQuery,
  useColorMode,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import ManageWallet from './ManageWallet';
import { useAtom, useAtomValue } from 'jotai';
import { addressAtom, useLineIconsAtom, walletsArrayAtom } from 'core/atoms';
import { LinkIcon } from 'components/logos';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import AddWalletButton from './AddWalletButton';
import { capFirstLetter, arrayRemove } from 'core/utils';
import { SortableItemProps, SortableConProps } from 'types';

interface Props {
  json: any;
  nftAddress: string;
}

export default function ManageWallets({ json, nftAddress }: Props) {
  const useLineIcons = useAtomValue(useLineIconsAtom);
  const [walletsArray, setWalletsArray] = useAtom(walletsArrayAtom);
  const [notMobile] = useMediaQuery('(min-width: 800px)');
  const { colorMode } = useColorMode();
  const venom = useAtomValue(addressAtom);

  // @ts-ignore: Unreachable code error
  const setUrl = (name, value) => {
    let _newWalletsArray = walletsArray.map((item) =>
      item.key === name ? { key: item.key, value } : { key: item.key, value: item.value }
    );
    setWalletsArray(_newWalletsArray);
  };

  // @ts-ignore: Unreachable code error
  const removeUrl = (index) => {
    let _newWalletsArray = arrayRemove(walletsArray, index);
    // console.log(_newWalletsArray);
    setWalletsArray(_newWalletsArray);
  };

  // @ts-ignore: Unreachable code error
  const SortableCon = SortableContainer<SortableConProps>(({ children }: { children: ReactNode }) => {
      return <ul>{children}</ul>;
    }
  );

  // @ts-ignore: Unreachable code error
  const SortableItem = SortableElement<SortableItemProps>(({ children }: { children: ReactNode }) => (
      <li style={{ listStyleType: 'none', padding: '0px 0px', margin: '12px 0px' }}>{children}</li>
    )
  );

  useEffect(() => {
    let _wallets = [];
    for (const key in json.wallets) {
      json.wallets[key] && _wallets.push({ key: key, value: json.wallets[key] });
    }

    if (_wallets.length === 0) {
      _wallets.push({ key: 'venom', value: venom });
    }
    // console.log(_wallets);
    setWalletsArray(_wallets);
  }, []);

  // @ts-ignore: Unreachable code error
  const onSortEnd = ({ oldIndex, newIndex }) => {
    setWalletsArray(arrayMoveImmutable(walletsArray, oldIndex, newIndex));
    // console.log(walletsArray);
  };

  return (
    <>
      <Accordion
        allowToggle
        allowMultiple={false}
        borderRadius={10}
        minWidth={'100%'}
        size="lg"
        className="wallets"
        backgroundColor={colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100'}
        display={'flex'}>
        <AccordionItem border={0} borderRadius={10} width={'100%'}>
          <AccordionButton
            minWidth={'100%'}
            as={Button}
            size="lg"
            _expanded={{ bgColor: 'blackAlpha.50' }}>
            <Flex
              gap={2}
              alignItems={'center'}
              textAlign="left"
              width={notMobile ? '100%' : '100%'}>
              <Text fontWeight={'bold'} display={'flex'} flex={1}>
                Wallets
              </Text>
              <AccordionIcon />
            </Flex>
          </AccordionButton>

          <AccordionPanel py={4} minWidth="100%">
            <Stack gap={2}>
              <AddWalletButton />

              <SortableCon onSortEnd={onSortEnd} useDragHandle>
                <>
                  {walletsArray.map(
                    (item, index) =>
                      item.key && (
                        <SortableItem key={`item-${item.key}`} index={index}>
                          <>
                            <ManageWallet
                              icon={<LinkIcon line={useLineIcons} type={item.key.toLowerCase()} />}
                              title={capFirstLetter(item.key)}
                              url={String(item.value)}
                              setUrl={setUrl}
                              ind={index}
                              removeUrl={removeUrl}
                            />
                          </>
                        </SortableItem>
                      )
                  )}
                </>
              </SortableCon>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}

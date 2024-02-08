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
import ManageSocial from './ManageSocial';
import { useAtom, useAtomValue } from 'jotai';
import {
  useLineIconsAtom,
  socialsArrayAtom,
} from 'core/atoms';
import { LinkIcon } from 'components/logos';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import AddSocialButton from './AddSocialButton';
import { capFirstLetter, arrayRemove } from 'core/utils';
import { SortableItemProps, SortableConProps } from 'types';

interface Props {
  json: any;
  nftAddress: string;
}

export default function ManageSocials({ json, nftAddress }: Props) {
  const useLineIcons = useAtomValue(useLineIconsAtom);
  const [socialsArray, setSocialsArray] = useAtom(socialsArrayAtom);
  const [notMobile] = useMediaQuery('(min-width: 800px)');
  const { colorMode } = useColorMode();

  // @ts-ignore: Unreachable code error
  const setUrl = (name, value) => {
    let _newSocialsArray = socialsArray.map((item) =>
      item.key === name ? { key: item.key, value } : { key: item.key, value: item.value }
    );
    setSocialsArray(_newSocialsArray);
  };

  // @ts-ignore: Unreachable code error
  const removeUrl = (index) => {
    let _newSocialsArray = arrayRemove(socialsArray,index);
    // console.log(_newSocialsArray)
    setSocialsArray(_newSocialsArray);
  };

  // @ts-ignore: Unreachable code error
  const SortableCon = SortableContainer<SortableConProps>(({ children } : { children: ReactNode } ) => {
    return <ul>{children}</ul>;
  });

  // @ts-ignore: Unreachable code error
  const SortableItem = SortableElement<SortableItemProps>(({ children }: { children: ReactNode }) => (
    <li style={{ listStyleType: 'none', padding: '0px 0px', margin: '12px 0px' }}>{children}</li>
  ));

  useEffect(() => {
    let _socials = [];
    for (const key in json.socials) {
      json.socials[key] && _socials.push({ key: key, value: json.socials[key] });
    }
    // console.log(_socials);
    setSocialsArray(_socials);
  }, []);

  // @ts-ignore: Unreachable code error
  const onSortEnd = ({ oldIndex, newIndex }) => {
    setSocialsArray(arrayMoveImmutable(socialsArray, oldIndex, newIndex));
    // console.log(socialsArray)
  };

  return (
    <>
      <Accordion
        allowToggle
        allowMultiple={false}
        borderRadius={10}
        minWidth={'100%'}
        size="lg"
        className='socials'
        backgroundColor={colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100'}
        display={'flex'}>
        <AccordionItem border={0} borderRadius={10} width={'100%'}>
          <AccordionButton minWidth={'100%'} as={Button} size='lg' _expanded={{bgColor: 'blackAlpha.50'}}>
            <Flex
              gap={2}
              alignItems={'center'}
              textAlign="left"
              width={'100%'}>
              <Text fontWeight={'bold'} display={'flex'} flex={1}>
                Social Links
              </Text>
              <AccordionIcon />
            </Flex>
          </AccordionButton>

          <AccordionPanel py={4} minWidth="100%">
            <Stack gap={2}>
              <AddSocialButton />
              <SortableCon onSortEnd={onSortEnd} useDragHandle>
              <>
                {socialsArray.map(
                  (item, index) =>
                    item.key && (
                      <SortableItem key={`item-${item.key}`} index={index}>
                        <>
                        <ManageSocial
                          icon={<LinkIcon line={useLineIcons} type={item.key} />}
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

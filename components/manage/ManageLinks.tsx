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
import React, { useEffect, ReactNode } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { linksArrayAtom, useLineIconsAtom } from 'core/atoms';
import { LinkIcon } from 'components/logos';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import AddLinkButton from './AddLinkButton';
import ManageLink from './ManageLink';
import { capFirstLetter, arrayRemove } from 'core/utils';
import { CustomLink, SortableItemProps, SortableConProps } from 'types';
import { IPFS_IMAGE_URI } from 'core/utils/constants';

interface Props {
  json: any;
  nftAddress: string;
}

export default function ManageLinks({ json, nftAddress }: Props) {
  const useLineIcons = useAtomValue(useLineIconsAtom);
  const [linksArray, setLinksArray] = useAtom(linksArrayAtom);
  const [notMobile] = useMediaQuery('(min-width: 800px)');
  const { colorMode } = useColorMode();

  const SortableCon = SortableContainer<SortableConProps>(
    ({ children }: { children: ReactNode }) => {
      return <ul>{children}</ul>;
    }
  );

  // @ts-ignore: Unreachable code error
  const setLinks = (index, title, url, image, content, styles) => {
    let _newLinksArray = linksArray.map((item, ind) =>
      ind === index
        ? {
            type: item.type,
            title,
            url,
            image,
            content,
            styles,
          }
        : {
            type: item.type,
            title: item.title,
            url: item.url,
            image: item.image,
            content: item.content,
            styles: item.styles,
          }
    );
    setLinksArray(_newLinksArray);
  };

  // @ts-ignore: Unreachable code error
  const removeLink = (index) => {
    let _newLinksArray = arrayRemove(linksArray, index);
    // console.log(_newLinksArray);
    setLinksArray(_newLinksArray);
  };

  // @ts-ignore: Unreachable code error
  const SortableItem = SortableElement<SortableItemProps>(
    ({ children }: { children: ReactNode }) => (
      <li style={{ listStyleType: 'none', padding: '0px 0px', margin: '12px 0px' }}>{children}</li>
    )
  );

  useEffect(() => {
    // @ts-ignore: Unreachable code error
    let _links = [];
    if (json?.links) {
      json?.links.map((link: CustomLink) => {
        _links.push({
          type: link.type,
          title: link.title,
          url: link.url,
          image: link.image,
          content: link.content,
          styles: link.styles,
        });
      });
    }
    // @ts-ignore: Unreachable code error
    setLinksArray(_links);
  }, [json.links]);

  // @ts-ignore: Unreachable code error
  const onSortEnd = ({ oldIndex, newIndex }) => {
    setLinksArray(arrayMoveImmutable(linksArray, oldIndex, newIndex));
  };

  return (
    <>
      <Accordion
        allowToggle
        allowMultiple={false}
        borderRadius={10}
        minWidth={'100%'}
        size="lg"
        backgroundColor={colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100'}
        display={'flex'}
        className="links">
        <AccordionItem border={0} borderRadius={10} width={'100%'}>
          <AccordionButton
            minWidth={'100%'}
            as={Button}
            size="lg"
            _expanded={{ bgColor: 'blackAlpha.50' }}>
            <Flex gap={2} alignItems={'center'} textAlign="left" width={'100%'}>
              <Text fontWeight={'bold'} display={'flex'} flex={1}>
                Links & NFTs
              </Text>
              <AccordionIcon />
            </Flex>
          </AccordionButton>

          <AccordionPanel pb={4} minWidth="100%">
            <Stack gap={2}>
              <AddLinkButton />

              <SortableCon onSortEnd={onSortEnd} useDragHandle>
                <>
                  {linksArray.map((item, index) => (
                    <SortableItem key={`item-${item.title}-${index}`} index={index}>
                      <>
                        <ManageLink
                          icon={
                            <LinkIcon
                              type={item.styles?.icon ?? item.type}
                              line={useLineIcons}
                              size={
                                String(item.styles?.icon).includes(IPFS_IMAGE_URI) ? 'md' : '28px'
                              }
                            />
                          }
                          title={item.title}
                          image={item.image}
                          url={item.url}
                          type={item.type}
                          content={item.content}
                          styles={item.styles}
                          ind={index}
                          setUrl={setLinks}
                          removeUrl={removeLink}
                        />
                      </>
                    </SortableItem>
                  ))}
                </>
              </SortableCon>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}

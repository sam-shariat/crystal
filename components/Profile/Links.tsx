import Link from './Link';
import { Stack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { LinkIcon } from 'components/logos';
import { linksArrayAtom } from 'core/atoms';
import { capFirstLetter } from 'core/utils';
import { CustomLink } from 'types';

interface Props {
  json: any;
  color?: string;
}

export default function Links({ json, color }: Props) {
  const [linksArray, setLinksArray] = useAtom(linksArrayAtom);

  useEffect(() => {
    let _links: CustomLink[] = [];
    if (json?.links) {
      json?.links.map((link:CustomLink) => {
        _links.push({
          type: link.type,
          title: link.title,
          url: link.url,
          image: link.image,
          content: link.content,
          styles: link.styles
        });
      });
    }
    setLinksArray(_links);
  }, []);

  return (
    <>
      {linksArray.length > 0 && <Stack gap={3} width={['100%', 'md']}>
        {linksArray.map((item, index) => (
          <Link
            key={`item-${item.type}-${item.title}`}
            title={capFirstLetter(item.title)}
            url={item.type.includes('pdf') ? String(item.image) : String(item.url)}
            type={item.type}
            color={color ? color : 'default'}
            icon={<LinkIcon type={item.type} line color={color ? color : 'default'}/>}
            image={item.image}
            content={item.content}
            styles={item.styles}
          />
        ))}
      </Stack>}
    </>
  );
}

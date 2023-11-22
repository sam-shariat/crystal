import React from 'react';
import {
  SITE_DESCRIPTION,
  SITE_FULL_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
  SOCIAL_TWITTER,
} from 'core/utils/constants';
import { DefaultSeo } from 'next-seo';

interface Props {
  title?: string;
  description?: string;
}

export function Seo({title = SITE_TITLE,description = SITE_DESCRIPTION}: Props) {
  const origin =
    typeof window !== 'undefined' && window.location.href ? window.location.href : SITE_URL;
  return (
    <DefaultSeo
      title={title}
      defaultTitle={title}
      titleTemplate={`%s | ${description}`}
      description={SITE_FULL_DESCRIPTION}
      canonical={origin}
      themeColor={'#101212'}
      defaultOpenGraphImageWidth={512}
      defaultOpenGraphImageHeight={512}
      openGraph={{
        type: 'website',
        siteName: SITE_TITLE,
        url: origin,
        description: SITE_FULL_DESCRIPTION,
        defaultImageHeight: 512,
        defaultImageWidth: 512,
        title: SITE_TITLE,
        images: [
          {
            url: `${SITE_URL}logos/vid.png`,
            alt: `${SITE_TITLE} Open Graph Image`,
            width: 512,
            height: 512,
            secureUrl: SITE_URL + 'logos/vid.png',
          },
          {
            url: `${SITE_URL}vidog.png`,
            alt: `${SITE_TITLE} Open Graph Image`,
            width: 1200,
            height: 600,
            secureUrl: SITE_URL + 'vidog.png',
          },
        ],
      }}
      twitter={{
        handle: `@${SOCIAL_TWITTER}`,
        site: `@${SOCIAL_TWITTER}`,
        cardType: 'summary',
      }}
      additionalLinkTags={[
        {
          rel: 'icon',
          href: `/logos/vidicon.png`,
        },
        {
          rel: 'apple-touch-icon',
          href: `/logos/vidicon.png`,
          sizes: '76x76',
        },
        {
          rel: 'manifest',
          href: '/manifest.json',
        },
      ]}
    />
  );
}

import React from 'react'
import { SITE_DESCRIPTION, SITE_FULL_DESCRIPTION, SITE_TITLE, SITE_URL, SOCIAL_TWITTER, TWITTER_URL } from 'core/utils/constants'
import { DefaultSeo } from 'next-seo'

export function Seo() {
  return (
    <DefaultSeo
      title={SITE_TITLE}
      defaultTitle={SITE_TITLE}
      titleTemplate={`%s | ${SITE_DESCRIPTION}`}
      description={SITE_FULL_DESCRIPTION}
      canonical={SITE_URL.slice(0,-1)}
      themeColor={'#101212'}
      defaultOpenGraphImageWidth={1200}
      defaultOpenGraphImageHeight={600}
      openGraph={{
        type: 'website',
        siteName: SITE_TITLE,
        url: SITE_URL,
        description: SITE_FULL_DESCRIPTION,
        defaultImageHeight:600,
        defaultImageWidth:1200,
        title:SITE_TITLE,
        images: [
          {
            url: `${SITE_URL}vidog.png`,
            alt: `${SITE_TITLE} Open Graph Image`,
          },
        ],
      }}
      twitter={{
        handle: `@${SOCIAL_TWITTER}`,
        site: `@${SOCIAL_TWITTER}`,
        cardType: 'summary_large_image',
      }}
      additionalLinkTags={[
        {
          rel: 'icon',
          href: `/logos/vidicon.png`,
        },
        {
          rel: 'apple-touch-icon',
          href: `/logos/vidicon.png`,
          sizes: '76x76'
        },
        {
          rel: 'manifest',
          href: '/manifest.json'
        },
      ]}
    />
  )
}

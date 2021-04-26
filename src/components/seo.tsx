/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

type SEOQueryResult = {
  site: {
    siteMetadata?: {
      author?: {
        name?: string;
        summary?: string;
      };
      description?: string;
      social: {
        twitter: string;
      };
      title: string;
    };
  };
};

type Props = {
  canonicalName?: string;
  canonicalUrl?: string;
  description?: string;
  lang?: string;
  title: string;
};

const SEO: React.FC<Props> = ({
  description,
  lang,
  title,
  canonicalName,
  canonicalUrl,
}) => {
  const { site } = useStaticQuery<SEOQueryResult>(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            social {
              twitter
            }
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata?.description;
  const defaultTitle = site.siteMetadata?.title;
  const meta = [
    {
      name: 'description',
      content: metaDescription,
    },
    {
      property: 'og:title',
      content: title,
    },
    {
      property: 'og:description',
      content: metaDescription,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      name: 'twitter:card',
      content: 'summary',
    },
    {
      name: 'twitter:creator',
      content: site.siteMetadata?.social?.twitter || '',
    },
    {
      name: 'twitter:title',
      content: title,
    },
    {
      name: 'twitter:description',
      content: metaDescription,
    },
  ];

  const canonicalLink =
    canonicalName && canonicalUrl
      ? [
          {
            rel: 'canonical',
            key: canonicalName,
            href: canonicalUrl,
          },
        ]
      : [];

  return (
    <Helmet
      link={canonicalLink}
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : undefined}
      meta={meta}
    />
  );
};

SEO.defaultProps = {
  lang: 'en',
  description: '',
};

export default SEO;

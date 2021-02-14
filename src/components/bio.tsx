import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image, { FixedObject } from 'gatsby-image';

type BioQueryResult = {
  avatar?: {
    childImageSharp?: {
      fixed: FixedObject;
    };
  };
  site: {
    siteMetadata?: {
      author?: {
        name?: string;
        summary?: string;
      };
      social: {
        github: string;
        twitter: string;
      };
    };
  };
};

const Bio = () => {
  const data = useStaticQuery<BioQueryResult>(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50, quality: 95) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            github
            twitter
          }
        }
      }
    }
  `);

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author;
  const social = data.site.siteMetadata?.social;

  const avatar = data?.avatar?.childImageSharp?.fixed;

  return (
    <div className="bio">
      {avatar && (
        <Image
          fixed={avatar}
          alt={author?.name || ``}
          className="bio-avatar"
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
      )}
      {author?.name && (
        <>
          <p>
            Written by <strong>{author.name}</strong>, {author?.summary}
            <br />
            <a href={`https://github.com/${social?.github || ``}`}>Github</a>
            {' | '}
            <a href={`https://twitter.com/${social?.twitter || ``}`}>Twitter</a>
          </p>
        </>
      )}
    </div>
  );
};

export default Bio;

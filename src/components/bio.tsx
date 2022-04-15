import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image, { FixedObject } from 'gatsby-image';
import { Twitter, Linkedin, GitHub } from 'react-feather';

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
        linkedin: string;
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
            linkedin
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
            <div className="social-container">
              <a
                href={`https://github.com/${social?.github || ``}`}
                className="social"
              >
                <GitHub size={16} />
                Github
              </a>
              {' | '}
              <a
                href={`https://twitter.com/${social?.twitter || ``}`}
                className="social"
              >
                <Twitter size={16} /> Twitter
              </a>
              {' | '}
              <a
                href={`https://www.linkedin.com/in/${social?.linkedin || ``}`}
                className="social"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>
          </p>
        </>
      )}
    </div>
  );
};

export default Bio;

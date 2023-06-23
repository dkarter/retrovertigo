import React from 'react';
import { Link, graphql, PageProps } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { Tags } from '../components/Tags';
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image';
import { ReadingTime } from '../components/ReadingTime';

type Post = {
  excerpt: string;
  fields: {
    slug: string;
    readingTime: {
      text: string;
    };
  };
  frontmatter: {
    title: string;
    date: string;
    description?: string;
    image?: ImageDataLike;
    tags?: string;
  };
};

type DataProps = {
  allMarkdownRemark: {
    nodes: Post[];
  };
  site: {
    siteMetadata?: {
      title: string;
    };
  };
};

const BlogIndex: React.FC<PageProps<DataProps>> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || 'Title';
  const posts = data.allMarkdownRemark.nodes;

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to &quot;content/blog&quot;
          (or the directory you specified for the
          &quot;gatsby-source-filesystem&quot; plugin in gatsby-config.js).
        </p>
      </Layout>
    );
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      <ol className="post-list" style={{ listStyle: `none` }}>
        {posts.map((post) => {
          const title = post.frontmatter.title || post.fields.slug;
          const tags = (post.frontmatter.tags || '').split(',');
          const image =
            post.frontmatter.image && getImage(post.frontmatter.image);

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      {image && (
                        <GatsbyImage
                          className="post-featured-image"
                          alt={post.frontmatter.title}
                          image={image}
                        />
                      )}

                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <div className="post-info">
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <small>{post.frontmatter.date}</small>
                      <small>|</small>
                      <ReadingTime text={post.fields.readingTime.text} />
                    </div>
                    <Tags tags={tags} />
                  </div>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          );
        })}
      </ol>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
          readingTime {
            text
          }
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          image {
            childImageSharp {
              gatsbyImageData(
                breakpoints: [300, 632]
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
          tags
        }
      }
    }
  }
`;

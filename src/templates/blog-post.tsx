import React from 'react';
import { Link, graphql, PageProps } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { Tags } from '../components/Tags';

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        canonicalName
        canonicalUrl
        date(formatString: "MMMM DD, YYYY")
        description
        tags
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;

type Post = {
  excerpt: string;
  html: string;
  fields: {
    slug: string;
  };

  frontmatter: {
    canonicalName?: string;
    canonicalUrl?: string;
    date: string;
    description?: string;
    title: string;
    tags?: string;
  };
};

type DataResult = {
  site: {
    siteMetadata?: {
      title: string;
    };
  };
  markdownRemark: Post;
  previous: Post;
  next: Post;
};

const BlogPostTemplate: React.FC<PageProps<DataResult>> = ({
  data,
  location,
}) => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const { previous, next } = data;
  const tags = (post.frontmatter.tags || '').split(',');

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        canonicalName={post.frontmatter.canonicalName}
        canonicalUrl={post.frontmatter.canonicalUrl}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
          <Tags tags={tags} />
          {post.frontmatter.canonicalName && post.frontmatter.canonicalName && (
            <p style={{ fontSize: '1rem' }}>
              Originally posted by me on{' '}
              <a
                target="_blank"
                rel="noreferrer"
                href={post.frontmatter.canonicalUrl}
              >
                {post.frontmatter.canonicalName}
              </a>
            </p>
          )}
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  );
};

export default BlogPostTemplate;

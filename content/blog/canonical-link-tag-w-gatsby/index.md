---
slug: canonical-link-tag-w-gatsby
date: 2021-04-26
title: "Canonical Link Tag w/ Gatsby"
tags: seo, react, gatsby
---

I recently [scraped](https://github.com/dkarter/til_scrape) all my old
[Hashrocket TIL](https://til.hashrocket.com) posts and re-posted them here on my
blog. One of the reasons is that I wanted to have all that great content that I
wrote for over 5 years help me with filling in this blog.

One of the things you need to keep in mind when copying content from another
site is that search engines may penalize you/or them for plagiarism because it
doesn't know which site is the original owner of the content.

## Fixing Duplicate Content
When content exists in more than one URL, it is a best practice for the copy to
signify to search engines which source is the canonical one. This is where
Canonical Link Tag comes in:

```html
<head>
  <!-- ... -->
  <link rel="canonical" href="https://example.com/blog/post" />
  <!-- ... -->
</head>
```

That link tag lives inside the `<head>` tag and should only be specified once!
Make sure to check out this article by Google of [5 Common Mistakes with
rel=canonical](https://developers.google.com/search/blog/2013/04/5-common-mistakes-with-relcanonical)

This technique is also useful if you have multiple URLs for your website (e.g.
`www.example.com/blog/post` and bare domain - `example.com/blog/post`).

## Adding Canonical Link Tag on Gatsby

Gatsby is built on top of React, and if you use the [default starter blog
template](https://github.com/gatsbyjs/gatsby-starter-blog) you will get an SEO
component out of the box. That component is using the [React Helmet
library](https://github.com/nfl/react-helmet). This library allows you to inject
content into the head tag. The body of the SEO component should look something
like this:


```jsx
const SEO = ({ title, lang, description }) => {
  // ...
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : undefined}
      meta={meta}
    />
  );
}
```

To inject the canonical link tag all we have to do is modify the `<Helmet>`
properties to include the link property. Since not all posts are going to have
the canonical tag, we will make it optional:


```jsx
const SEO = ({ title, lang, description, canonicalName, canonicalUrl }) => {
  // ...
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
}
```

Now in our post template component we will need to pass the canonical
properties (`canonicalName` and `canonicalUrl`), which we read from the
frontmatter of the post w/ GraphQL, to the `SEO` component:

```tsx
export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    // ...
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
      }
    }
    // ...
  }
`;

const BlogPostTemplate: React.FC<PageProps<DataResult>> = ({
  data,
  location,
}) => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const { previous, next } = data;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        canonicalName={post.frontmatter.canonicalName}
        canonicalUrl={post.frontmatter.canonicalUrl}
      />
      {/* ... */}
    </Layout>
  );
}
```

Now all that's left is updating a post's frontmatter with the canonical
properties:

```markdown
---
slug: case-insensitive-in-query-in-postgres-psql
date: 2018-04-23 16:55:09Z
title: "Case insensitive `in` query in #postgres #psql"
tags: sql
canonicalName: "Hashrocket TIL"
canonicalUrl: https://til.hashrocket.com/posts/o0ohxzb7ho-case-insensitive-in-query-in-postgres-psql
---

If you have a list of strings and you want to query a column to get all the matching records, but you do not care about the casing, Postgres offers a cool and easy way of doing that with the citext extension.
...
```

To see this in action check out [one of my posts](/case-insensitive-in-query-in-postgres-psql). Full source code available on github: https://github.com/dkarter/retrovertigo



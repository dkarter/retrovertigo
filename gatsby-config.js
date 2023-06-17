// eslint-disable-next-line no-undef
module.exports = {
  siteMetadata: {
    title: 'Retrovertigo',
    author: {
      name: 'Dorian Karter',
      summary: 'a Sr. Software Engineer',
    },
    description:
      'Thoughts & TILs about Elixir, Elm, React, JavaScript and other things.',
    siteUrl: 'https://doriankarter.com/',
    social: {
      github: 'dkarter',
      twitter: 'dorian_escplan',
      linkedin: 'doriankarter',
    },
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        // eslint-disable-next-line no-undef
        path: `${__dirname}/content/blog`,
        name: 'blog',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        // eslint-disable-next-line no-undef
        path: `${__dirname}/content/assets`,
        name: 'assets',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          {
            resolve: 'gatsby-remark-graph',
            options: {
              // this is the language in your code-block that triggers mermaid parsing
              language: 'mermaid', // default
              theme: 'default', // could also be dark, forest, or neutral
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
        ],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map((node) => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ 'content:encoded': node.html }],
                });
              });
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'Retrovertigo: Blog by Dorian Karter',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Retrovertigo - A blog by Dorian Karter',
        short_name: 'Retrovertigo',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'content/assets/icon.png',
      },
    },
    'gatsby-plugin-react-helmet',
  ],
};

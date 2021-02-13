// If you don't want to use TypeScript you can delete this file!
import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
const UsingTypescript = ({ data, path, location, }) => (React.createElement(Layout, { title: "Using TypeScript", location: location },
    React.createElement(SEO, { title: "Using TypeScript" }),
    React.createElement("h1", null, "Gatsby supports TypeScript by default!"),
    React.createElement("p", null,
        "This means that you can create and write ",
        React.createElement("em", null, ".ts/.tsx"),
        " files for your pages, components etc. Please note that the ",
        React.createElement("em", null, "gatsby-*.js"),
        " files (like gatsby-node.js) currently don't support TypeScript yet."),
    React.createElement("p", null,
        "For type checking you'll want to install ",
        React.createElement("em", null, "typescript"),
        " via npm and run ",
        React.createElement("em", null, "tsc --init"),
        " to create a ",
        React.createElement("em", null, ".tsconfig"),
        " file."),
    React.createElement("p", null,
        "You're currently on the page \"",
        path,
        "\" which was built on",
        ' ',
        data.site.buildTime,
        "."),
    React.createElement("p", null,
        "To learn more, head over to our",
        ' ',
        React.createElement("a", { href: "https://www.gatsbyjs.com/docs/typescript/" }, "documentation about TypeScript"),
        "."),
    React.createElement(Link, { to: "/" }, "Go back to the homepage")));
export default UsingTypescript;
export const query = graphql `
  {
    site {
      buildTime(formatString: "YYYY-MM-DD hh:mm a z")
    }
  }
`;

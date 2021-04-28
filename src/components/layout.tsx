import React from 'react';
import { WindowLocation } from '@reach/router';
import { Link, useStaticQuery, graphql } from 'gatsby';
import Image, { FixedObject } from 'gatsby-image';
import { DarkModeToggle } from './DarkModeToggle';

type Props = {
  location: WindowLocation;
  title: string;
  children: React.ReactNode;
};

type LayoutQueryResult = {
  icon?: {
    childImageSharp?: {
      fixed: FixedObject;
    };
  };
  iconSmall?: {
    childImageSharp?: {
      fixed: FixedObject;
    };
  };
};

const Layout: React.FC<Props> = ({ location, title, children }) => {
  const data = useStaticQuery<LayoutQueryResult>(graphql`
    query LayoutQuery {
      icon: file(absolutePath: { regex: "/icon.png/" }) {
        childImageSharp {
          fixed(width: 50, height: 50, quality: 95) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      iconSmall: file(absolutePath: { regex: "/icon.png/" }) {
        childImageSharp {
          fixed(width: 20, height: 20, quality: 95) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  const icon = data?.icon?.childImageSharp?.fixed;
  const iconSmall = data?.iconSmall?.childImageSharp?.fixed;
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__PATH_PREFIX__'.
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;
  let header;

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        {icon && <Image fixed={icon} alt={title} className="site-logo" />}
        <Link to="/">{title}</Link>
      </h1>
    );
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {iconSmall && (
          <Image fixed={iconSmall} alt={title} className="site-logo" />
        )}
        {title}
      </Link>
    );
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <div className="global-header-wrapper">
        <header className="global-header">{header}</header>
        <DarkModeToggle />
      </div>
      <main>{children}</main>
      <footer>© {new Date().getFullYear()}, Dorian Karter</footer>
    </div>
  );
};

export default Layout;

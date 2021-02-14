import React from 'react';
import { WindowLocation } from '@reach/router';
import { Link } from 'gatsby';

type Props = {
  location: WindowLocation;
  title: string;
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ location, title, children }) => {
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__PATH_PREFIX__'.
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;
  let header;

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    );
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    );
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>© {new Date().getFullYear()}, Dorian Karter</footer>
    </div>
  );
};

export default Layout;

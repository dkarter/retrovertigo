import React from 'react';
// @ts-expect-error ts-migrate(2792) FIXME: Cannot find module 'gatsby'. Did you mean to set t... Remove this comment to see the full error message
import { Link } from 'gatsby';

const Layout = ({
  location,
  title,
  children
}: any) => {
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
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  );
};

export default Layout;

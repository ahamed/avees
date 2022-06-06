import { css } from '@emotion/react';
import React from 'react';

import Sidebar from '@Components/Layout/Sidebar';
import { Colors, shadow } from '@Config/config';

const styles = {
  layout: css`
    display: grid;
    grid-template-columns: 340px auto;
    grid-template-areas: 'sidebar main';
    background-color: ${Colors.background};
    position: relative;
  `,
  sidebar: css`
    grid-area: sidebar;
    height: 100vh;
    box-shadow: ${shadow.sidebar};
    background: #fff;
    z-index: 1;
    position: fixed;
    min-width: 340px;
  `,
  main: css`
    grid-area: main;
  `,
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div css={styles.layout}>
      <div css={styles.sidebar}>
        <Sidebar />
      </div>
      <main css={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;

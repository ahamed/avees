import { css } from '@emotion/react';
import { Button, Switch } from '@nextui-org/react';
import React from 'react';
import { ChevronDown, Document, PaperPlus, Setting, Swap } from 'react-iconly';
import { CgSun } from 'react-icons/cg';
import { MdOutlineDarkMode } from 'react-icons/md';
import { TbSunOff } from 'react-icons/tb';

import { Colors, shadow, spacing } from '@Config/config';
import { styleUtils } from '@Utils/styleUtils';

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
  sidebarItems: css`
    list-style: none;
    padding: 0;
    margin: 24px 0;
    display: flex;
    flex-direction: column;
    height: calc(100% - ${spacing[60]});
  `,
  sidebarItem: (isActive: boolean) => css`
    width: 100%;
    padding: 12px 24px;
    transition: 0.3s;
    width: 100%;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background: ${Colors.background};
      box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.01), inset 0 -2px 8px rgba(0, 0, 0, 0.01);
    }

    & > ul {
      margin-top: 12px;
    }

    & > ul li:hover {
      background-color: transparent;
      box-shadow: none;
      transform: translateX(10px);
    }

    ${isActive &&
    css`
      background: ${Colors.background};
      box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.01), inset 0 -2px 8px rgba(0, 0, 0, 0.01);
    `}
  `,
  itemButton: css`
    ${styleUtils.buttonReset};
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: 0.3s;
  `,
  arrowIcon: ({ isActive }: { isActive: boolean }) => css`
    transition: transform 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;

    ${isActive &&
    css`
      transform: rotate(180deg);
    `}
  `,
  logoWrapper: css`
    display: flex;
    width: 100%;
  `,
  brand: css`
    width: 100%;
    font-size: 24px;
    font-weight: bold;
    padding: 12px 24px;
    background: ${Colors.primary};
    color: #fff;
    letter-spacing: 3px;
    font-family: 'Montserrat', sans-serif;
    position: sticky;
    top: 10px;
    text-align: left;
  `,

  addNewButtonWrapper: css`
    margin: 24px 0 4px 0;
    width: 100%;
    display: flex;
    justify-content: center;

    button {
      font-family: 'Montserrat', sans-serif;
    }
  `,
};

interface LayoutProps {
  children: React.ReactNode;
}

enum IconSet {
  Bold = 'bold',
  Broken = 'broken',
  Bulk = 'bulk',
  Curved = 'curved',
  Light = 'light',
  TwoTone = 'two-tone',
}

const Layout = ({ children }: LayoutProps) => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isEnglish, setIsEnglish] = React.useState(false);
  const [isSettingsExpanded, setIsSettingsExpanded] = React.useState(false);

  return (
    <div css={styles.layout}>
      <div css={styles.sidebar}>
        <div css={styles.logoWrapper}>
          <h4 css={styles.brand}>Avees</h4>
        </div>
        <div css={styles.addNewButtonWrapper}>
          <Button color="gradient" icon={<PaperPlus set="bold" primaryColor="currentColor" />} auto shadow>
            Create document
          </Button>
        </div>
        <ul css={styles.sidebarItems}>
          <li css={styles.sidebarItem(true)}>
            <button type="button" css={styles.itemButton}>
              <Document set={IconSet.Light} primaryColor="blueviolet" /> Documents
            </button>
          </li>

          <li css={styles.sidebarItem(false)}>
            <button
              type="button"
              css={styles.itemButton}
              onClick={() => {
                setIsSettingsExpanded((prev) => !prev);
              }}
            >
              <Setting set={IconSet.Light} primaryColor="blueviolet" /> Settings
              <div css={styles.arrowIcon({ isActive: isSettingsExpanded })}>
                <ChevronDown primaryColor="currentColor" size="small" />
              </div>
            </button>

            {isSettingsExpanded && (
              <ul css={styles.sidebarItems}>
                <li css={styles.sidebarItem(false)}>
                  <button type="button" css={styles.itemButton}>
                    <Swap set={IconSet.Light} primaryColor="blueviolet" /> Switch to English
                    <Switch
                      color="secondary"
                      size="sm"
                      checked={isEnglish}
                      onChange={() => setIsEnglish((prev) => !prev)}
                    />
                  </button>
                </li>
                <li css={styles.sidebarItem(false)}>
                  <button type="button" css={styles.itemButton}>
                    <MdOutlineDarkMode color="blueviolet" size="1.3em" /> Dark mode
                    <Switch
                      size="sm"
                      color="secondary"
                      checked={isDarkMode}
                      iconOn={<TbSunOff color="blueviolet" />}
                      iconOff={<CgSun color="blueviolet" />}
                      onChange={() => setIsDarkMode((prev) => !prev)}
                    />
                  </button>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
      <main css={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;

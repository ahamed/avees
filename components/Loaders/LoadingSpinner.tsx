import { css } from '@emotion/react';
import React from 'react';

import { Colors } from '@Config/config';

const styles = {
  wrapper: css`
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${Colors.white};
    z-index: 9999;
  `,
  title: css`
    font-size: 1.5rem;
    color: ${Colors.white};
  `,
  subtitle: css`
    font-size: 0.8rem;
    color: ${Colors.white};
  `,
};

interface LoadingSpinnerProps {
  title?: string;
  subtitle?: string;
}

const LoadingSpinner = ({ title = 'Loading...', subtitle }: LoadingSpinnerProps) => {
  return (
    <div css={styles.wrapper}>
      <h4 css={styles.title}>{title}</h4>
      {subtitle && <p css={styles.subtitle}>{subtitle}</p>}
    </div>
  );
};

export default LoadingSpinner;

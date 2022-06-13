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
    background-color: ${Colors.coalBlack};
    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 9999;
  `,
  title: css`
    font-size: 1.5rem;
    color: ${Colors.white};
    font-weight: 300;
    letter-spacing: 1.5px;
    transform-origin: center;
  `,
  subtitle: css`
    font-size: 0.8rem;
    color: ${Colors.white};
  `,
  loader: css`
    max-width: 600px;
    max-height: 300px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    backdrop-filter: blur(20px);
  `,
};

interface LoadingSpinnerProps {
  title?: string;
  subtitle?: string;
}

const LoadingSpinner = ({ title = 'Loading...', subtitle }: LoadingSpinnerProps) => {
  return (
    <div css={styles.wrapper}>
      <div css={styles.loader}>
        <h4 css={styles.title}>{title}</h4>
        {subtitle && <p css={styles.subtitle}>{subtitle}</p>}
      </div>
    </div>
  );
};

export default LoadingSpinner;

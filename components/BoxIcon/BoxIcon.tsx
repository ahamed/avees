import React from 'react';

interface BoxIconProps {
  tag: string;
  [key: string]: unknown;
}

const BoxIcon = ({ tag, ...props }: BoxIconProps) => {
  const IconComponent = tag;
  return <IconComponent {...props} />;
};

export default BoxIcon;

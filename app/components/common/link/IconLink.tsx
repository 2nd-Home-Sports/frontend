import React from 'react';

interface IIconLink {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const IconLink: React.FC<IIconLink> = ({ href, children, className }) => {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
};

export default IconLink;

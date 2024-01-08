import React from 'react';
import clsx from 'clsx';

interface ITextLink {
  href: string;
  text: string;
  className?: string;
}

const TextLink: React.FC<ITextLink> = ({ href, text, className }) => {
  return (
    <a
      href={href}
      className={clsx(className, 'text-[28px] leading-[24px] font-normal')}
    >
      {text}
    </a>
  );
};

export default TextLink;

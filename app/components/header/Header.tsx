'use client';
import React from 'react';
import { IconLink, TextLink } from '@/app/components';
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import { ImFacebook } from 'react-icons/im';
import { useFilterModal } from '@/app/hooks';

const Header: React.FC = () => {
  const filterModal = useFilterModal();
  return (
    <>
      {filterModal.step > 1 && (
        <div className='flex justify-center shadow h-[105px]'>
          <div className='flex justify-between w-full max-w-[1728px] px-9 h-full items-center'>
            <div className='flex'>
              <IconLink href='/instagram.com' className='text-[35px] mr-2'>
                <FaInstagram />
              </IconLink>
              <IconLink href='/facebook.com' className='text-[35px] mr-2'>
                <ImFacebook />
              </IconLink>
              <IconLink href='/instagram' className='text-[35px]'>
                <FaTiktok />
              </IconLink>
            </div>
            <a href='/'>
              <img src='/images/logo.png' width={159} height={96} />
            </a>
            <div>
              <TextLink href='/blog' text='Blog' />
              <TextLink href='/about' text='About' className='ml-9' />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

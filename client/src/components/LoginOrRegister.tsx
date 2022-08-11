import clsx from 'clsx';
import React from 'react';

import UnderlineLink from '@/components/links/UnderlineLink';

import {
  themeBg,
  ThemeContext,
  themeText,
} from '../context/Theme';

export const LoginOrRegister = () => {

  const themeContext = React.useContext(ThemeContext);

  return (
        <section className={themeBg(themeContext.theme)}>
          <div className='layout flex flex-col items-center justify-center text-center space-y-4'>
            <h3 className={clsx('mt-4', themeText(themeContext.theme))}>
              You are not logged in, please  
              {' '}
              <UnderlineLink
                href='/login'>
                login
            </UnderlineLink>
            {' or '}
            <UnderlineLink
                href='/register'>
                register
            </UnderlineLink>
              {' '}
             to use Idea Bucket
            </h3>
          </div>
        </section>
  );
};

export default LoginOrRegister

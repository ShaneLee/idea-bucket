import clsx from 'clsx';
import React from 'react';

import Toggle from '@/components/buttons/Toggle';
import PrimaryLink from '@/components/links/PrimaryLink';
import LoginMenu from '@/components/LoginMenu';

import { themeBg, ThemeContext, themeText, toggleTheme } from '@/context/Theme';

type Props = {
  appName: string;
} & React.ComponentProps<'input'>;

export const Nav = (props: Props) => {
  const themeContext = React.useContext(ThemeContext);

  return (
    <nav
      className={clsx(
        'flex flex-wrap items-center p-3',
        themeBg(themeContext.theme)
      )}
    >
      <PrimaryLink className='mr-4 inline-flex items-center p-2 ' href='/'>
        <span
          className={clsx(
            'text-xlfont-bold uppercase tracking-wide',
            themeText(themeContext.theme)
          )}
        >
          {props.appName}
        </span>
      </PrimaryLink>

      <div className='ml-auto inline-flex items-center p-2'>
        <LoginMenu />
      </div>

      <div className='ml-auto inline-flex items-center p-2'>
        <Toggle
          onClick={() => toggleTheme(themeContext.theme, themeContext.setTheme)}
          theme={themeContext.theme}
        />
      </div>
    </nav>
  );
};

export default Nav;

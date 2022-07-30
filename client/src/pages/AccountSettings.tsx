import clsx from 'clsx';
import * as React from 'react';

import AccountSettingsForm from '@/components/AccountSettingsForm';
import Layout from '@/components/layout/Layout';

import { themeBg, ThemeContext, themeText } from '@/context/Theme';

export default function AccountSettingsPage() {
  const themeContext = React.useContext(ThemeContext);

  return (
    <Layout>
      <main>
        <section className={themeBg(themeContext.theme)}>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center space-y-4'>
            <h1 className={clsx('mt-4', themeText(themeContext.theme))}>
              Account Settings
            </h1>
            
            <AccountSettingsForm />

            <footer
              className={clsx(
                'absolute bottom-2',
                themeContext.theme === 'dark' ? 'text-white' : 'text-gray-700'
              )}
            ></footer>
          </div>
        </section>
      </main>
    </Layout>
  );
}

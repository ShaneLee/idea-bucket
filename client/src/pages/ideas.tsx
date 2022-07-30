import clsx from 'clsx';
import * as React from 'react';

import IdeasTable from '@/components/IdeasTable';
import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';

import {
  themeBg,
  ThemeContext,
  ThemeProvider,
  themeText,
} from '../context/Theme';

export default function ComponentsPage() {
  const themeContext = React.useContext(ThemeContext);


  return (
    <ThemeProvider>
      <Layout>
        <main>
          <section className={themeBg(themeContext.theme)}>
            <div
              className={clsx(
                'layout min-h-screen py-20',
                themeText(themeContext.theme)
              )}
            >
              <h1>Ideas</h1>
              <ArrowLink direction='left' className='mt-2' href='/'>
                Back to Home
              </ArrowLink>

              <div className='mt-8 flex flex-wrap gap-2'>
              </div>
              
              <IdeasTable />
    
            </div>
          </section>
        </main>
      </Layout>
    </ThemeProvider>
  );
}

import clsx from 'clsx';
import * as React from 'react';

import AddIdea from '@/components/AddIdea';
import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';

import { themeBg, ThemeContext, themeText } from '@/context/Theme';

export default function HomePage() {
  const themeContext = React.useContext(ThemeContext);

  return (
    <Layout>
      <main>
        <section className={themeBg(themeContext.theme)}>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center space-y-4'>
            <h1 className={clsx('mt-4', themeText(themeContext.theme))}>
              Idea Bucket
            </h1>
            <p
              className={clsx(
                'mt-2 text-sm',
                themeContext.theme === 'dark' ? 'text-white' : 'text-gray-800'
              )}
            >
              Store your ideas
            </p>

            <ButtonLink
              className='mt-6'
              href='/ideas'
              variant={themeContext.theme === 'dark' ? 'light' : 'dark'}
            >
              Ideas
            </ButtonLink>

            <AddIdea />

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

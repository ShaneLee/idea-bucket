import clsx from 'clsx';
import * as React from 'react';
import { RiQuestionFill } from 'react-icons/ri';

import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import Seo from '@/components/Seo';

import ThemeContext, { themeBg, themeText } from '../context/Theme';

export default function NotFoundPage() {
  const context = React.useContext(ThemeContext);

  return (
    <Layout>
      <Seo templateTitle='Not Found' />

      <main>
        <section className={clsx(themeBg(context.theme), themeText(context.theme))}>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center'>
            <RiQuestionFill
              size={60}
              className='drop-shadow-glow animate-flicker text-primary-500'
            />
            <h1 className='mt-8 text-4xl md:text-6xl'>Page Not Found</h1>
            <ArrowLink className='mt-4 md:text-lg' href='/'>
              Back to Home
            </ArrowLink>
          </div>
        </section>
      </main>
    </Layout>
  );
}

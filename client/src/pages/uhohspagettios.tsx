import clsx from 'clsx';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';

import {
  themeBg,
  ThemeContext,
  ThemeProvider,
  themeText,
} from '../context/Theme';

const exclaimations = [
  'Sacrebleu!',
  'Uh Oh! Spagettios!',
  'Balls to the wall!',
]

const getExclaimation = () => exclaimations[Math.floor((Math.random()*exclaimations.length))]

export default function ErrorPage() {
  const themeContext = React.useContext(ThemeContext);

  const [exclaimation, setExclaimation] = React.useState('')

  React.useEffect(() => setExclaimation(getExclaimation()), [])

  return (
    <ThemeProvider>
      <Layout>
        <main>
          <section className={clsx(themeBg(themeContext.theme))}>
            <div
              className={clsx(
                'layout min-h-screen py-20 space-y-6',
                themeText(themeContext.theme)
              )}
            >
              <h1>{exclaimation} {' '} Something has gone terribly wrong!</h1>
              
              <p>Something went wrong on the server side.</p>
              <ArrowLink direction='left' className='mt-2' href='/'>
                Back to Home
              </ArrowLink>

            </div>
          </section>
        </main>
      </Layout>
    </ThemeProvider>
  );
}

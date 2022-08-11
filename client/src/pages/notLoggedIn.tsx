import clsx from 'clsx'
import React from 'react'

import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink'

import {
  themeBg,
  ThemeContext,
  themeText
} from '../context/Theme'

export default function LoggedOutPage() {
  const themeContext = React.useContext(ThemeContext)

  return (
    <Layout>
      <main>
        <section className={themeBg(themeContext.theme)}>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center space-y-4'>
            <h1 className={clsx('mt-4', themeText(themeContext.theme))}>
              Your are not logged in, please log in or register to continue
            </h1>
            <ButtonLink
                href='/login'
                variant={themeContext.theme === 'dark' ? 'light' : 'dark'}
                type='submit'>
                Click to Login
            </ButtonLink>
            <ButtonLink
                href='/register'
                variant={themeContext.theme === 'dark' ? 'light' : 'dark'}
                type='submit'>
                Click to Register
            </ButtonLink>
          </div>
        </section>
      </main>
    </Layout>
  )
}

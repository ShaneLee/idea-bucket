import clsx from 'clsx'
import { useContext } from 'react'

import Layout from '@/components/layout/Layout'
import ArrowLink from '@/components/links/ArrowLink'
import SupportRequest from '@/components/SupportRequest'

import { AuthContext } from '@/context/AuthContext'
import {
  themeBg,
  ThemeContext,
  themeText
} from '@/context/Theme'

export default function SupportPage() {
  const authContext = useContext(AuthContext)
  const themeContext = useContext(ThemeContext)
  return (
    <Layout>
      <main>
        <section className={clsx(themeBg(themeContext.theme), themeText(themeContext.theme))}>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center space-y-4'>
              <h1 className={clsx('mt-4')}>
                Support
              </h1>
          {authContext.authState.role === 'ROLE_BUCKET_SUBSCRIBED'
            ? <div className='space-y-4'>
                <h4>Complete the form to submit a support request</h4>
                <SupportRequest />
              </div>
            : <div>
                <h4>Support requests are only availiable to subscribed users</h4>
                <ArrowLink direction='left' className='mt-2' href='/'>
                  Back to Home
                </ArrowLink>
              </div>
          }
            </div>
        </section>
      </main>
    </Layout>
  )
}

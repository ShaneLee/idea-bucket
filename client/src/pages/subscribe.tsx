import clsx from 'clsx'
import { useContext } from 'react'

import Layout from '@/components/layout/Layout'
import Subscribe from '@/components/Subscribe'
import SubscriptionsTable from '@/components/SubscriptionsTable'

import {
  themeBg,
  ThemeContext,
  themeText
} from '@/context/Theme'

export default function SubscribePage() {
  const themeContext = useContext(ThemeContext)

  return (
    <Layout>
      <main>
        <section className={clsx(themeBg(themeContext.theme), themeText(themeContext.theme))}>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center space-y-4'>
            <h1 className={clsx('mt-4')}>
              Subscribe to Idea Bucket
            </h1>
            <h4>
              Why subscribe to Idea Bucket?
            </h4>
            <SubscriptionsTable />
            <Subscribe amount={1} />
          </div>
        </section>
      </main>
    </Layout>
  )
}

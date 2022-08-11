import clsx from 'clsx'
import { useContext } from 'react'

import Layout from '@/components/layout/Layout';

import {
  themeBg,
  ThemeContext,
  themeText
} from '../context/Theme'

export default function AboutPage() {
  const themeContext = useContext(ThemeContext)
  return (
    <Layout>
      <main>
        <section className={clsx(themeBg(themeContext.theme), themeText(themeContext.theme))}>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center space-y-4'>
            <h1 className={clsx('mt-4')}>
              About Idea Bucket
            </h1>
            <h4>
              Idea bucket is a micro-app. It&apos;s sole purpose is as a place to store ideas. 
            </h4>
            <p>
              Storing ideas can be a bit of a pain. Sometimes you e-mail yourself ideas, sometimes you write them down in a notebook, and sometimes you put ideas in a TODO app. All of these approaches to storing ideas are <em>okay</em> but they all feel imperfect. Storing ideas in a notebook, whether physical or digital, can work but those ideas are difficult to review and typically the end up all over the place. Ideas that are e-mailed to ourselves mainly serve to clutter our inboxes, and are typically archived and forgotten about. And it&apos;s the same story with ideas in TODO apps.
            </p>
            <p>
             This is where idea bucket comes in. It offers a single place to store your ideas and it will e-mail you regularly with a list of the ideas you entered since the last e-mail. This then enables you to review your ideas and decide to do something about them.
            </p>
          </div>
        </section>
      </main>
    </Layout>
  )
}

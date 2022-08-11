import clsx from 'clsx'
import { Form,Formik } from 'formik'
import React, { useState } from 'react'

import Button from '@/components/buttons/Button'
import Layout from '@/components/layout/Layout';

import FetchClient from '@/api/FetchClient'

import {
  themeBg,
  ThemeContext,
  themeText
} from '../context/Theme'

interface Login {
  email: string
  feedback?: string
}

interface FormErrors {
  emailError: boolean
  error?: string,
}

const displayError = (state: Login & FormErrors) =>
    state.error ? <div className='text-rose-500'>{state.error}</div> : <div></div>

const displayFeedback = (state: Login & FormErrors, theme: string) =>
    state.feedback
       ? <h5 className='text-green-500'>{state.feedback}</h5>
       : <h5 className={themeText(theme)}>Enter your E-mail to get a login link</h5>

const parseError = (err: any | undefined): string => {
  if (!err?.response?.data) return 'Login failed'

  return `Login failed: ${err.response.data}`

}

export default function LoginPage() { const themeContext = React.useContext(ThemeContext)

  const [state, setState] = useState({
    email: ''
  } as Login & FormErrors)

  const handleChange = ({ target }: any) => {
    setState({ email: target.value, error: undefined, emailError: false})
  }

  const handleValidation = (): boolean => {
    const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!emailTest.test(state.email)) {
        setState({ ...state, error: `Input should be a valid e-mail address`, emailError: true})
        return false
    }
    setState({ ...state, error: undefined })
    return true
  }

  const onSubmit = (submission: Login) => {
     if (handleValidation()) {
       FetchClient.post(`${process.env.NEXT_PUBLIC_MODE}/rest/v1/login/`, submission)
        .then(_ => setState({...state, feedback: 'Great Success! Check your e-mail for the login link!'}))
        // TODO add a prompt to register if we get a 401 and the user isn't found
        .catch(err => setState({...state, feedback: undefined, error: parseError(err), emailError: false}))
     }
  }

  return (
    <Layout>
      <main>
        <section className={themeBg(themeContext.theme)}>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center space-y-4'>
            <h1 className={clsx('mt-4', themeText(themeContext.theme))}>
              Login to Idea Bucket
            </h1>
            <Formik initialValues={state}
              onSubmit={() => onSubmit(state)}>
                {() => (
                  <Form>
                    <div className='space-y-6'>
                      {displayFeedback(state, themeContext.theme)}
                      {displayError(state)}
                      <div className='space-y-6'>
                        <input type='text' 
                            name='email'
                            className={
                              clsx(`rounded ${state.error ? 'border-2 border-rose-500 focus:border-rose-500 animate-shake' : ''}`,
                              themeBg(themeContext.theme),
                              themeText(themeContext.theme))}
                            onChange={handleChange}
                            placeholder='Enter your e-mail'
                            aria-label='User e-mail'
                            aria-describedby='basic-addon2' />
                        <div className=''>
                          <Button
                              disabled={state.emailError} className='btn'
                              variant={themeContext.theme === 'dark' ? 'light' : 'dark'}
                              type='submit'>
                              Get Login Link
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
            </Formik>
          </div>
        </section>
      </main>
    </Layout>
  )
}

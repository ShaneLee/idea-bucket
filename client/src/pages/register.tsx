import clsx from 'clsx'
import { Form,Formik } from 'formik'
import * as React from 'react'

import Button from '@/components/buttons/Button'
import Layout from '@/components/layout/Layout'

import FetchClient from '@/api/FetchClient'

import {
  themeBg,
  ThemeContext,
  themeText,
} from '../context/Theme'

interface Register {
  name: string
  email: string
}

interface FormErrors {
  nameError?: string,
  emailError?: string,
  feedback?: string,
}

const displayError = (state: Register & FormErrors) =>
    state.emailError || state.nameError ? <div className='text-rose-500'>
      {state.nameError ?? state.emailError}</div>
      : <div></div>

const displayFeedback = (state: Register & FormErrors, theme: string) =>
    state.feedback
       ? <h5 className='text-green-500'>{state.feedback}</h5>
       : <h5 className={themeText(theme)}>Enter your name and e-mail to register for Idea Bucket</h5>


export default function RegisterPage() {
  const themeContext = React.useContext(ThemeContext)
  const [state, setState] = React.useState({
    name: '',
    email: '',
  } as Register & FormErrors)

   const handleChange = ({ target }: any) => {
     const { name, value } = target
     const isEmail = name === 'email'
     if (isEmail) {
         setState({ ...state, email: value, emailError: undefined })
         return 
     }
     setState({ ...state, name: value })
   }

   const handleValidation = () => {
     const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
     if (!emailTest.test(state.email)) {
         setState({ ...state, emailError: `Input should be a valid e-mail address` })
         return false
     }
     if (!state.name) {
         setState({ ...state, nameError: `Name must be provided and non-blank` })
         return false
     }
     setState({ ...state, emailError: undefined, nameError: undefined })
     return true
   }

   const onSubmit = (submission: Register) =>  {
     if (handleValidation()) {
      FetchClient.post(`${process.env.NEXT_PUBLIC_MODE}/rest/v1/register`, submission)
       .then(_ => setState({...state,
             nameError: undefined,
             emailError: undefined,
             feedback: 'Successfully registered, check your e-mail for the login link!'}))
       .catch(err => setState({...state, feedback: undefined, emailError: `Failed to register: ${err.response?.data ?? ''}`}))
     }
   }

  return (
    <Layout>
      <main>
        <section className={themeBg(themeContext.theme)}>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center space-y-4'>
          <h1 className={clsx('mt-4', themeText(themeContext.theme))}>
            Register for Idea Bucket
          </h1>
          <Formik initialValues={state}
            onSubmit={() => onSubmit(state)}>
              {() => (
                <Form>
                  <div className='space-y-6'>
                    
                    {displayFeedback(state, themeContext.theme)}
                    {displayError(state)}
                    <div>
                      <input type='text' 
                          name='name'
                          className={
                              clsx(`${state.nameError
                              ? 'border-2 border-rose-500 focus:border-rose-500 animate-shake'
                              : ''}`,
                              themeText(themeContext.theme),
                              themeBg(themeContext.theme),
                              )}
                          onChange={handleChange}
                          placeholder='Enter your name'
                          aria-label='User name'
                          aria-describedby='basic-addon2' />
                    </div>
                    <div className='space-y-4'>
                      <input type='text' 
                          name='email'
                          className={
                              clsx(`${state.emailError
                              ? 'border-2 border-rose-500 focus:border-rose-500 animate-shake'
                              : ''}`,
                              themeText(themeContext.theme),
                              themeBg(themeContext.theme),
                              )}
                          onChange={handleChange}
                          placeholder='Enter your e-mail'
                          aria-label='User e-mail'
                          aria-describedby='basic-addon2' />
                      <div className=''>
                        <Button
                          disabled={!!state.emailError}
                          className='btn'
                          variant={themeContext.theme === 'dark' ? 'light' : 'dark'}
                          type='submit'>
                          Register
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

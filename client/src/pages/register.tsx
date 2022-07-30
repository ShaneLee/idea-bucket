import clsx from 'clsx'
import { Form,Formik } from 'formik'
import * as React from 'react'

import Button from '@/components/buttons/Button'
import Layout from '@/components/layout/Layout'

import FetchClient from '@/api/FetchClient'

import {
  themeBg,
  ThemeContext,
  ThemeProvider,
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
    state.emailError || state.nameError ? <div className='invalid'>{state.nameError ?? state.emailError}</div> : <div></div>

const displayFeedback = (state: Register & FormErrors) =>
    state.feedback
       ? <h5 className='success-feedback'>{state.feedback}</h5>
       : <h5>Enter your name and e-mail to register for Idea Bucket</h5>


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
     setState({ ...state, emailError: undefined, nameError: undefined })
     return true
   }

   const onSubmit = (submission: Register) =>  {
     if (handleValidation()) {
      FetchClient.post(`${process.env.NEXT_PUBLIC_MODE}/rest/v1/register`, submission)
       .then(_ => setState({...state, feedback: 'Successfully registered, check your e-mail for the login link!'}))
       .catch(err => setState({...state, nameError: `Failed to register ${err.response?.data ?? ''}`}))
     }
   }

  return (
    <ThemeProvider>
      <Layout>
        <main>
          <section className={themeBg(themeContext.theme)}>
            <Formik initialValues={state}
              onSubmit={() => onSubmit(state)}>
                {() => (
                  <Form>
                    <div className='register-form'>
                      
                      {displayFeedback(state)}
                      {displayError(state)}
                      <div>
                        <input type='text' 
                            name='name'
                            className={
                                clsx(`form-control ${state.emailError ? 'is-invalid' : ''}`,
                                themeText(themeContext.theme),
                                themeBg(themeContext.theme),
                                )}
                            onChange={handleChange}
                            placeholder='Enter your name'
                            aria-label='User name'
                            aria-describedby='basic-addon2' />
                      </div>
                      <div>
                        <input type='text' 
                            name='email'
                            className={
                                clsx(`form-control ${state.emailError ? 'is-invalid' : ''}`,
                                themeText(themeContext.theme),
                                themeBg(themeContext.theme),
                                )}
                            onChange={handleChange}
                            placeholder='Enter your e-mail'
                            aria-label='User e-mail'
                            aria-describedby='basic-addon2' />
                        <div className='input-group-append'>
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
          </section>
        </main>
      </Layout>
    </ThemeProvider>
  )
}

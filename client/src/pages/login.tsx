import { Form,Formik } from 'formik'
import React, { useState } from 'react'

import Button from '@/components/buttons/Button'

import FetchClient from '@/api/FetchClient'

import {
  ThemeContext,
} from '../context/Theme'

interface Login {
  email: string
}

interface FormErrors {
  emailError?: string,
}

const displayError = (state: Login & FormErrors) =>
    state.emailError ? <div className='invalid'>{state.emailError}</div> : <div></div>

export default function LoginPage() {
  const themeContext = React.useContext(ThemeContext)

  const [state, setState] = useState({
    email: ''
  } as Login & FormErrors)

  const handleChange = ({ target }: any) => {
    setState({ email: target.value, emailError: undefined })
  }

  const handleValidation = (): boolean => {
    const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!emailTest.test(state.email)) {
        setState({ ...state, emailError: `Input should be a valid e-mail address` })
        return false
    }
    setState({ ...state, emailError: undefined })
    return true
  }

  const onSubmit = (submission: Login) => {
     if (handleValidation()) {
       FetchClient.post(`${process.env.NEXT_PUBLIC_MODE}/rest/v1/login/`, submission)
     }
  }

  return (
    <Formik initialValues={state}
      onSubmit={() => onSubmit(state)}>
        {() => (
          <Form>
            <div className='login-form'>
              <h5>Enter your E-mail to get a login link</h5>
              {displayError(state)}
              <div className='input-group mb-3'>
                <input type='text' 
                    name='email'
                    className={`form-control ${state.emailError ? 'is-invalid' : ''}`}
                    onChange={handleChange}
                    placeholder='Enter your e-mail'
                    aria-label='User e-mail'
                    aria-describedby='basic-addon2' />
                <div className='input-group-append'>
                  <Button
                      disabled={!!state.emailError} className='btn'
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
  )
}

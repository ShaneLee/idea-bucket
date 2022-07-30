import clsx from 'clsx'
import { Form,Formik } from 'formik'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import Button from '@/components/buttons/Button'

import { AuthContext } from '@/context/AuthContext'
import {
 themeBg,
 themeButton,
 ThemeContext,
 themeText } from '@/context/Theme';

import FetchClient from '../api/FetchClient'

interface State {
  loginError?: string
}

export default function LoginTokenPage() {
  const authState = React.useContext(AuthContext)
  const themeContext = React.useContext(ThemeContext)

  const displayLoginError = (state: State) =>
      state.loginError
         ? <h1 className='failed-feedback'>{state.loginError}</h1>
         : <h1 className={clsx(themeText(themeContext.theme))}>Hi, Welcome Back</h1>

  const onSubmit = () => FetchClient.get(`${process.env.NEXT_PUBLIC_MODE}/rest/v1/login/${router.query.token}`)
    .then(_ => {
        const token = router.query.token
        if (!!token && typeof token === 'string') {
          localStorage.setItem('token', token) 
          authState.setAuthState({...authState.authState, loggedIn: true})
          onRedirect('/')
        }
      })
    .catch(err => setState({...state, loginError: `Failed to login ${err.response?.data}`}))

  const router = useRouter()

  React.useEffect(() => {
    if (router.isReady) {
      const token = router.query.token
      if (typeof token === 'string') {
				onSubmit()
      }
    }
  }, [router.isReady, router.query])

  const onRedirect = (url: string) => {
      router.push(url)
  }

  const [state, setState] = useState({
    token: authState.authState.token,
   } as State)


  return (
    <Formik initialValues={{}}
      onSubmit={() => onSubmit()}>
        {() => (
          <Form>
            <div className={clsx('flex flex-col h-screen my-auto items-center space-y-6', themeBg(themeContext.theme))}>
              {displayLoginError(state)}
              <div className=''>
              <p className={themeText(themeContext.theme)}>You are being redirected</p>
                <div className=''>
                  <Button
                    className=''
                    variant={themeButton(themeContext.theme)}
                    type='submit'>
                  Login
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
    </Formik>
  )
}

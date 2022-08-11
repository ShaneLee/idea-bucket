import clsx from 'clsx'
import { Form,Formik } from 'formik'
import React from 'react'

import Button from '@/components/buttons/Button'

import FetchClient from '@/api/FetchClient'

export interface Idea {
  id: string,
  idea: string,
  category: string
  timeSubmitted: string
}

interface Props {
  // May want to change this in the future
  amount: number
}

import { AuthContext, tokenToAuthState } from '@/context/AuthContext'
import {
  ThemeContext,
  themeText,
} from '@/context/Theme'


export default function Subscribe(props: Props) {

  const themeContext = React.useContext(ThemeContext)
  const authContext = React.useContext(AuthContext)

  // The stripe token - TODO - the stripe flow
  const [token, setToken] = React.useState('')
  const [subscribeError, setSubscribeError] = React.useState('')

  const onSubmit = () => {
     setToken('')
     FetchClient.post(`${process.env.NEXT_PUBLIC_MODE}/rest/v1/subscribe`, { token: token })
      .then(res => res?.json())
      .then(res => tokenToAuthState(res, authContext.authState, authContext.setAuthState))
      .catch(err => setSubscribeError(err.message))
  }

  return (
    <div className={clsx(themeText(themeContext.theme), 'space-y-4')}>
      <h1 className='h3 mb-3 font-weight-normal'>Confirm Subscription of £{props.amount} per month</h1>
      { subscribeError && <div className='text-rose-500'>{subscribeError}</div>}
    <Formik initialValues={{token: ''}}
      onSubmit={() => onSubmit()}>
        {() => (
          <Form id='subscribe-form'
              className='space-y-4'
              >
            <Button
              id='confirm-subscription-btn'
              type='submit'
              variant={themeContext.theme === 'dark' ? 'light' : 'dark'}
            >
             Confirm 
              </Button>
          </Form>
        )}
    </Formik>
    </div>
  )
}

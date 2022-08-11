import clsx from 'clsx'
import { Form,Formik } from 'formik'
import React from 'react'

import Button from '@/components/buttons/Button'

import FetchClient from '@/api/FetchClient'

export interface Request {
  subject: string,
  body: string
}

import {
  themeBg,
  ThemeContext,
  themeText,
} from '../context/Theme'

export default function SupportRequest() {

  const themeContext = React.useContext(ThemeContext)

  const [subject, setsubject] = React.useState('')
  const [body, setbody] = React.useState('')
  const [subjectError, setsubjectError] = React.useState('')
  const [bodyError, setbodyError] = React.useState('')

  const onSubmit = (subject: string) => {
    if (!processsubject(subject) || !processbody(body)) return Promise.resolve()
     FetchClient.post(`${process.env.NEXT_PUBLIC_MODE}/rest/v1/supportRequest`, { subject: subject, body: body })
      .then(_ => { setsubject(''), setbody('') })
  }

  const processsubject = (subject: string) => {
    setsubject(subject)
    if (!subject) {
      setsubjectError(`Subject can't be empty`)
      return false
    }
    
    setsubjectError('')
    return true
  }

  const processbody = (body: string) => {
    setbody(body)
    if (!body) {
      setbodyError(`Body can't be empty`)
      return false
    }
    
    setbodyError('')
    return true
  }

  return (
    <div className={clsx(themeText(themeContext.theme), 'space-y-4')}>
      { subjectError && <div className='text-rose-500'>{subjectError}</div>}
      { bodyError && <div className='text-rose-500'>{bodyError}</div>}
    <Formik initialValues={{subject: '', body: ''}}
      onSubmit={() => onSubmit(subject)}>
        {() => (
          <Form
              id='new_subject'
              className='space-y-4'
              >
            <div>
              <input
              type='text'
              onChange={(e => processsubject(e.target.value))}
              value={subject}
              className={clsx(
                'rounded w-96',
                themeText(themeContext.theme),
                themeBg(themeContext.theme),
                subjectError ? 'border-2 border-rose-500 focus:border-rose-500 animate-shake' : ''
              )}
              name='subject' 
              placeholder='Subject'
              id='subject'
              />
            </div>
            <div>
              <textarea
                name='body'
                placeholder='Body'
                rows={8}
                className={clsx(
                  'rounded w-96',
                  themeText(themeContext.theme),
                  themeBg(themeContext.theme),
                  bodyError ? 'border-2 border-rose-500 focus:border-rose-500 animate-shake' : ''
                )}
                value={body}
                onChange={(e => processbody(e.target.value))}
             />
            </div>
            <Button
              disabled={!!subjectError || !!bodyError}
              id='new_subject_btn'
              type='submit'
              variant={themeContext.theme === 'dark' ? 'light' : 'dark'}
            >
              Submit request
              </Button>
          </Form>
        )}
    </Formik>
    </div>
  )
}

import clsx from 'clsx';
import { Form,Formik } from 'formik'
import * as React from 'react';

import Button from '@/components/buttons/Button';

import FetchClient from '@/api/FetchClient'
import { AuthContext } from '@/context/AuthContext';
import { themeBg, ThemeContext, themeText } from '@/context/Theme';

type AccountSettings = {
  userId: string
  emailsEnabled: boolean
}

export default function AccountSettingsPage() {
  const themeContext = React.useContext(ThemeContext);
  const authContext = React.useContext(AuthContext);

  const [ accountSettings, setAccountSettings] = React.useState<AccountSettings>(
   { 
     userId: 'me@shanel.ee',
     emailsEnabled: false
   })

  const onSubmit = () => FetchClient.put(`/${process.env.NEXT_PUBLIC_MODE}/rest/v1/accountSettings`, accountSettings)

  React.useEffect(() => {
      FetchClient.get(`/${process.env.NEXT_PUBLIC_MODE}/rest/v1/accountSettings`)
        .then((res) => res.json())
        .then(setAccountSettings)
  }, [])

  return (
    <Formik initialValues={{}}
      onSubmit={() => onSubmit()}>
        {() => (
          <Form
              id='account-settings'
              className='space-y-4'
              >
            { authContext.authState.subscribed ?
              <div className='space-x-2'>
                <label
                  htmlFor='emails-enabled'
                  className={clsx('rounded', themeText(themeContext.theme), themeBg(themeContext.theme))}
                >
                E-mails enabled
                </label>
                <input
                type='checkbox'
                onChange={(e => setAccountSettings({...accountSettings, 'emailsEnabled': e.target.checked}))}
                checked={accountSettings.emailsEnabled}
                className={clsx('rounded', themeBg(themeContext.theme))}
                name='emails-enabled' 
                id='emails-enabled-checkbox'
                />
              </div>
              : <div></div>
            }
            <Button
              id='save-account-settings'
              type='submit'
              variant={themeContext.theme === 'dark' ? 'light' : 'dark'}
            >
              Save
              </Button>
          </Form>
          )}
        </Formik>
  )
}

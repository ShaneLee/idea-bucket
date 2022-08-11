import clsx from 'clsx';
import { Form,Formik } from 'formik'
import * as React from 'react';

import Button from '@/components/buttons/Button';
import GenericMenu from '@/components/GenericMenu'

import FetchClient from '@/api/FetchClient'
import { AuthContext } from '@/context/AuthContext';
import { themeBg, ThemeContext, themeText } from '@/context/Theme';

type AccountSettings = {
  userId: string
  emailsEnabled: boolean
  emailFrequency: string
}

export default function AccountSettingsPage() {
  const themeContext = React.useContext(ThemeContext);
  const authContext = React.useContext(AuthContext);

  const [ accountSettings, setAccountSettings] = React.useState<AccountSettings>(
   { 
     userId: '',
     emailsEnabled: false,
     emailFrequency: ''
   })

  const onSubmit = () => FetchClient.put(`/${process.env.NEXT_PUBLIC_MODE}/rest/v1/accountSettings`, accountSettings)

  React.useEffect(() => {
      FetchClient.get(`/${process.env.NEXT_PUBLIC_MODE}/rest/v1/accountSettings`)
        .then((res) => res?.json())
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
            { authContext.authState.role === 'ROLE_BUCKET_SUBSCRIBED' &&
              <div className='space-x-2'>
                <label
                  htmlFor='emails-frequency'
                  className={clsx('rounded', themeText(themeContext.theme), themeBg(themeContext.theme))}
                >
                E-mails frequency
                </label>
                <GenericMenu 
                  items={['Weekly', 'Monthly']}
                  selected='Weekly'
                  setSelected={selected => setAccountSettings({...accountSettings, 'emailFrequency': selected})}
                />
              </div>
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

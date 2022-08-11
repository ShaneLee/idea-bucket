import clsx from 'clsx';
import { Form,Formik } from 'formik'
import React from 'react';

import UnstyledLink from '@/components/links/UnstyledLink'

import FetchClient from '@/api/FetchClient'
import { AuthContext } from '@/context/AuthContext';
import { themeBg, ThemeContext, themeHover, themeText } from '@/context/Theme';

export const UserMenu = () => {
  const themeContext = React.useContext(ThemeContext);
  const authContext = React.useContext(AuthContext);

  const menuRef = React.useRef(null)


  const [showDropdown, setShowDropdown] = React.useState<boolean>(false)

  const menuText = (context: any) => context.theme === 'light' ? 'text-gray-700' : 'text-white'

  const onLogout = () => FetchClient.get(`${process.env.NEXT_PUBLIC_MODE}/rest/v1/logout`)
    .then(res => localStorage.removeItem('token'))
    .catch(err => {
      if (!err.response || err.response?.status === 401) {
        localStorage.removeItem('token') 
      }
      // onRedirect('/')
      // TODO
    })

  const logoutOrLogin = () => 
    authContext.authState.loggedIn ? 
      <Formik initialValues={{}} onSubmit={() => onLogout()}>
          {() => (
            <Form>
              <button type='submit'
                className={clsx('block px-4 py-2 text-sm',
                themeContext.theme === 'light' ? 'text-gray-700' : 'text-white', themeBg(themeContext.theme))}
                role='menuitem'
                tabIndex={-1}
                id='menu-item-3'>Sign out
              </button>
            </Form>
          )}
      </Formik>
      : <div>
      <UnstyledLink
        href='/login'
        className={clsx('block px-4 py-2 text-sm', menuText(themeContext), themeBg(themeContext.theme))}
        role='menuitem'
        tabIndex={-1}
        id='menu-item-1'>Login</UnstyledLink>
      <UnstyledLink href='/register' 
        className={clsx('block px-4 py-2 text-sm', menuText(themeContext), themeBg(themeContext.theme))}
        role='menuitem'
        tabIndex={-1}
        id='menu-item-2'>Register</UnstyledLink>
      </div>


  React.useEffect(() => {
		const handleClickOutside = (event: any) => {
					if (menuRef.current) {
						setShowDropdown(false)	
					}
				};
				document.addEventListener('click', handleClickOutside, true);
				return () => {
					document.removeEventListener('click', handleClickOutside, true);
				};
			}, [])

  return (
<div className='relative inline-block text-left'>
  <div>
    <button
    onClick={() => setShowDropdown(!showDropdown)}
    type='button'
    className={clsx('inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500', themeBg(themeContext.theme), themeText(themeContext.theme), themeHover(themeContext.theme))}
    id='menu-button'>
      { authContext.authState.name ?? 'Anon' }
      <svg className='-mr-1 ml-2 h-5 w-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
        <path fillRule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule='evenodd' />
      </svg>
    </button>
  </div>
  <div
	 className={clsx('origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none', showDropdown ? '' : 'invisible', themeBg(themeContext.theme))}
	 role='menu'
	 aria-orientation='vertical'
	 aria-labelledby='menu-button'
	 ref={menuRef}
	 tabIndex={-1}>
    <div className='py-1' role='none'>
    { authContext.authState.loggedIn && 
      <UnstyledLink
        href='/AccountSettings'
        className={clsx('block px-4 py-2 text-sm', menuText(themeContext), themeBg(themeContext.theme))}
        role='menuitem'
        tabIndex={-1}
        id='menu-item-0'>Account settings</UnstyledLink>
    }
    {  authContext.authState.role === 'ROLE_BUCKET_SUBSCRIBED' && <UnstyledLink
        href='/support'
        className={clsx('block px-4 py-2 text-sm', menuText(themeContext), themeBg(themeContext.theme))}
        role='menuitem'
        tabIndex={-1}
        id='menu-item-1'>Support</UnstyledLink>
    }
      <UnstyledLink href='/about' 
        className={clsx('block px-4 py-2 text-sm', menuText(themeContext), themeBg(themeContext.theme))}
        role='menuitem'
        tabIndex={-1}
        id='menu-item-2'>About</UnstyledLink>
    { logoutOrLogin() }
  </div>
</div>
</div>
  );
};

export default UserMenu;

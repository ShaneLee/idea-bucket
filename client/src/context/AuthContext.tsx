import React, { useState } from 'react'

import process, { Roles } from '@/services/TokenService'

export interface AuthState {
  token?: string | null
  name?: string
  role?: Roles
  loggedIn: boolean
}

export const AuthContext = React.createContext({
  authState: { } as AuthState,
  setAuthState: (_: AuthState) => { return }
})

const getLocalStorageItem = (key: string): string | null => {
    return typeof window !== undefined
      ? window.localStorage.getItem(key)
      : null
}

export const tokenToAuthState = (token: string | null,
                                 authState: any,
                                 setAuthState: (_: AuthState) => void): void => {
	if (!token) return
	const result = process(token)
	if (!result) return

	setAuthState({...authState.authState, name: result.name, role: result.role, loggedIn: true})
}

export const AuthContextProvider = (props: any) => {
  const [authState, setAuthState] = useState({
      loggedIn: false
   } as AuthState)

  React.useEffect(() => {
      tokenToAuthState(getLocalStorageItem('token'), authState, setAuthState)
  }, [])

  return (
    <AuthContext.Provider value={{authState, setAuthState}}> 
      {props.children}
    </AuthContext.Provider>

  )
}

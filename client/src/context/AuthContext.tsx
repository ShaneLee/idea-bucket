import React, { useState } from 'react'

export interface AuthState {
  token?: string | null
  name?: string
  loggedIn: boolean
  subscribed: boolean
}

export const AuthContext = React.createContext({
  authState: { subscribed: true } as AuthState,
  setAuthState: (_: AuthState) => {}
})

export const AuthContextProvider = (props: any) => {

  const [authState, setAuthState] = useState({
      token: localStorage.getItem('token'),
      loggedIn: !!localStorage.getItem('token'),
      subscribed: true
   } as AuthState)

  return (
    <AuthContext.Provider value={{authState, setAuthState}}> 
      {props.children}
    </AuthContext.Provider>

  )
}

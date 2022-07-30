import { AxiosError, AxiosResponse } from 'axios'

import FetchClient from './FetchClient'

const SetupInterceptors = (history: any) => {
    FetchClient.interceptors.response.use((response: AxiosResponse<any>) => {
        return response
    }, (error: AxiosError<any>) => {
      if (!error.response || error.response?.status === 401) {
          localStorage.removeItem('token')
          history.push('/loggedOut')
      }
        return Promise.reject(error)
    })
}

export default SetupInterceptors

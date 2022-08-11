class Fetch {

  post(url: string, body: any) {
    return this.interceptor(() => fetch(url, {
      body: JSON.stringify(body),
      method: 'POST',
      headers: this.headers()
      }
    ))
  }

  put(url: string, body: any) {
    return this.interceptor(() => fetch(url, {
      body: JSON.stringify(body),
      method: 'PUT',
      headers: this.headers()
      }
    ))
  }

  get(url: string) {
    return this.interceptor(() => fetch(url, { headers: this.headers() }))
  }

  delete(url: string, id: string) {
    return this.interceptor(() => fetch(url, {
      body: id,
      method: 'DELETE',
      headers: this.headers()
      }
    ))
  }

  auth() {
     const token = localStorage.getItem('token')
     return token ? `Bearer ${token}` : ''
  }

  headers() {
    return new Headers({
      Authorization: this.auth(),
      'Content-Type': 'application/json'
    })
  }

  interceptor(fetchFn: () => Promise<any>): Promise<any> {
    return fetchFn()
      .then(val => {
        if (val.status === 401) {
          return Promise.reject({ response: { data: 'user not found' }})
        }
        if (val.status === 409) {
          return Promise.reject({ response: { data: 'email already exists' }})
        }
        if (val.status === 403) {
          const token = localStorage.getItem('token')
          if (token) {
            localStorage.removeItem('token')
            window.location.href = '/loggedOut'
          }
          window.location.href = '/notLoggedIn'

          return val
        }
        if (val.status === 500 || (val.status > 500 && val.status < 600)) {
          window.location.href = '/uhohspagettios'
        }
        return val
      })
  }
}

const fetchClient = () => {
    return new Fetch();
   }
 
export default fetchClient()

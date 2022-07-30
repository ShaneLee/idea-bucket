class Fetch {

  post(url: string, body: any) {
    return fetch(url, {
      body: JSON.stringify(body),
      method: 'POST',
      headers: this.headers()
      }
    )
  }

  put(url: string, body: any) {
    return fetch(url, {
      body: JSON.stringify(body),
      method: 'PUT',
      headers: this.headers()
      }
    )
  }

  get(url: string) {
    return fetch(url, { headers: this.headers() })
  }

  delete(url: string, id: string) {
    return fetch(url, {
      body: id,
      method: 'DELETE',
      headers: this.headers()
      }
    )
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
}

const fetchClient = () => {
    return new Fetch();
   }
 
export default fetchClient()

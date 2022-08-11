import jwt_decode from 'jwt-decode'

export type Roles = 'ROLE_BUCKET_STANDARD' | 'ROLE_BUCKET_SUBSCRIBED'

export type Token = {
  exp: number,
  id: string,
  name: string,
  role: Roles
}

const processToken = (token: string): Token => jwt_decode(token)

export default processToken

import processToken from '@/services/TokenService'

const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJyb2xlIjoiUk9MRV9CVUNLRVRfU1RBTkRBUkQiLCJuYW1lIjoiU2hhbmUiLCJleHAiOjE2NTk3NDA3ODV9.ALjyTBwMSKc1PQ3e_kfhe_Tr5ODf8MBle1MLkrbeCBviyFfxylSohu8OgTp4Dl14Luqqch7tIrszBSkqYriCD9nmNDMs6OkXpcybW9HUKr0HMcsqxUnaPXYDr0mUc3yqcNXhGvOQgePIm0-bNKx9_fk2pTeuUl8PT1skt7lN5w-A6DC4x5H6otYCQoyVeEevQ6pn6K9XwZgBuoiT8M7XUPkdcXMm1y_fojQD2HYQ6FdQ4zKhWzYMKLXEnlPgNFpgc0JPBeRmyv57DlyiPKZm3-5W7O6io8EZfuBV8Uc-yOwW3-GCbpRvxqrJYgb6pffQClGGn5_og3rZKfQA3-FVng`

describe('TOKEN SERVICE', () => {

  it('it parses a token', () => {
    const expected = {
      exp: 1659740785,
      name: 'Shane',
      role: 'ROLE_BUCKET_STANDARD'
    }
    const result = processToken(token)

    expect(result).toEqual(expected)

  })

})

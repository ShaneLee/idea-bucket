import httpProxy from 'http-proxy'
const API_URL = process.env.NEXT_PUBLIC_IDEAS_BASE_URL
const proxy = httpProxy.createProxyServer()
export const config = {
    api: {
        bodyParser: false
    }
}

const prxy =  (req, res) => {
    proxy.web(req, res, { target: API_URL, changeOrigin: true })
}

export default prxy

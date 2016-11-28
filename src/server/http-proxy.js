const proxy = require('http-proxy-middleware')
const parseUrl = require('url').parse
const extractProxiedUrl = require('./extract-proxied-url')

const options = {
  target: '<dynamic_target>', // Has to be given, although not used... see options.router.
  changeOrigin: true,
  hostRewrite: true,
  onProxyReq: (proxyReq, req, res) => {
    if(req.headers.cookie) {
      proxyReq.setHeader('cookie', req.headers.cookie)
    }
  },
  router: (req) => {
    const targetUrl = parseUrl(extractProxiedUrl(req.url))
    return `${targetUrl.protocol}//${targetUrl.host}`
  },
  pathRewrite: (path, req) => {
    return parseUrl(extractProxiedUrl(req.url)).pathname
  }
}

module.exports = () => {
  return proxy(options)
}

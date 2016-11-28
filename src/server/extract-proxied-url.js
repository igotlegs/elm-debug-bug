const parseUrl = require('url').parse

module.exports = (url) => {
  const query = parseUrl(url).query
  if(query) {
    const parts = query.split('=')
    if(parts.length === 2 && parts[0] === 'url') {
      return decodeURIComponent(parts[1])
    }
  }
  return ''
}

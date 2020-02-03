interface UriBlocks {
  scheme?: string
  hostname?: string
  ip?: string
  port?: string
  authority?: string
  path?: string
  query?: string
  fragment?: string
}

export type UriParse = (uri: string) => UriBlocks

export const uriParse: UriParse = uri => {
  const scheme = '(?<scheme>([A-Za-z][A-Za-z0-9+.-]*))'

  const hostname = '(?<hostname>([A-Za-z]+[-.])*([A-Za-z]+))'
  const ipSection = '[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]'
  const ip = `(?<ip>((${ipSection})\\.){3}(${ipSection}))`
  const port = '(?<port>([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))'
  const authority = `(?<authority>(${hostname}|${ip})(:${port})?)`

  const pathSection = '[A-Za-z0-9_.%-]+'
  const path = `(?<path>((${pathSection})(\\/(${pathSection}))*))`

  const queryItem = '([A-Za-z0-9_-]+)'
  const queryPair = `${queryItem}(=${queryItem})?`
  const query = `(?<query>(${queryPair}(&${queryPair})*))`

  const fragment = '(?<fragment>([A-Za-z0-9._~%-]+))'

  const pattern = new RegExp(
    `^(${scheme}:)?((//)?${authority})?(/${path})?(\\?${query}?)?(#${fragment})?$`
  )

  const match = uri.match(pattern)
  return (match && match.groups) || {}
}

export type UriBuild = (groups: UriBlocks) => string

export const uriBuild: UriBuild = groups => {
  const { scheme, hostname, ip, port, authority, path, query, fragment } = groups

  const address =
    authority ||
    ((hostname || ip) ? (hostname || ip) + (port ? `:${port}` : '') : '')

  return (
    (scheme ? `${scheme}:` : '') +
    ((scheme && address) ? '//' : '') +
    (address || '') +
    ((address && path) ? '/' : '') +
    (path || '') +
    (query ? ('?' + query) : '') +
    ((query && fragment) ? '#' : '') +
    (fragment || '')
  )
}

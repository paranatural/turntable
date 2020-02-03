import { uriParse } from '../src/uri-tools'

test('parse-uri', () => {
  expect(uriParse('https://foo.bar.org/some/page?query#section')).toMatchObject({
    scheme: 'https',
    hostname: 'foo.bar.org',
    path: 'some/page',
    query: 'query',
    fragment: 'section'
  })

  expect(uriParse('https://t.me/addstickers/Blondes_by_fStikBot?')).toMatchObject({
    hostname: 't.me',
    path: 'addstickers/Blondes_by_fStikBot'
  })

  expect(uriParse('ftp:192.168.0.1:5000')).toMatchObject({
    scheme: 'ftp',
    ip: '192.168.0.1',
    port: '5000'
  })

  expect(uriParse('https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D0%BA%D0%B8%D0%BF%D0%B5%D0%B4%D0%B8%D1%8F')).toMatchObject({
    hostname: 'ru.wikipedia.org',
    path: 'wiki/%D0%92%D0%B8%D0%BA%D0%B8%D0%BF%D0%B5%D0%B4%D0%B8%D1%8F'
  })

  expect(uriParse('/some/relative/path')).toMatchObject({
    path: 'some/relative/path'
  })
})

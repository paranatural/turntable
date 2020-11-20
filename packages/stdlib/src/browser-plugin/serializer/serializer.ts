export interface UriBlocks {
  scheme?: string;
  hostname?: string;
  ip?: string;
  port?: string;
  authority?: string;
  path?: string;
  query?: string;
  fragment?: string;
}

export interface Serializer {
  parse: (uri: string) => UriBlocks;
  stringify: (groups: UriBlocks) => string;
}

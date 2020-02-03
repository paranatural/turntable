# Ghostship

Configurable SPA router

![npm bundle size](https://img.shields.io/bundlephobia/minzip/ghostship/core)

# Features

- Expandable with [middlewares](./docs/middleware.md)
- Written in [TypeScript](https://github.com/microsoft/TypeScript)
- Zero-dependency
- Batteries included (in a separate [package](./packages/stdlib), but it's officially supported)
- Really lightweight [(<3kb min+gzip)](https://bundlephobia.com)

# Usage

```
npm i @ghostship/core @ghostship/react
or
yarn add @ghostship/core @ghostship/react
```

```jsx harmony
import React from 'react'
import ReactDom from 'react-dom'
import { Ghostship } from '@ghostship/core'
import { GhostshipComponent } from '@ghostship/react'

import { HomePage, PostPage, NotFoundPage } from './components/pages'

const ghostship = new Ghostship(
  // routes tree
  [{
    path: '/',
    component: HomePage,
  }, {
    path: '/post/:slug',
    components: PostPage,
  }],
  // options
  {
    trailingSlash: true,
    notFound: NotFoundPage
  }
)

ReactDom.render(
  <GhostshipComponent instance={ghostship} />,
  document.getElementById('react')
)
```

**And, of course, lot of documentation in [docs](./docs)**

# Motivation

There are plenty of client-side routing libraries, but all of them meet my criteria: be lightweight (<10kb) and support middlewares or guargs out-of-the-box. So i've just made Ghostship. Enjoy, please. Pr is welcome.

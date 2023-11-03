<div align='center'>
    <picture>
        <source media='(prefers-color-scheme: dark)' srcset='./.github/turntable-logo-light-160.png' />
        <source media='(prefers-color-scheme: light)' srcset='./.github/turntable-logo-dark-160.png' />
        <img src='./.github/turntable-logo-dark-160.png' />
    </picture>
</div>

# ⬡ Turntable

Framework-agnostic flexible SPA router

# ⬡ Motivation/Promise

There are plenty of client-side routing libraries, but all of them aren't really lightweight and do not support middlewares or guards out-of-the-box

# ⬡ Features

- Expandable with [middlewares](./docs/middleware.md)
- Written in [TypeScript](https://github.com/microsoft/TypeScript)
- Batteries included (in a separate [package](./packages/stdlib), but it's officially supported)
- Really lightweight [(<3kb min+gzip)](https://bundlephobia.com/result?p=@paranatural/turntable)

# ⬡ Installation

```shell
npm i @paranatural/turntable @paranatural/turntable-stdlib @paranatural/turntable-react
```

```shell
yarn add @paranatural/turntable @paranatural/turntable-stdlib @paranatural/turntable-react
```

```shell
pnpm add @paranatural/turntable @paranatural/turntable-stdlib @paranatural/turntable-react
```

# ⬡ Usage/Utilizing/Enjoyment

```typescript jsx
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

# ⬡ API



# ⬡ Contribution

Feel free to open an issue/discussion with request/report, but ensure you read/follow [Contributor Covenant Code of Conduct](docs/5-development/code-of-conduct.md)

# ⬡ Development/History

[Changelog/Past/Versions](./docs/changelog.md)

[Roadmap/Future](roadmap.md)

# ⬡ Legal info

Project licensed under [MIT License](license.md). [What it means](https://choosealicense.com/licenses/mit/)

# ⬡ Brand/Look

Project name, logo, visual design and writing style heavily inspired by [Control game](https://www.remedygames.com/games/control/) (made by [Remedy Entertainment](https://www.remedygames.com/))

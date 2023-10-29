import { createRoute, createController } from '../src'

test('correct route matches', () => {
  const controller = createController({}, [
    createRoute({
      path: '/'
    }),
    createRoute({
      path: '/account',
      nested: [
        createRoute({
          path: '/login',
        }),
        createRoute({
          path: '/register'
        })
      ]
    }),
    createRoute({
      path: '/shop',
      nested: [
        createRoute({
          path: '/item/:id'
        }),
        createRoute({
          path: '/collection/:id'
        }),
        createRoute({
          path: '/seller/:id'
        })
      ]
    }),
    createRoute({
      path: '/blog',
      nested: [
        createRoute({
          path: '/article/:id',
          nested: [
            createRoute({
              path: '/edit'
            }),
            createRoute({
              path: '/comments'
            })
          ]
        }),
        createRoute({
          path: '/author/:id'
        })
      ]
    }),
    createRoute({
      path: '/404'
    }),
    createRoute({
      path: '/403'
    }),
    createRoute({
      path: '/500'
    })
  ])

  expect(controller)
})

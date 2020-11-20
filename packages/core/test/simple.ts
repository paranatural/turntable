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
    })
  ])

  expect(controller.match('/account')?.options.path)
    .toBe('/account')
})

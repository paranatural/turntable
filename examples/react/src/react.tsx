import React from 'react'
import { Route, Navigator } from '@paranatural/turntable'

const HomePage = () => (
  <>
    <header>

    </header>
  </>
)

const homeRoute = new Route({
  component: HomePage,
})

const LoginPage = () => (
  <>
    <header>
      <Link to={HomePage}>Back to main page</Link>
    </header>
  </>
)

const routeLogin = new Route({
  component: LoginPage,
})

const app = new Navigator({}, [
  homeRoute,
  routeLogin
], [])

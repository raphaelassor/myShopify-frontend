import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import {routes} from './routes.js'

import {MainNavBar} from './cmps/MainNavBar'
import { Header } from './cmps/Header'


export function App() {
  return (
    <div className="app">
      <Router>
        <Header></Header>
        <main className="main-app-wrapper">
        <MainNavBar/>
          <Switch>
            {routes.map(route => <Route key={route.path} component={route.component} path={route.path} />)}
          </Switch>
        </main>
        <footer>
          Starter
        </footer>
      </Router>
    </div>
  )
}


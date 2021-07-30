import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import {routes} from './routes.js'
import {MainNavBar} from './cmps/MainNavBar'
import { AppHeader } from './cmps/AppHeader.jsx'
import { DynamicModal } from './cmps/DynamicModal.jsx'


export function App() {
  return (
    <div className="app">
      <Router>
        <AppHeader/>
        <main className="main-app-wrapper">
        <MainNavBar/>
        <section className="main-container">
          <Switch>
            {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
          </Switch>
        </section>
        <DynamicModal/>
        </main>
      </Router>
    </div>
  )
}


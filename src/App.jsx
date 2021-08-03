import React, { useEffect } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import {routes} from './routes.js'
import {MainNavBar} from './cmps/MainNavBar'
import { AppHeader } from './cmps/AppHeader.jsx'
import { DynamicModal } from './cmps/Modals/DynamicModal.jsx'
import { useDispatch } from 'react-redux'
import { loadShop } from './store/actions/shopActions.js'


export function App() {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(loadShop('DEMO_SHOP'))
  })
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


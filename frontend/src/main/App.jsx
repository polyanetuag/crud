import React from 'react'
import { HashRouter } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import Logo from '../components/Logo/Logo'
import Nav from '../components/Nav/Nav'
import Footer from '../components/Footer/Footer'
import Routes from './Routes'

// eslint-disable-next-line import/no-anonymous-default-export
export default props => 
  <HashRouter>
    <div className="app">
      <Logo />
      <Nav />
      <Routes />
      <Footer />
    </div>
  </HashRouter>
import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import Logo from '../components/Logo/Logo'
import Nav from '../components/Nav/Nav'
import Main from '../components/Main/Main'
import Footer from '../components/Footer/Footer'

// eslint-disable-next-line import/no-anonymous-default-export
export default props => 
  <div className="app">
    <Logo />
    <Nav />
    <Main icon="home" title="Início" subtitle="Segundo projeto do capítulo de React." />
    <Footer />
  </div>
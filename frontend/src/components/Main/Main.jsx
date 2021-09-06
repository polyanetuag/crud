import '../Main/Main.css'
import React from 'react'
import Header from '../Header/Header'

// eslint-disable-next-line import/no-anonymous-default-export
export default props =>
  <>
    <Header {...props}/>
    <main className="content">
      Conteúdo
    </main>
  </>
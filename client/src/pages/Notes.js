import React from 'react'
import Header from '../components//Nav'
import Home from '../components/Home'
import CreateNote from '../components//createNote'
import EditNote from '../components//editNote'

import {BrowserRouter,Routes, Route} from 'react-router-dom'

//const user = JSON.parse(localStorage.getItem(''))

export default function Notes({setIsLogin}) {
  return (
    <BrowserRouter>
    <div className="notes-page">
        <Header setIsLogin={setIsLogin} />
        <section>
          <Routes>
            <Route path="/" element={<Home/>} exact />
            <Route path="/create" element={<CreateNote/>} exact />
            <Route path="/edit/:id" element={<EditNote/>} exact />
          </Routes> 
        </section> 
    </div>
    </BrowserRouter>

  )
}

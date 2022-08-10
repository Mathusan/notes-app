import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default function Nav({setIsLogin}) {

  const user = JSON.parse(localStorage.getItem('userLogin'))
 
  const logoutSubmit = () =>{
    localStorage.clear()
    setIsLogin(false)

  }

  return (
    <header>
      <div className="logo">
        <h1><Link to="/"> {user.firstName}'s  Notes</Link></h1>
      </div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/create">Add Note</Link></li>
          <li onClick={logoutSubmit}><Link to="/">Logout </Link></li>
          
        </ul>

    </header>
  )
}

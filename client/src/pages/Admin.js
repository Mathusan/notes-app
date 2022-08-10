import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Admin() {

const [userList, setUserList] = useState([])
const [viewOpen, setViewOpen] = useState(false)
const [addOpen, setAddOpen] = useState(false)
const [userData, setUserData] = useState([])
const [value, setValue] = useState()
const [type, setType] = useState()

const [err,setErr] = useState('')



const handleView = async(id) => {
    const user = userList.find(user => user.id === id)
    setUserData(user)
    setViewOpen(true)
}

const handleSearch = async() => {
    if(type && type !== 'all' && value) {
        try{
          const token = localStorage.getItem('tokenStore')
          if (token){

            const res = await axios.get(`/users/${type}/${value}`, {
              headers: {Authorization : token}
            })
            if(res.status === 200) {
                setUserList(res.data.user)  
            }
          }           
        } catch(err) {
          err.response.data.msg && setErr(err.response.data.msg)
          
        }
    } 
    if(type === 'all') {
        getUsers()
    }
}

const getUsers = async() => {
    try{
        //if(loading === false) setLoading(true)
        const token = localStorage.getItem('tokenStore')
        if (token){
          const res = await axios.get('/users/', )
    
          if(res.status === 200) {
              setUserList(res.data)
              
        }
        }
    } catch(err) {
      err.response.data.msg && setErr(err.response.data.msg)

    }   
}

useEffect(() => {     
    getUsers()
}, [])

const displayData = userList.map(
  (user)=>{
    return(
      <tr>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
        <td>{user.dateOfBirth}</td>
        <td>{user.mobile}</td>
      </tr>
    )
  }
)

  return (
    <div>
        <table >
                <thead>
                    <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>dateOfBirth</th>
                    <th>mobile</th>
                    </tr>
                </thead>
                <tbody>
                     
                    {displayData}
                    
                </tbody>
            </table>
    </div>
  )
}

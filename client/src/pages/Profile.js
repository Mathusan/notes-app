import React, { useState, useRef } from 'react'
import axios from 'axios'

export default function Profile({setAccount, setIsLogin}) {
  const [user,setUser] = useState({firstName: '',lastName: '' ,dateOfBirth: new Date() ,password: '',mobile: '' })

  const [err,setErr] = useState('')

  const onChangeInput = e =>{
    const{name,value} = e.target;
    setUser({...user, [name]:value})
    setErr('')
}

const userInfo = JSON.parse(localStorage.getItem('userLogin'))

const updateProfile = async e => {
  e.preventDefault()
  try {
    const token = localStorage.getItem('tokenStore')
    if(token) {
      const {firstName,lastName,dateOfBirth,password,mobile} = user
      const userUpdate = {
        firstName,lastName,dateOfBirth,password,mobile,id : userInfo.id
      }
      const res  = await axios.put('/users',userUpdate, {
        headers: {Authorization : token}
      })
      

      if(res.status === 200) {
        localStorage.setItem('userLogin', res.data.user)
        setAccount(res.data.user)
        setIsLogin(true)
        
    } 
      //setAccount(JSON.parse(res.data.user))
    }
  } catch (err) {
    err.response.data.msg && setErr(err.response.data.msg)
  }


}

// const handleUpdate = async(values) => {
//   try{
//       const res = await axios.put('/users', values, config)

//       if(res.status === 200) {
//           localStorage.setItem('userLogin', JSON.stringify(res.data.token))
//           setAccount(res.data.user)
//           //setLoading(false)
//       } 
//   } catch(err){
//       err.response.data.msg && setErr(err.response.data.msg)

//   }        
// }

  return (
    <div>
        <section className="login-page"> 
        <div className='login create-note '>
            <h2>Complete Profile Details</h2>
            <form onSubmit={updateProfile} >
                <input type="text" name="firstName" id="register-fname" placeholder='First name' required value={user.firstName} onChange={onChangeInput}/>       
                <input type="text" name="lastName" id="register-lname" placeholder='Last name'  required value={user.lastName} onChange={onChangeInput}/> 
                <input type="date" name="dateOfBirth" id="user-dob" placeholder='Date of Birth' required value={user.dateOfBirth} onChange={onChangeInput}/> 
                <input type="tel" name="mobile" id="user-mobile" placeholder='Mobile number'required value={user.mobile} onChange={onChangeInput}/>
                <input type="password" name="password" id="login-password" placeholder='Enter new password' required value={user.password} onChange={onChangeInput}/>

                <button type="submit">Update</button>
                <button type>Go Back</button>
                <h3>{err}</h3>
            </form>
        </div>
        </section>
    </div>
  )

    
}

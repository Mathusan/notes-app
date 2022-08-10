import React , {useState, useEffect, useLayoutEffect} from 'react';
import { BrowserRouter as Router,Routes, Route, Switch, Navigate } from 'react-router-dom'
import axios from 'axios'
import Login from './pages/Login'
import Notes from './pages/Notes'
import Admin from './pages/Admin';
import Profile from './pages/Profile';


function App() {
  const [isLogin,setIsLogin] = useState(false)

  const [userDetail,setUserDetail] =  useState('')

  const user = localStorage.getItem('userLogin')


  useLayoutEffect(() => { 
    if(user) {
      setUserDetail(user)
    } 
  }, [])



  useEffect(() =>{
    const checkLogin = async  () =>{
      const token = localStorage.getItem('tokenStore')
      if(token){
        const verified = await axios.get('/users/verify',{
          headers: {Authorization : token}
        })
        console.log(verified)
        setIsLogin(verified.data)
        if(verified.data === false) return localStorage.clear()
      }else{
        setIsLogin(false)
      }
    }    
    checkLogin()
  })

  return (

    // <Router>
    //   {
    //     !user ? <Navigate to  = '/login'/> :
    //      user && userDetail.accountType === 'Student' && userDetail.status ===false  ? <Navigate to = '/profile' />:
    //      user && userDetail.accountType === 'Student' && userDetail.status ===true ? < Navigate to =  '/home'/>:
    //      <Navigate to = '/adminhome'/>
    //   }
    //   <div className = 'container'>
    //       <Routes>
    //       {!userDetail && <Route exact path = '/login' element = {() => 
    //         <Login setAccount = {(detail) => setUserDetail(detail)} />}  
    //       /> }
    //       <Route exact path = '/home' element = {<Notes/>} />
    //       <Route exact path = '/adminhome' element = {<Admin/>} />
    //       <Route exact path = '/profile' element = {() => 
    //         <Profile setAccount = {(detail) => setUserDetail(detail)} />} 
    //       />
    //       <Route path = '*' component = {Login} />
    //       </Routes>
    //   </div>


    // </Router>


     <div className="App">
       {
          isLogin === false
        ? <Login setIsLogin={setIsLogin} setAccount = {(detail) => setUserDetail(detail)}  />
        : isLogin && userDetail.accountType === 'Student' && userDetail.status ===false
        ? <Profile setIsLogin={setIsLogin} setAccount = {(detail) => setUserDetail(detail)} /> 
        : isLogin && userDetail.accountType === 'Student' && userDetail.status ===true
        ? <Notes setIsLogin={setIsLogin} />
        : <Notes setIsLogin={setIsLogin} />  
      } 
      
     </div>
  );
}

export default App;

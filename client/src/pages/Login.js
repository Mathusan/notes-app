import React, {useState} from 'react'
import axios from 'axios'

export default function Login({setAccount} ) {
    const [user,setUser] = useState({firstName: '',lastName: '' ,email: '' ,password: '' })

    const [err,setErr] = useState('')

    const registerSubmit = async e =>{
        e.preventDefault()
        try {
            const res = await axios.post('/users/register', {
                firstName : user.firstName,
                lastName : user.lastName,
                email: user.email,
                password : user.password
            })
            setUser({firstname:'',lastName:'',email:'',password:''})
            setErr(res.data.msg)
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg)
        }
    }

    const loginSubmit = async e =>{
        e.preventDefault()
        try {
            const res = await axios.post('/users/login', {
                email: user.email,
                password : user.password
            })

            setUser({email:'',password:''})
            localStorage.setItem('tokenStore', res.data.token)
            localStorage.setItem('userLogin', JSON.stringify(res.data.user))
            //setIsLogin(true)
            setAccount(res.data.user)
            
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg)
        }
    }

    const onChangeInput = e =>{
        const{name,value} = e.target;
        setUser({...user, [name]:value})
        setErr('')
    }

    const [onLogin, setOnLogin] = useState(false)
    const style = {
        visibility: onLogin ? "visible" : "hidden",
        opacity: onLogin ? 1 : 0
    }



  return (
    <section className="login-page"> 
        <div className='login create-note '>
            <h2>Login</h2>
            <form onSubmit={loginSubmit}>
                <input type="email" name="email" id="login-email" placeholder='Email' required value={user.email} onChange={onChangeInput}/>
                <input type="password" name="password" id="login-password" placeholder='Password' required value={user.password} onChange={onChangeInput}/>

                <button type="submit">Login</button>
                <p>Don't have an account?
                    <span onClick={() => setOnLogin(true)} > Register Now</span>
                </p>
                <h3>{err}</h3>
            </form>
        </div>
        <div className="register create-note" style={style}>
        <h2>Register</h2>
            <form onSubmit={registerSubmit}>
                {/* <input type="text" name="firstName" id="register-fname" placeholder='First name' required value={user.firstName} onChange={onChangeInput}/>       
                <input type="text" name="lastName" id="register-lname" placeholder='Last name'  required value={user.lastName} onChange={onChangeInput}/> */}
                <input type="email" name="email" id="register-email" placeholder='Email' required value={user.email} onChange={onChangeInput}/>
                  
                {/* <input type="password" name="password" id="register-password" placeholder='Password' required value={user.password} onChange={onChangeInput}/> */}

                <button type="submit">Register</button>
                <p>Already have an account?
                    <span onClick={() => setOnLogin(false)} > Login Now</span>
                </p>
                <h3>{err}</h3>
            </form>
        </div>
        {/* <div>
        <h2>Fill User Information</h2>
            <form onSubmit={registerSubmit}>
                <input type="text" name="firstName" id="register-fname" placeholder='First name' required value={user.firstName} onChange={onChangeInput}/>       
                <input type="text" name="lastName" id="register-lname" placeholder='Last name'  required value={user.lastName} onChange={onChangeInput}/> 
                <input type="date" name="dateOfBirth" id="user-dob" required value={user.dateofBirth} onChange={onChangeInput}/>
                <input type="number" name="mobile" id="user-mobile" required value={user.dateofBirth} onChange={onChangeInput}/>

                
                <button type="submit">Register</button>
                <p>Already have an account?
                    <span onClick={() => setOnLogin(false)} > Login Now</span>
                </p>
                <h3>{err}</h3>
            </form>
        </div> */}
    </section>
  )
}

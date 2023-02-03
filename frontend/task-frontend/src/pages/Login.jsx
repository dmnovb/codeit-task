import {useNavigate} from 'react-router-dom'
import {useState } from 'react';
 
const Login = () => {
const [emailOrName, setEmailOrName] = useState('')
const [password, setPassword] = useState('')
const [err, setErr] = useState({})

const navigate = useNavigate()

const baseUrl = 'http://localhost:3000'
const submitObject = {
    emailOrName: emailOrName,
    password: password
  }

const handleLogin = (e) => {
    e.preventDefault()

    fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(submitObject),
      }).then(resp => {
        if(resp.status == 200){
            resp.json().then((data) => {
                localStorage.setItem('userInfo', JSON.stringify({
                    userId: data.id,
                    name: data.name,
                    email: data.email
                }))
                navigate("/profile")
            })

        } else {
            resp.json().then((error) => {
                setErr({hasError: true, message: error.Message})
            })
        }
      }) 
    }

    return (
        <div className="container">
            <form className='form'>
            <label htmlFor="" >Name or Email</label>
            <input id='text-box' type="text" value={emailOrName} onChange={(e) => setEmailOrName(e.target.value) } required/>
            <label htmlFor="">Password</label>
            <input id='text-box' value={password} type="password" onChange={(e) => setPassword(e.target.value) } required/>
            <button onClick={handleLogin} type='submit'>Submit</button>
            {
                err.hasError && <div>{err.message}</div>
            }
        </form>
        </div>
    )
}

export default Login;
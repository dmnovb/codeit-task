import {useState, useEffect} from 'react';
import { Navigate, redirect, useNavigate, Link} from 'react-router-dom';
import Header from '../components/Header';
import data from '../data'

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [dateOfBirthState, setDateOfBirthState] = useState('')
    const [selectedCountry, setSelectedCountry] = useState('Bulgaria')
    const [countries, setCountries] = useState([]);
    const [isSignedUp, setIsSignedUp] = useState(false)
    const [existingUsers, setExistingUsers] = useState([])
    const [isTaken, setIsTaken] = useState(false); 
    
    const navigate = useNavigate();
    
    const baseUrl = 'http://localhost:3000'
    
    const checkIfEmailTaken = async () => {
      let a = await (await fetch(`${baseUrl}/users`)).json();
      setExistingUsers(a)
    }
    
    useEffect(() => {
      let data = async () => {
        let a = await (await fetch(`${baseUrl}/countries`)).json();
        setCountries(a)
      }
      
      data()
      
      for(let i = 0; i < existingUsers.length; i++){
      if(email == existingUsers[i].email){
        setIsTaken(true);
      }
    }
      if(isSignedUp){
        data.changeState
        return navigate("/profile")
      }

    }, [isSignedUp])

    
    console.log(data.changeState)
    const submitObject = {
      email: email,
      name: name,
      password: password,
      country: selectedCountry,
      dateOfBirth: dateOfBirthState
    }

    const handleSubmit = (e) => {
    e.preventDefault();
      console.log(`${baseUrl}/users`)
      fetch(`${baseUrl}/users`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(submitObject),
      })
      setIsSignedUp(true)
    }

    var localStorageInfo = { 'name': name, 'email': email};

 
    localStorage.setItem('userInfo', JSON.stringify(localStorageInfo));


    return (
    <div className='container'>
        <form className='form' onSubmit={handleSubmit}>
            <label htmlFor="">Email</label>
            <input id='text-box' pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" type="email" value={email} onChange={(e) => setEmail(e.target.value) } required/>
            {isTaken && <p className='taken-email'>Email is taken</p>}
            <label htmlFor="">Name</label>
            <input id='text-box' type="text" value={name} onChange={(e) => setName(e.target.value)}  required/>
            <label htmlFor="">Password</label>
            <input id='text-box' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            <label htmlFor="" id='country-label'>Country</label>
            {countries.length > 0 && 
            <select value={selectedCountry} name="dropdown" onChange={(e) => setSelectedCountry(e.target.value)} >
                {countries.map((country, i) => {
                return <option value={country.name} key={i}>{country.name}</option>
                })}
            </select> 
            }
            <label htmlFor="">Date of birth</label>
            <input type="date" id='text-box' value={dateOfBirthState} onChange={(e) => setDateOfBirthState(e.target.value)}/>
            <button type='submit'>Submit</button>
            <div className='terms-of-service'>
            <input type="checkbox" required name=''></input>
            <label id='checkbox' htmlFor="">Accept terms of service</label>
            </div>
            <Link onClick={data.changeState} to={"/login"}>Log in if you already have an account.</Link>
        </form>
        </div>
    )
    
}


export default SignUp;

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {    
    const baseUrl = 'http://localhost:3000'
    const [user, setUser] = useState({}) 
    let navigate = useNavigate()

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('userInfo'))
        setUser(user)
    },[])
   
    const clearCache = (e) => {
      
        e.preventDefault()
        let cache = JSON.parse(localStorage.getItem('userInfo'))
     

        let submitObject = {
            userId: cache.userId
        }
        
        fetch(`${baseUrl}/logout`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(submitObject)
          }).then(() => {
            localStorage.clear()
            navigate("/")
          }).catch((err) => {
            console.log(err)
          });
    }
    
    return (
        <div>
            <h1>Hello {user.name}, welcome to the home page</h1>
            <h2>{user.email}</h2>
            <Link onClick={clearCache} to={"/"}>Log out</Link>
        </div>
    )
}

export default HomePage;
import Header from "../components/Header";
import { Link } from "react-router-dom";

const HomePage = () => {
    let retrievedData = localStorage.getItem( 'userInfo' )
    let user = JSON.parse(retrievedData);
    
    const clearCache = () => {
        localStorage.clear()
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
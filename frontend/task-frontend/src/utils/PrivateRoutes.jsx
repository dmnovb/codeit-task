import { Navigate, Outlet } from 'react-router-dom';
import data from '../data'

const PrivateRoutes = () => {
    let auth = data.token
    
    return (
      auth ? <Outlet/> : <Navigate to='/'/>
    )
}

export default PrivateRoutes;
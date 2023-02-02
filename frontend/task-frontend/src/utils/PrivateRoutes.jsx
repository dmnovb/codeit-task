import { Navigate, Outlet } from 'react-router-dom';
import data from '../data'

const PrivateRoutes = () => {
    let auth = data
    
    return (
      auth.token ? <Outlet/> : <Navigate to='/'/>
    )
}

export default PrivateRoutes;
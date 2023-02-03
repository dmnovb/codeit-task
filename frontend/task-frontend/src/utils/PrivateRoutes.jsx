import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
  let auth = localStorage.getItem("userInfo") != null
   
  return ( auth ? <Outlet/> : <Navigate to='/'/> )
}

export default PrivateRoutes;
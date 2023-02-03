import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes'
import SignUp from './pages/SignUp';
import HomePage from './pages/HomePage'
import Login from './pages/Login';
 
import './App.css'

function App() {


  return (
    <Router>
      <Routes>
          <Route element={<PrivateRoutes/>}>
              <Route  path="/profile" element={<HomePage/>}/>
          </Route>
        <Route  path="/" element={<SignUp/>}/>
        <Route  path="/login" element={<Login/>}/>
      </Routes>
    </Router>
    
  )
}

export default App

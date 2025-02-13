import { useState } from 'react'

import Products from './pages/Products.jsx'
import Login from './pages/Login.jsx'
import './App.css'

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const handleLogout = (res) => {
    if(res.success) setIsAuth(!res.success);
  }
  return (
    <>
      {
        isAuth ? 
        <Products onLogout={handleLogout}/> :
        <Login setIsAuth={setIsAuth} />
      }
    </>
  )
}

export default App

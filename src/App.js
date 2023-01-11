import { React, useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import { SignIn, Client, Account, Activity, ProtectedComponent } from "./components"
import './styles/index.scss'
import { checkAuth } from "./helpers/helpers"


function App() {
  const [isAuth, setIsAuth] = useState(null)

  const [user,setUser] = useState(null)

  const handleUserState = (res) => {
    console.log(res);
    if (res.isAuth){
      setIsAuth(true);
    } 
    else setIsAuth(false);
  }

  useEffect(() => {
    checkAuth().then(res => {
      console.log(res)
      if (res.isAuth) setIsAuth(true);
      else setIsAuth(false);
    })
  }, [])

  const ProtectedCompProps = {
    userState: isAuth,
  };

  const handleUser = (user) => {
    localStorage.setItem('vehicleId', user.vehicleId);
    localStorage.setItem('driverName',user.driverName);
    localStorage.setItem('VehicleNo',user.vehicle.vehicleNo);
    localStorage.setItem('VehicleName',user.vehicle.vehicleName)
    setUser(user);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={
          <ProtectedComponent {...ProtectedCompProps} handleUserState={handleUserState}>
            <Client driver={user}/>
          </ProtectedComponent>
        } />

        <Route exact path="/login" element={
          <SignIn user={user} handleUser={handleUser} />
        } />

        <Route exact path="/account" element={
          <ProtectedComponent {...ProtectedCompProps} handleUserState={handleUserState} >
            <Account driver={user} />
          </ProtectedComponent>
        } />

        <Route exact path="/activity" element={
          <ProtectedComponent {...ProtectedCompProps} handleUserState={handleUserState}>
            <Activity  driver={user}/>
          </ProtectedComponent>
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

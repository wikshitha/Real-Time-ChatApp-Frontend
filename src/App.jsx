import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/home"
import LoginPage from "./pages/login"
import ProfilePage from "./pages/profile"
import SettingPage from "./pages/settings"
import SignUpPage from "./pages/signup"
import Navbar from "./components/navbar"


function App() {
 

  return (
   <>
   <Navbar/>

    <Routes path="/*">
      <Route path="/signup" element={<SignUpPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/settings" element={<SettingPage/>} />
      <Route path="/profile" element={<ProfilePage/>} />
      <Route path="/*" element={<HomePage/>} />
    </Routes>
    </>
  )
}

export default App

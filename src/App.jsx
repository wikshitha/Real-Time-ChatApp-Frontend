import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./pages/home"
import LoginPage from "./pages/login"
import ProfilePage from "./pages/profile"
import SettingPage from "./pages/settings"
import SignUpPage from "./pages/signup"
import Navbar from "./components/navbar"
import { Toaster } from "react-hot-toast"
import { useAuth } from "./lib/useAuth"
import { useEffect } from "react"
import { Loader } from "lucide-react"


function App() {
 const {user,checkAuth,isCheckingAuth} = useAuth()

useEffect(()=>{
  checkAuth()
},[checkAuth])

if(!user && isCheckingAuth) return(
  <div className="flex items-center justify-center h-screen">
    <Loader className="size-10 animate-spin" />
  </div>
)

  return (
   <>
   <Navbar/>
    <Toaster/>
    <Routes path="/*">
    <Route path="/" element={user ? <HomePage/> : <Navigate to="/login" />} />
      <Route path="/signup" element={<SignUpPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/settings" element={<SettingPage/>} />
      <Route path="/profile" element={<ProfilePage/>} />
    </Routes>
    </>
  )
}

export default App

import axios from "axios";
import { Eye, EyeOff, Lock, Mail, MessageSquare, User } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  function validateForm() {
    if (!firstName.trim()) return toast.error("First name is required");
    if (!lastName.trim()) return toast.error("Last name is required");
    if (!email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(email)) return toast.error("Invalid email format");
    if (!password) return toast.error("Password is required");

    return true;
  }

  function handleSubmit (e) {
    e.preventDefault();

    const success = validateForm();

    if(success === true) {
    console.log({firstName, lastName, email, password})
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`,{
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    }).then((res) => {
      console.log(res)
      toast.success("Account created successfully")
      navigate("/login")
    }).catch((err) => {
      console.log(err)
      toast.error(err?.response?.data?.message || "Something went wrong")
    })
  }

  }

  return (
  <div className="min-h-screen grid lg:grid-cols-2">
  {/* left side */}
  <div className="flex flex-col items-center justify-center sm:p-12">
    <div className="w-full max-w-md space-y-8">
    {/* LOGO */}
    <div className="text-center mb-8">
      <div className="flex flex-col items-center gap-2 group">
        <div className="size-12 rounded-xl bg-amber-700 flex items-center justify-center group-hover:bg-amber-600 transition-colors">
          <MessageSquare className="size-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold mt-2">Create an Account</h1>
        <p className="text-base-content/60">Get started with your free account</p>
      </div>
    </div>

    {/* FORM */}
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">First Name</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <User className="size-5 text-base-content/40" />
          </div>
          <input
            type="text"
            placeholder="First Name"
            className="input input-bordered w-full pl-10"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Last Name</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
            <User className="size-5 text-base-content/40" />
          </div>
          <input
            type="text"
            placeholder="Last Name"
            className="input input-bordered w-full pl-10"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Email</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Mail className="size-5 text-base-content/40" />
          </div>
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full pl-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Password</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Lock className="size-5 text-base-content/40" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input input-bordered w-full pl-10"
            value={password}  
            onChange={(e) => setPassword(e.target.value)}
          />
           <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                     <EyeOff className="size-5 text-base-content/40" />
                    ) : (
                      <Eye className="size-5 text-base-content/40" />
                    )}
                </button>
        </div>
      </div>
      <button className="btn btn-primary w-full">
            Create Account
          </button>
      </form>
      <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
    </div>

  </div>
  </div>
  )
}
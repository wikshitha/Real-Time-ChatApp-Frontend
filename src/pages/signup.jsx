import { Eye, EyeOff, Loader2, Lock, Mail, MessageCircle, User } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/useAuth";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const {signup,isSigningUp} = useAuth()

  function validateForm() {
    if (!formData.firstName.trim()) return toast.error("First name is required");
    if (!formData.lastName.trim()) return toast.error("Last name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");

    return true;
  }

  function handleSubmit (e) {
    e.preventDefault();

    const success = validateForm();

    if(success === true) {
      signup(formData)
    }
   
  }

  

  return (
    <div className="h-screen flex items-center justify-center bg-base-100">
  {/* left side */}
  <div className="w-full max-w-md p-6 sm:p-12 bg-white dark:bg-base-200 rounded-2xl shadow-lg">
    
    {/* LOGO */}
    <div className="text-center mb-6 sm:mb-8">
      <div className="flex flex-col items-center gap-2 group">
        <div  className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center transition-colors
              group-hover:bg-secondary/20">
          <MessageCircle className="size-6 text-secondary" />
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
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
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
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
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
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
            value={formData.password}  
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
      <button type="submit" className="btn btn-secondary w-full" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
      </form>
      <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-secondary">
                Sign in
              </Link>
            </p>
          </div>
    </div>

  
  </div>
  )
}
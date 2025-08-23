import { Eye, EyeOff, Loader2, Lock, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../lib/useAuth";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { login, isLoggingIn } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    login(formData);
  }

  return (
    <div className="h-screen flex items-center justify-center bg-base-100 " >
      <div className="w-full max-w-md p-6 sm:p-12 bg-white dark:bg-base-200 rounded-2xl shadow-lg">
        {/* Logo */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center transition-colors
              group-hover:bg-secondary/20"
            >
              <MessageCircle className="w-6 h-6 text-secondary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mt-2">Welcome Back</h1>
            <p className="text-base-content/60 text-sm sm:text-base">Sign in to your account</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-sm sm:text-base">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-base-content/40" />
              </div>
              <input
                type="email"
                className="input input-bordered w-full pl-10 text-sm sm:text-base"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-sm sm:text-base">Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-base-content/40" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pl-10 text-sm sm:text-base"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-base-content/40" />
                ) : (
                  <Eye className="h-5 w-5 text-base-content/40" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-secondary w-full text-sm sm:text-base flex items-center justify-center gap-2"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign in"}
          </button>
        </form>

        <div className="text-center mt-4 sm:mt-6">
          <p className="text-base-content/60 text-sm sm:text-base">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="link link-secondary">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

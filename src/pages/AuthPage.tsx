import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, ShieldCheck, Mail, Lock } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { login as loginApi, register } from "../services/authService";

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { login: loginUser } = useAuth();

  const [isLogin, setIsLogin] = useState(location.state?.mode !== "register");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setIsLoading(true);

      const data = isLogin
        ? await loginApi({
            email: email.trim(),
            password,
          })
        : await register({
            email: email.trim(),
            password,
          });

      const accessToken =
        data.access_token || data.token || data.session?.access_token;

      if (!accessToken) {
        throw new Error(
          "Authentication succeeded but no access token was returned.",
        );
      }

      loginUser(accessToken);

      const returnTo = location.state?.from || "/upload";

      navigate(returnTo, {
        replace: true,
      });
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f3eb] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      
      {/* Decorative Background Blobs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Header & Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-2.5 bg-white rounded-2xl shadow-xl shadow-blue-500/10 border border-gray-100 mb-4 hover:scale-105 transition-transform duration-200">
            <img 
              src="https://www.image2url.com/r2/default/images/1789100294147-a604f829-b27a-4b30-81d0-17b2fb789440.png" 
              alt="HireUP Logo" 
              className="h-8 w-auto object-contain"
            />
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {isLogin ? "Welcome back" : "Create HireUP account"}
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            {isLogin
              ? "Sign in to access your recruiter workspace and candidate metrics."
              : "Set up your account to start evaluating candidates effortlessly."}
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-gray-200/80 rounded-3xl shadow-xl shadow-blue-900/5 p-6 sm:p-8">
          
          {/* Mode Toggle Tabs */}
          <div className="grid grid-cols-2 bg-gray-100/80 p-1.5 rounded-2xl mb-7">
            <button
              type="button"
              onClick={() => {
                setIsLogin(true);
                setError("");
              }}
              className={`py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isLogin ? "bg-[#f8f3eb] text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Sign In
            </button>

            <button
              type="button"
              onClick={() => {
                setIsLogin(false);
                setError("");
              }}
              className={`py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                !isLogin ? "bg-[#f8f3eb] text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Register
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-5 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium animate-in fade-in duration-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Work Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="recruiter@company.com"
                  required
                  className="w-full pl-10 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50/50 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:bg-white focus:border-[#1254E7] focus:ring-4 focus:ring-[#1254E7]/10 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50/50 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:bg-white focus:border-[#1254E7] focus:ring-4 focus:ring-[#1254E7]/10 transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-[#1254E7] hover:bg-[#0f46c2] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm py-3.5 rounded-2xl shadow-lg shadow-[#1254E7]/25 transition-all duration-200 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{isLogin ? "Sign In to Workspace" : "Create Free Account"}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Benefits / Features Footer */}
          <div className="mt-7 pt-6 border-t border-gray-100 space-y-2.5">
            <div className="flex items-center gap-2.5 text-xs text-gray-600 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Save and manage multiple custom job roles</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-gray-600 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Full AI screening and evaluation history</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-gray-600 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#1254E7] shrink-0" />
              <span>Enterprise-grade secure workspace</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthPage;
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, LockKeyhole } from "lucide-react";

import { login, register } from "../services/authService";

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
        ? await login({
            email: email.trim(),
            password,
          })
        : await register({
            email: email.trim(),
            password,
          });

      /*
       * Store the authenticated user's access token.
       *
       * We will use this token for protected
       * API requests.
       */
      const accessToken =
        data.access_token || data.token || data.session?.access_token;

      if (!accessToken) {
        throw new Error("Login succeeded but no access token was returned.");
      }

      localStorage.setItem("access_token", accessToken);

      /*
       * Return to the page the user came from.
       *
       * For our guest-limit flow this will be /upload.
       */
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-12 h-12 rounded-xl bg-[#1254E7] text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-[#1254E7]/20">
            H
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 mt-5">
            {isLogin ? "Welcome back" : "Create your HireUP account"}
          </h1>

          <p className="text-gray-500 mt-2">
            {isLogin
              ? "Sign in to continue screening candidates."
              : "Create an account to continue using HireUP."}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">
          {/* Toggle */}
          <div className="grid grid-cols-2 bg-gray-100 p-1 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => {
                setIsLogin(true);
                setError("");
              }}
              className={`py-2.5 rounded-lg text-sm font-semibold transition ${
                isLogin ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
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
              className={`py-2.5 rounded-lg text-sm font-semibold transition ${
                !isLogin ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
              }`}
            >
              Register
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#1254E7] focus:ring-2 focus:ring-[#1254E7]/10"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#1254E7] focus:ring-2 focus:ring-[#1254E7]/10"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-[#1254E7] hover:bg-[#0f46c2] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition"
            >
              {isLoading
                ? "Please wait..."
                : isLogin
                  ? "Sign In"
                  : "Create Account"}

              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          {/* Benefits */}
          <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
            <div className="flex gap-3 text-sm text-gray-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              Save and manage multiple jobs
            </div>

            <div className="flex gap-3 text-sm text-gray-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              Keep your screening history
            </div>

            <div className="flex gap-3 text-sm text-gray-600">
              <LockKeyhole className="w-4 h-4 text-[#1254E7] shrink-0 mt-0.5" />
              Secure recruiter account
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

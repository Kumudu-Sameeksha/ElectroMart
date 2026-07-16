import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../components/auth/AuthShell";
import Field from "../components/auth/Field";
import Button from "../components/common/Button";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 900);
  };

  return (
    <AuthShell
  title="Welcome Back 👋"
  subtitle="Sign in to explore the latest electronics, exclusive deals, and your personalized shopping experience."
>
  <form onSubmit={handleSubmit} className="space-y-5">

    {/* Email */}
    <Field
      icon={Mail}
      type="email"
      placeholder="Email Address"
      value={email}
      onChange={setEmail}
    />

    {/* Password */}
    <Field
      icon={Lock}
      type="password"
      placeholder="Password"
      value={password}
      onChange={setPassword}
    />

    {/* Remember + Forgot */}
    <div className="flex items-center justify-between text-sm">
      <label className="flex items-center gap-2 cursor-pointer text-slate-600">
        <input
          type="checkbox"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
          className="accent-indigo-600 rounded"
        />
        Remember me
      </label>

      <button
        type="button"
        className="font-semibold text-indigo-600 hover:text-indigo-700 transition hover:underline"
      >
        Forgot Password?
      </button>
    </div>

    {/* Login Button */}
    <Button
      type="submit"
      disabled={loading}
      className="w-full py-3 text-base font-bold rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
    >
      {loading ? "Logging in..." : "Log In"}
    </Button>

    {/* Divider */}
    <div className="flex items-center gap-4">
      <div className="h-px flex-1 bg-slate-200"></div>
      <span className="text-xs uppercase tracking-wider text-slate-400">
        OR
      </span>
      <div className="h-px flex-1 bg-slate-200"></div>
    </div>

    {/* Social Login */}
    <div className="grid grid-cols-2 gap-3">

      <button
        type="button"
        className="flex items-center justify-center gap-2 border border-slate-200 rounded-xl py-3 font-medium hover:bg-slate-50 hover:shadow transition"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          className="w-5 h-5"
          alt="Google"
        />
        Google
      </button>

      <button
        type="button"
        className="flex items-center justify-center gap-2 border border-slate-200 rounded-xl py-3 font-medium hover:bg-slate-50 hover:shadow transition"
      >
        🍎 Apple
      </button>

    </div>

    {/* Secure Login */}
    <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3">
      <p className="text-xs text-indigo-700 text-center">
        🔒 Your information is protected with secure encryption.
      </p>
    </div>

    {/* Sign Up */}
    <p className="text-center text-sm text-slate-500">
      Don't have an account?{" "}
      <Link
        to="/signup"
        className="font-bold text-indigo-600 hover:text-indigo-700 transition"
      >
        Create an Account
      </Link>
    </p>

  </form>
</AuthShell>
  );
}

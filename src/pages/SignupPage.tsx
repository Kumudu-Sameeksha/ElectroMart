import React, { useState } from "react";
import { User, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../components/auth/AuthShell";
import Field from "../components/auth/Field";
import Button from "../components/common/Button";

export default function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (confirm !== password) { setError("Passwords do not match"); return; }
    if (!agree) { setError("You must accept the terms"); return; }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 900);
  };

  return (
    <AuthShell title="Create your account" subtitle="Sign up to start shopping the latest electronic devices.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field icon={User} placeholder="Full name" value={name} onChange={setName} />
        <Field icon={Mail} type="email" placeholder="Email address" value={email} onChange={setEmail} />
        <Field icon={Lock} type="password" placeholder="Password" value={password} onChange={setPassword} />
        <Field icon={Lock} type="password" placeholder="Confirm password" value={confirm} onChange={setConfirm} error={error} />

        <label className="flex items-start gap-2 text-sm text-slate-600 cursor-pointer select-none">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="rounded accent-indigo-600 mt-0.5" />
          <span>I agree to the <span className="text-indigo-600 font-semibold">Terms of Service</span> and <span className="text-indigo-600 font-semibold">Privacy Policy</span></span>
        </label>

        <Button type="submit" disabled={loading} className="w-full">{loading ? "Creating account..." : "Create Account"}</Button>

        <p className="text-center text-sm text-slate-500 pt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-semibold hover:underline">Log in</Link>
        </p>
      </form>
    </AuthShell>
  );
}
import React, { useState } from "react";
import { useStore } from "../../context/CartContext";
import Button from "../common/Button";

export default function NewsletterSection() {
  const { showToast } = useStore();
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    showToast("Subscribed! Watch your inbox for deals.");
    setEmail("");
  };

  return (
    <section className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">Get exclusive deals in your inbox</h2>
        <p className="text-indigo-100 mb-6">Subscribe and be the first to know about new arrivals and special offers.</p>
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-xl text-slate-900 outline-none"
          />
          <Button variant="secondary" type="submit">Subscribe</Button>
        </form>
      </div>
    </section>
  );
}
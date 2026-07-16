import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
} from "lucide-react";

import { useStore } from "../context/CartContext";
import SectionTitle from "../components/common/SectionTitle";
import Button from "../components/common/Button";

export default function ContactPage() {
  const { showToast } = useStore();

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const update = (k: string, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    showToast("Message sent! We'll get back to you soon.");

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="bg-slate-950 text-white">

      {/* Hero */}

      <section className="relative overflow-hidden py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">

        <div className="absolute left-0 top-0 w-80 h-80 bg-indigo-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-cyan-500/20 blur-[120px] rounded-full"></div>

        <div className="relative max-w-5xl mx-auto px-6 text-center">

          <span className="inline-block px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 mb-5">
            Contact ElectroMart
          </span>

          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            We'd Love To Hear From You
          </h1>

          <p className="text-slate-400 max-w-3xl mx-auto mt-6 text-lg leading-8">
            Have questions about products, orders, warranties, or technical
            support? Our friendly team is always here to help.
          </p>

        </div>

      </section>

      {/* Contact */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <SectionTitle
          eyebrow="GET IN TOUCH"
          title="Contact Us"
          subtitle="Send us a message and we'll respond as quickly as possible."
        />

        <div className="grid lg:grid-cols-3 gap-8 mt-14">

          {/* Form */}

          <form
            onSubmit={submit}
            className="lg:col-span-2 bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 space-y-5 shadow-xl"
          >

            <div className="grid md:grid-cols-2 gap-5">

              <input
                required
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Your Name"
                className="bg-slate-950 border border-slate-700 rounded-xl px-5 py-4 outline-none focus:border-indigo-500 transition"
              />

              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="Your Email"
                className="bg-slate-950 border border-slate-700 rounded-xl px-5 py-4 outline-none focus:border-indigo-500 transition"
              />

            </div>

            <input
              value={form.subject}
              onChange={(e) => update("subject", e.target.value)}
              placeholder="Subject"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-5 py-4 outline-none focus:border-indigo-500 transition"
            />

            <textarea
              rows={6}
              required
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder="Write your message..."
              className="w-full resize-none bg-slate-950 border border-slate-700 rounded-xl px-5 py-4 outline-none focus:border-indigo-500 transition"
            />

            <Button
              type="submit"
              className="w-full flex items-center justify-center gap-2"
            >
              <Send size={18} />
              Send Message
            </Button>

          </form>

          {/* Contact Info */}

          <div className="space-y-5">

            {[
              {
                icon: Phone,
                title: "Phone",
                value: "+1 (555) 234-7890",
              },
              {
                icon: Mail,
                title: "Email",
                value: "support@electromart.com",
              },
              {
                icon: MapPin,
                title: "Address",
                value: "128 Market Street, San Francisco",
              },
              {
                icon: Clock,
                title: "Business Hours",
                value: "Mon–Fri : 9AM - 6PM",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex gap-4 hover:border-indigo-500 hover:-translate-y-1 transition"
              >

                <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center">

                  <item.icon size={20} />

                </div>

                <div>

                  <h3 className="font-bold text-lg">
                    {item.title}
                  </h3>

                  <p className="text-slate-400 mt-1">
                    {item.value}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* Map */}

      <section className="max-w-7xl mx-auto px-6 pb-24">

        <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-xl">

          <iframe
            title="Google Map"
            src="https://maps.google.com/maps?q=San%20Francisco&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-[400px]"
            loading="lazy"
          />

        </div>

      </section>

    </main>
  );
}
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User, Mail, Phone, MapPin, Lock, ShieldCheck,
  Package, Heart, Bell, LogOut, Camera, Check,
  Edit2, Save, ChevronRight, Star, Truck, RotateCcw,
  CreditCard, Settings, ArrowLeft,
} from "lucide-react";
import { useStore } from "../context/CartContext";
import { formatPrice } from "../utils/format";
import RatingStars from "../components/common/RatingStars";
import { PRODUCTS } from "../data/products";

// ─── Types ────────────────────────────────────────────────────────────────────
type Tab = "profile" | "orders" | "wishlist" | "security" | "notifications";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  avatarColor: string;
}

// ─── Dummy order history ──────────────────────────────────────────────────────
const DUMMY_ORDERS = [
  {
    id: "EM-947281",
    date: "Jul 8, 2026",
    status: "Delivered",
    statusColor: "text-emerald-600 bg-emerald-50",
    total: 1548,
    items: [
      { name: "iPhone 15 Pro Max", qty: 1, price: 1199, image: "https://picsum.photos/seed/iphone15pm/100/100" },
      { name: "Apple AirPods Pro 2", qty: 1, price: 249, image: "https://picsum.photos/seed/airpodspro2/100/100" },
    ],
  },
  {
    id: "EM-836104",
    date: "Jun 21, 2026",
    status: "In Transit",
    statusColor: "text-blue-600 bg-blue-50",
    total: 2499,
    items: [
      { name: 'MacBook Pro 16" M3', qty: 1, price: 2499, image: "https://picsum.photos/seed/mbp16/100/100" },
    ],
  },
  {
    id: "EM-712039",
    date: "May 14, 2026",
    status: "Delivered",
    statusColor: "text-emerald-600 bg-emerald-50",
    total: 349,
    items: [
      { name: "Sony WH-1000XM5", qty: 1, price: 349, image: "https://picsum.photos/seed/wh1000xm5/100/100" },
    ],
  },
];

const AVATAR_COLORS = [
  "bg-indigo-500", "bg-violet-500", "bg-emerald-500",
  "bg-rose-500", "bg-amber-500", "bg-cyan-500",
];

// ─── Reusable field ───────────────────────────────────────────────────────────
function Field({
  label, icon: Icon, editing, value, onChange, type = "text", placeholder, className,
}: {
  label: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  editing: boolean;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-xs font-semibold text-slate-500 mb-1.5">{label}</label>
      {editing ? (
        <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3.5 py-2.5 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 bg-white transition-all">
          {Icon && <Icon size={15} className="text-slate-400 shrink-0" />}
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="flex-1 outline-none text-sm text-slate-900 bg-transparent"
          />
        </div>
      ) : (
        <div className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-50 rounded-xl">
          {Icon && <Icon size={15} className="text-slate-400 shrink-0" />}
          <span className="text-sm text-slate-900">{value || <span className="text-slate-400">Not set</span>}</span>
        </div>
      )}
    </div>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({ profile, size = "lg", onColorChange }: {
  profile: UserProfile;
  size?: "sm" | "md" | "lg";
  onColorChange?: () => void;
}) {
  const initials = `${profile.firstName?.[0] ?? ""}${profile.lastName?.[0] ?? ""}`.toUpperCase() || "U";
  const sizeMap = { sm: "w-10 h-10 text-sm", md: "w-14 h-14 text-lg", lg: "w-24 h-24 text-3xl" };
  return (
    <div className="relative inline-block">
      <div className={`${sizeMap[size]} ${profile.avatarColor} rounded-full flex items-center justify-center text-white font-bold`}>
        {initials}
      </div>
      {onColorChange && (
        <button
          onClick={onColorChange}
          className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center border-2 border-white hover:bg-indigo-700 transition-colors"
        >
          <Camera size={14} className="text-white" />
        </button>
      )}
    </div>
  );
}

// ─── Tab sidebar ──────────────────────────────────────────────────────────────
const TABS: { key: Tab; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { key: "profile",       label: "My Profile",      icon: User },
  { key: "orders",        label: "Order History",   icon: Package },
  { key: "wishlist",      label: "Wishlist",        icon: Heart },
  { key: "security",      label: "Security",        icon: ShieldCheck },
  { key: "notifications", label: "Notifications",   icon: Bell },
];

// ─── PROFILE TAB ─────────────────────────────────────────────────────────────
function ProfileTab({ profile, setProfile }: {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile);
  const [colorIdx, setColorIdx] = useState(0);
  const { showToast } = useStore();

  const upd = (k: keyof UserProfile, v: string) =>
    setDraft((d) => ({ ...d, [k]: v }));

  const save = () => {
    setProfile(draft);
    setEditing(false);
    showToast("Profile updated successfully!");
  };

  const cancel = () => {
    setDraft(profile);
    setEditing(false);
  };

  const cycleColor = () => {
    const next = (colorIdx + 1) % AVATAR_COLORS.length;
    setColorIdx(next);
    setDraft((d) => ({ ...d, avatarColor: AVATAR_COLORS[next] }));
  };

  return (
    <div className="space-y-6">
      {/* Avatar section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <Avatar profile={editing ? draft : profile} size="lg" onColorChange={editing ? cycleColor : undefined} />
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-extrabold text-slate-900">
              {profile.firstName || "Your"} {profile.lastName || "Name"}
            </h2>
            <p className="text-slate-500 text-sm mt-0.5">{profile.email || "your@email.com"}</p>
            <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
              <span className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-3 py-1 rounded-full">
                ElectroMart Member
              </span>
              <span className="text-xs bg-amber-50 text-amber-700 font-semibold px-3 py-1 rounded-full">
                ⭐ Gold Customer
              </span>
            </div>
          </div>
          <div>
            {editing ? (
              <div className="flex gap-2">
                <button onClick={cancel} className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button onClick={save} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors">
                  <Save size={14} /> Save
                </button>
              </div>
            ) : (
              <button onClick={() => setEditing(true)} className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                <Edit2 size={14} /> Edit Profile
              </button>
            )}
          </div>
        </div>
        {editing && (
          <p className="text-xs text-indigo-600 mt-3 text-center sm:text-left">
            Click the camera icon to change your avatar color
          </p>
        )}
      </div>

      {/* Personal info */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-bold text-slate-900 mb-5 flex items-center gap-2">
          <User size={16} className="text-indigo-600" /> Personal Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="First Name" icon={User} editing={editing} value={draft.firstName} onChange={(v) => upd("firstName", v)} placeholder="John" />
          <Field label="Last Name"             editing={editing} value={draft.lastName}  onChange={(v) => upd("lastName",  v)} placeholder="Smith" />
          <Field label="Email Address" icon={Mail}  type="email" editing={editing} value={draft.email} onChange={(v) => upd("email", v)} placeholder="john@example.com" />
          <Field label="Phone Number"  icon={Phone} type="tel"   editing={editing} value={draft.phone} onChange={(v) => upd("phone", v)} placeholder="+1 (555) 000-0000" />
        </div>
      </div>

      {/* Address */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-bold text-slate-900 mb-5 flex items-center gap-2">
          <MapPin size={16} className="text-indigo-600" /> Default Address
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Street Address" icon={MapPin} editing={editing} value={draft.address} onChange={(v) => upd("address", v)} placeholder="128 Market Street" className="sm:col-span-2" />
          <Field label="City"    editing={editing} value={draft.city}    onChange={(v) => upd("city",    v)} placeholder="San Francisco" />
          <Field label="State"   editing={editing} value={draft.state}   onChange={(v) => upd("state",   v)} placeholder="CA" />
          <Field label="ZIP"     editing={editing} value={draft.zip}     onChange={(v) => upd("zip",     v)} placeholder="94105" />
          <Field label="Country" editing={editing} value={draft.country} onChange={(v) => upd("country", v)} placeholder="United States" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Orders placed",  value: "3",    icon: Package  },
          { label: "Items wishlisted", value: "0",  icon: Heart    },
          { label: "Total spent",    value: "$4,396", icon: CreditCard },
          { label: "Reviews left",   value: "2",    icon: Star     },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-200 p-4 text-center">
            <Icon size={20} className="text-indigo-600 mx-auto mb-2" />
            <p className="text-xl font-extrabold text-slate-900">{value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ORDERS TAB ──────────────────────────────────────────────────────────────
function OrdersTab() {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <div className="space-y-4">
      <h2 className="font-bold text-slate-900 text-lg">Order History</h2>
      {DUMMY_ORDERS.map((order) => (
        <div key={order.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div
            className="flex flex-wrap items-center gap-4 p-5 cursor-pointer hover:bg-slate-50 transition-colors"
            onClick={() => setExpanded(expanded === order.id ? null : order.id)}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-bold text-slate-900 text-sm">{order.id}</p>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${order.statusColor}`}>
                  {order.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{order.date} · {order.items.length} item{order.items.length > 1 ? "s" : ""}</p>
            </div>
            <p className="font-extrabold text-slate-900">{formatPrice(order.total)}</p>
            <ChevronRight size={16} className={`text-slate-400 transition-transform ${expanded === order.id ? "rotate-90" : ""}`} />
          </div>

          {expanded === order.id && (
            <div className="border-t border-slate-100 p-5 space-y-4">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover border border-slate-200" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">{item.name}</p>
                    <p className="text-xs text-slate-400">Qty: {item.qty}</p>
                  </div>
                  <p className="font-bold text-slate-900 text-sm">{formatPrice(item.price)}</p>
                </div>
              ))}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                <button className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:underline">
                  <Truck size={13} /> Track Order
                </button>
                <span className="text-slate-300">·</span>
                <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:underline">
                  <RotateCcw size={13} /> Return / Refund
                </button>
                <span className="text-slate-300">·</span>
                <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:underline">
                  <Star size={13} /> Leave Review
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── WISHLIST TAB ─────────────────────────────────────────────────────────────
function WishlistTab({ navigate }: { navigate: (path: string) => void }) {
  const { wishlist, toggleWishlist } = useStore();
  const wishlisted = PRODUCTS.filter((p: any) => wishlist.has(p.id));

  if (wishlisted.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-5">
          <Heart size={32} className="text-rose-400" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">Your wishlist is empty</h3>
        <p className="text-slate-500 text-sm mb-6">Browse products and tap the heart icon to save items here.</p>
        <button
          onClick={() => navigate("/products")}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-bold text-slate-900 text-lg mb-5">Wishlist ({wishlisted.length})</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {wishlisted.map((p: any) => (
          <div key={p.id} className="bg-white rounded-2xl border border-slate-200 flex gap-4 p-4">
            <img
              src={p.image} alt={p.name}
              className="w-20 h-20 rounded-xl object-cover cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigate(`/products/${p.slug}`)}
            />
            <div className="flex-1 min-w-0">
              <p
                className="font-bold text-slate-900 text-sm cursor-pointer hover:text-indigo-600 transition-colors line-clamp-1"
                onClick={() => navigate(`/products/${p.slug}`)}
              >
                {p.name}
              </p>
              <RatingStars rating={p.rating} reviewCount={p.reviewCount} size={12} />
              <p className="font-extrabold text-slate-900 mt-1">{formatPrice(p.price)}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => navigate(`/products/${p.slug}`)}
                  className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  View
                </button>
                <button
                  onClick={() => toggleWishlist(p.id)}
                  className="text-xs border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg font-semibold hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SECURITY TAB ─────────────────────────────────────────────────────────────
function SecurityTab() {
  const { showToast } = useStore();
  const [pwForm, setPwForm] = useState({ current: "", next: "", confirm: "" });
  const [twoFA, setTwoFA] = useState(false);

  const changePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwForm.next !== pwForm.confirm) { showToast("Passwords don't match!"); return; }
    if (pwForm.next.length < 8) { showToast("Password must be at least 8 characters"); return; }
    showToast("Password updated successfully!");
    setPwForm({ current: "", next: "", confirm: "" });
  };

  return (
    <div className="space-y-6">
      <h2 className="font-bold text-slate-900 text-lg">Security Settings</h2>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-bold text-slate-900 mb-5 flex items-center gap-2">
          <Lock size={16} className="text-indigo-600" /> Change Password
        </h3>
        <form onSubmit={changePassword} className="space-y-4">
          {[
            { label: "Current password",  key: "current", placeholder: "Enter current password" },
            { label: "New password",      key: "next",    placeholder: "At least 8 characters" },
            { label: "Confirm password",  key: "confirm", placeholder: "Re-enter new password" },
          ].map(({ label, key, placeholder }) => (
            <div key={key}>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">{label}</label>
              <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3.5 py-2.5 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 bg-white">
                <Lock size={15} className="text-slate-400 shrink-0" />
                <input
                  type="password"
                  value={pwForm[key as keyof typeof pwForm]}
                  onChange={(e) => setPwForm((f) => ({ ...f, [key]: e.target.value }))}
                  placeholder={placeholder}
                  className="flex-1 outline-none text-sm text-slate-900 bg-transparent"
                />
              </div>
            </div>
          ))}
          <button type="submit" className="w-full bg-indigo-600 text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors">
            Update Password
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-bold text-slate-900 mb-5 flex items-center gap-2">
          <ShieldCheck size={16} className="text-indigo-600" /> Two-Factor Authentication
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">Authenticator app</p>
            <p className="text-xs text-slate-500 mt-0.5">Add an extra layer of security to your account</p>
          </div>
          <button
            onClick={() => { setTwoFA(!twoFA); }}
            className={`relative w-12 h-6 rounded-full transition-colors ${twoFA ? "bg-indigo-600" : "bg-slate-200"}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${twoFA ? "translate-x-6" : ""}`} />
          </button>
        </div>
        {twoFA && (
          <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-2">
            <Check size={16} className="text-emerald-500 shrink-0" />
            <p className="text-xs text-emerald-700 font-semibold">Two-factor authentication is enabled</p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Settings size={16} className="text-indigo-600" /> Active Sessions
        </h3>
        {[
          { device: "Chrome on Windows", location: "San Francisco, CA", current: true,  time: "Now" },
          { device: "Safari on iPhone",  location: "San Francisco, CA", current: false, time: "2 hours ago" },
        ].map((s, i) => (
          <div key={i} className={`flex items-center justify-between py-3 ${i > 0 ? "border-t border-slate-100" : ""}`}>
            <div>
              <p className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                {s.device}
                {s.current && <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">Current</span>}
              </p>
              <p className="text-xs text-slate-400">{s.location} · {s.time}</p>
            </div>
            {!s.current && (
              <button className="text-xs text-red-500 font-semibold hover:underline">Revoke</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── NOTIFICATIONS TAB ───────────────────────────────────────────────────────
function NotificationsTab() {
  const { showToast } = useStore();
  const [prefs, setPrefs] = useState({
    orderUpdates:  true,
    promotions:    true,
    newArrivals:   false,
    priceDrops:    true,
    newsletter:    false,
    sms:           false,
    pushAlerts:    true,
  });

  const toggle = (key: keyof typeof prefs) =>
    setPrefs((p) => ({ ...p, [key]: !p[key] }));

  const save = () => showToast("Notification preferences saved!");

  const groups = [
    {
      title: "Order Notifications",
      items: [
        { key: "orderUpdates" as const, label: "Order updates", desc: "Shipping, delivery, and status changes" },
      ],
    },
    {
      title: "Marketing",
      items: [
        { key: "promotions"  as const, label: "Promotions & deals",  desc: "Exclusive discounts and flash sales" },
        { key: "newArrivals" as const, label: "New arrivals",        desc: "Be the first to know about new products" },
        { key: "priceDrops"  as const, label: "Price drops",         desc: "Alerts when wishlisted items go on sale" },
        { key: "newsletter"  as const, label: "Weekly newsletter",   desc: "Curated tech news and buying guides" },
      ],
    },
    {
      title: "Channels",
      items: [
        { key: "sms"        as const, label: "SMS notifications", desc: "Text messages to your phone number" },
        { key: "pushAlerts" as const, label: "Push alerts",       desc: "Browser and mobile push notifications" },
      ],
    },
  ];

  return (
    <div className="space-y-5">
      <h2 className="font-bold text-slate-900 text-lg">Notification Preferences</h2>
      {groups.map((group) => (
        <div key={group.title} className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-bold text-slate-700 text-sm mb-4">{group.title}</h3>
          <div className="space-y-4">
            {group.items.map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
                </div>
                <button
                  onClick={() => toggle(key)}
                  className={`relative w-12 h-6 rounded-full transition-colors shrink-0 ${prefs[key] ? "bg-indigo-600" : "bg-slate-200"}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${prefs[key] ? "translate-x-6" : ""}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={save}
        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors"
      >
        Save Preferences
      </button>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function ProfilePage() {
  const navigate = useNavigate();
  const { showToast, wishlist } = useStore();
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "Alex",
    lastName:  "Rivera",
    email:     "alex.rivera@email.com",
    phone:     "+1 (555) 234-7890",
    address:   "128 Market Street",
    city:      "San Francisco",
    state:     "CA",
    zip:       "94105",
    country:   "United States",
    avatarColor: "bg-indigo-500",
  });

  const handleLogout = () => {
    showToast("Logged out successfully!");
    setTimeout(() => navigate("/login"), 800);
  };
return (
  <main
    className="
      min-h-screen
      bg-gradient-to-br
      from-slate-950
      via-slate-900
      to-indigo-950
      px-4
      sm:px-6
      lg:px-8
      py-10
    "
  >

    <div className="max-w-7xl mx-auto">


      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="
          flex items-center gap-2
          text-sm font-semibold
          text-indigo-400
          mb-8
          hover:text-indigo-300
          transition
        "
      >
        <ArrowLeft size={16} />
        Back to Home
      </button>

<div className="grid lg:grid-cols-4 gap-8">

{/* Sidebar */}
        <aside className="lg:col-span-1">


          <div
            className="
              bg-slate-900/80
              backdrop-blur-xl
              rounded-3xl
              border border-slate-700
              overflow-hidden
              shadow-xl
            "
          >


            {/* Profile Header */}
            <div
              className="
                bg-gradient-to-br
                from-indigo-600
                via-indigo-700
                to-purple-800
                p-6
                text-center
              "
            >

              <div className="flex justify-center">
                <Avatar profile={profile} size="md" />
              </div>


              <p
                className="
                  font-bold
                  text-white
                  mt-4
                  text-base
                "
              >
                {profile.firstName} {profile.lastName}
              </p>


              <p className="text-indigo-200 text-xs mt-1">
                {profile.email}
              </p>


            </div>


{/* Navigation */}
            <nav className="p-2">
  {TABS.map(({ key, label, icon: Icon }) => (
    <button
      key={key}
      onClick={() => {
        if (key === "wishlist") {
          navigate("/wishlist"); // ← navigate to wishlist page
        } else {
          setActiveTab(key);     // ← all other tabs stay inline
        }
      }}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors mb-0.5
        ${activeTab === key
          ? "bg-indigo-50 text-indigo-600"
          : "text-slate-600 hover:bg-slate-50"
        }`}
    >
      <Icon size={16} />
      {label}
      {/* Show badge on wishlist if items exist */}
      {key === "wishlist" && wishlist.size > 0 && (
        <span className="ml-auto bg-rose-100 text-rose-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
          {wishlist.size}
        </span>
      )}
      {activeTab === key && key !== "wishlist" && (
        <ChevronRight size={14} className="ml-auto" />
      )}
    </button>
  ))}

            

{/* Logout */}
              <div
                className="
                  border-t
                  border-slate-700
                  mt-4
                  pt-4
                "
              >

                <button
                  onClick={handleLogout}
                  className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-xl
                    text-sm
                    font-semibold
                    text-red-400
                    hover:bg-red-500/10
                    transition
                  "
                >

                  <LogOut size={17} />

                  Log Out

                </button>
</div>
</nav>
</div>
</aside>

{/* Main Content */}
        <div
          className="
            lg:col-span-3
            bg-slate-900/40
            rounded-3xl
            border border-slate-800
            p-1
          "
        >
<div
            className="
              bg-slate-950/40
              rounded-3xl
              min-h-full
            "
          >


            {activeTab === "profile" && (
              <ProfileTab
                profile={profile}
                setProfile={setProfile}
              />
            )}


            {activeTab === "orders" && (
              <OrdersTab />
            )}


            {activeTab === "wishlist" && (
              <WishlistTab navigate={navigate} />
            )}


            {activeTab === "security" && (
              <SecurityTab />
            )}


            {activeTab === "notifications" && (
              <NotificationsTab />
            )}
</div>
</div>
</div>
</div>
</main>
);
}
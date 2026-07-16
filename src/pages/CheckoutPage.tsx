import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, ShieldCheck, Truck, Check,
  CreditCard, MapPin, User, Mail, Phone,
  Lock, ChevronRight,
} from "lucide-react";
import { useStore } from "../context/CartContext";
import { formatPrice } from "../utils/format";
import Button from "../components/common/Button";

// ─── Types ───────────────────────────────────────────────────────────────────
interface AddressForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface PaymentForm {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

type Step = "address" | "payment" | "review" | "success";

// ─── Helpers ─────────────────────────────────────────────────────────────────
const formatCard = (val: string) =>
  val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

const formatExpiry = (val: string) => {
  const digits = val.replace(/\D/g, "").slice(0, 4);
  return digits.length >= 3 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
};

// ─── Sub-components ──────────────────────────────────────────────────────────
function StepIndicator({ current }: { current: Step }) {
  const steps: { key: Step; label: string }[] = [
    { key: "address", label: "Address" },
    { key: "payment", label: "Payment" },
    { key: "review",  label: "Review" },
  ];
  const order: Step[] = ["address", "payment", "review", "success"];
  const currentIdx = order.indexOf(current);

  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {steps.map((s, i) => {
        const idx = order.indexOf(s.key);
        const done    = currentIdx > idx;
        const active  = currentIdx === idx;
        return (
          <React.Fragment key={s.key}>
            <div className="flex flex-col items-center gap-1.5">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all
                ${done   ? "bg-emerald-500 text-white" :
                  active ? "bg-indigo-600 text-white ring-4 ring-indigo-100" :
                           "bg-slate-100 text-slate-400"}`}>
                {done ? <Check size={16} /> : i + 1}
              </div>
              <span className={`text-xs font-semibold ${active ? "text-indigo-600" : done ? "text-emerald-600" : "text-slate-400"}`}>
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-20 h-0.5 mb-5 transition-colors ${currentIdx > idx ? "bg-emerald-400" : "bg-slate-200"}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function InputField({
  label, icon: Icon, error, ...props
}: {
  label: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1.5">{label}</label>
      <div className={`flex items-center gap-2 border rounded-xl px-3.5 py-2.5 transition-colors
        ${error ? "border-red-400 bg-red-50" : "border-slate-200 bg-white focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100"}`}>
        {Icon && <Icon size={16} className="text-slate-400 shrink-0" />}
        <input
          className="flex-1 outline-none text-sm text-slate-900 bg-transparent placeholder:text-slate-400"
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function SectionCard({ title, icon: Icon, children }: {
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <div className="flex items-center gap-2.5 px-6 py-4 border-b border-slate-100 bg-slate-50">
        <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
          <Icon size={16} className="text-white" />
        </span>
        <h2 className="font-bold text-slate-900 text-sm">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

// ─── Order Summary sidebar ────────────────────────────────────────────────────
function OrderSummary({
  subtotal,
  delivery,
  total,
}: {
  subtotal: number;
  delivery: number;
  total: number;
}) {
  const { cart } = useStore();

  return (
    <div className="sticky top-24 overflow-hidden rounded-3xl bg-black border border-slate-800 shadow-2xl h-fit">

      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-800 bg-gradient-to-r from-slate-900 to-black">
        <h2 className="text-xl font-bold text-white">
          Order Summary
        </h2>

        <p className="text-sm text-slate-400 mt-1">
          Review your order before checkout
        </p>
      </div>

      {/* Products */}
      <div className="p-5 space-y-4 max-h-72 overflow-y-auto">

        {cart.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center gap-4 bg-slate-900 rounded-2xl p-3 border border-slate-800 hover:border-indigo-500 transition duration-300"
          >
            <div className="relative">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-16 h-16 rounded-xl object-cover"
              />

              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shadow-lg">
                {item.qty}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white truncate">
                {item.product.name}
              </p>

              <p className="text-sm text-slate-400">
                {item.product.brand}
              </p>
            </div>

            <p className="font-bold text-indigo-400">
              {formatPrice(item.product.price * item.qty)}
            </p>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="border-t border-slate-800 p-6 space-y-4">

        <div className="flex justify-between text-slate-300">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between text-slate-300">
          <span>Delivery</span>

          <span
            className={
              delivery === 0
                ? "text-green-400 font-semibold"
                : "text-white"
            }
          >
            {delivery === 0
              ? "FREE"
              : formatPrice(delivery)}
          </span>
        </div>

        <div className="flex justify-between text-slate-300">
          <span>Tax (8%)</span>

          <span>{formatPrice(Math.round(subtotal * 0.08))}</span>
        </div>

        <div className="border-t border-slate-700 pt-4 flex justify-between text-xl font-bold">

          <span className="text-white">
            Total
          </span>

          <span className="text-indigo-400">
            {formatPrice(total)}
          </span>

        </div>

      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 bg-slate-950 p-6 space-y-4">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
            <ShieldCheck
              size={18}
              className="text-green-400"
            />
          </div>

          <div>
            <p className="text-white text-sm font-semibold">
              Secure Checkout
            </p>

            <p className="text-slate-400 text-xs">
              SSL encrypted payment protection
            </p>
          </div>

        </div>

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
            <Truck
              size={18}
              className="text-indigo-400"
            />
          </div>

          <div>
            <p className="text-white text-sm font-semibold">
              Fast Delivery
            </p>

            <p className="text-slate-400 text-xs">
              Free shipping on orders above $500
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

// ─── ADDRESS STEP ─────────────────────────────────────────────────────────────
function AddressStep({
  form, setForm, onNext,
}: {
  form: AddressForm;
  setForm: React.Dispatch<React.SetStateAction<AddressForm>>;
  onNext: () => void;
}) {
  const [errors, setErrors] = useState<Partial<AddressForm>>({});

  const upd = (k: keyof AddressForm, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e: Partial<AddressForm> = {};
    if (!form.firstName) e.firstName = "Required";
    if (!form.lastName)  e.lastName  = "Required";
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Valid email required";
    if (!form.phone)  e.phone   = "Required";
    if (!form.address) e.address = "Required";
    if (!form.city)   e.city    = "Required";
    if (!form.state)  e.state   = "Required";
    if (!form.zip)    e.zip     = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onNext();
  };

  return (
  <form onSubmit={submit}>
    <SectionCard title="Delivery Address" icon={MapPin}>
      <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-black border border-slate-800 shadow-2xl p-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <InputField
            label="First Name"
            icon={User}
            value={form.firstName}
            onChange={(e) => upd("firstName", e.target.value)}
            placeholder="John"
            error={errors.firstName}
          />

          <InputField
            label="Last Name"
            value={form.lastName}
            onChange={(e) => upd("lastName", e.target.value)}
            placeholder="Smith"
            error={errors.lastName}
          />

          <InputField
            label="Email Address"
            icon={Mail}
            type="email"
            value={form.email}
            onChange={(e) => upd("email", e.target.value)}
            placeholder="john@example.com"
            error={errors.email}
            className="md:col-span-2"
          />

          <InputField
            label="Phone Number"
            icon={Phone}
            type="tel"
            value={form.phone}
            onChange={(e) => upd("phone", e.target.value)}
            placeholder="+1 (555) 000-0000"
            error={errors.phone}
            className="md:col-span-2"
          />

          <InputField
            label="Street Address"
            icon={MapPin}
            value={form.address}
            onChange={(e) => upd("address", e.target.value)}
            placeholder="128 Market Street"
            error={errors.address}
            className="md:col-span-2"
          />

          <InputField
            label="City"
            value={form.city}
            onChange={(e) => upd("city", e.target.value)}
            placeholder="San Francisco"
            error={errors.city}
          />

          <InputField
            label="State"
            value={form.state}
            onChange={(e) => upd("state", e.target.value)}
            placeholder="California"
            error={errors.state}
          />

          <InputField
            label="ZIP Code"
            value={form.zip}
            onChange={(e) => upd("zip", e.target.value)}
            placeholder="94105"
            error={errors.zip}
          />

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Country
            </label>

            <select
              value={form.country}
              onChange={(e) => upd("country", e.target.value)}
              className="
                w-full
                rounded-xl
                border
                border-slate-700
                bg-slate-900
                text-white
                px-4
                py-3
                outline-none
                transition
                focus:border-indigo-500
                focus:ring-2
                focus:ring-indigo-500/30
              "
            >
              {[
                "United States",
                "Canada",
                "United Kingdom",
                "Australia",
                "India",
                "Germany",
                "France",
                "Sri Lanka",
                "Japan",
                "China",
                "Brazil",
              ].map((c) => (
                <option
                  key={c}
                  value={c}
                  className="bg-slate-900 text-white"
                >
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Delivery Options */}

        <div className="mt-8 rounded-2xl bg-slate-900 border border-slate-700 p-6">

          <h3 className="text-white text-lg font-bold mb-1">
            Delivery Options
          </h3>

          <p className="text-slate-400 text-sm mb-5">
            Select your preferred shipping method.
          </p>

          <div className="space-y-4">

            {[
              {
                label: "Standard Delivery",
                days: "5–7 Business Days",
                price: "Free",
              },
              {
                label: "Express Delivery",
                days: "2–3 Business Days",
                price: "$15",
              },
              {
                label: "Next Day Delivery",
                days: "Within 24 Hours",
                price: "$25",
              },
            ].map((opt, i) => (

              <label
                key={i}
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                  rounded-xl
                  border
                  border-slate-700
                  bg-slate-950
                  px-5
                  py-4
                  cursor-pointer
                  transition
                  hover:border-indigo-500
                  hover:bg-slate-900
                "
              >

                <div className="flex items-center gap-4">

                  <input
                    type="radio"
                    name="delivery"
                    defaultChecked={i === 0}
                    className="accent-indigo-500"
                  />

                  <div>

                    <p className="font-semibold text-white">
                      {opt.label}
                    </p>

                    <p className="text-sm text-slate-400">
                      {opt.days}
                    </p>

                  </div>

                </div>

                <span
                  className={`font-bold text-lg ${
                    opt.price === "Free"
                      ? "text-green-400"
                      : "text-indigo-400"
                  }`}
                >
                  {opt.price}
                </span>

              </label>

            ))}

          </div>

        </div>

      </div>
    </SectionCard>

    <div className="mt-8">
      <Button
        type="submit"
        className="
          w-full
          h-14
          rounded-2xl
          bg-gradient-to-r
          from-indigo-600
          via-violet-600
          to-blue-600
          hover:from-indigo-500
          hover:to-blue-500
          text-white
          font-semibold
          text-base
          shadow-xl
          transition-all
          duration-300
          hover:scale-[1.02]
        "
      >
        Continue to Payment
        <ChevronRight size={18} />
      </Button>
    </div>
  </form>
);
}

// ─── PAYMENT STEP ─────────────────────────────────────────────────────────────
function PaymentStep({
  form, setForm, onNext, onBack,
}: {
  form: PaymentForm;
  setForm: React.Dispatch<React.SetStateAction<PaymentForm>>;
  onNext: () => void;
  onBack: () => void;
}) {
  const [errors, setErrors] = useState<Partial<PaymentForm>>({});
  const [method, setMethod] = useState<"card" | "paypal" | "googlepay">("card");

  const upd = (k: keyof PaymentForm, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    if (method !== "card") { onNext(); return; }
    const e: Partial<PaymentForm> = {};
    if (!form.cardName)   e.cardName   = "Required";
    if (form.cardNumber.replace(/\s/g, "").length < 16) e.cardNumber = "Enter a valid 16-digit card number";
    if (!form.expiry || form.expiry.length < 5)         e.expiry     = "Enter MM/YY";
    if (!form.cvv || form.cvv.length < 3)               e.cvv        = "Enter 3-digit CVV";
    setErrors(e);
    if (Object.keys(e).length === 0) onNext();
  };

  const submit = (e: React.FormEvent) => { e.preventDefault(); validate(); };

  return (
  <form onSubmit={submit} className="bg-slate-950 p-6 rounded-3xl shadow-xl">

    <SectionCard title="Payment Method" icon={CreditCard}>

      {/* Payment Tabs */}
      <div className="flex gap-3 mb-6">
        {([
          { key: "card", label: "Credit / Debit Card" },
          { key: "paypal", label: "PayPal" },
          { key: "googlepay", label: "Google Pay" },
        ] as const).map((m) => (

          <button
            key={m.key}
            type="button"
            onClick={() => setMethod(m.key)}
            className={`
              flex-1 py-3 px-4 rounded-xl
              text-xs font-semibold
              transition-all duration-300
              border
              ${
                method === m.key
                  ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30"
                  : "bg-slate-900 border-slate-700 text-slate-300 hover:border-indigo-500 hover:text-white"
              }
            `}
          >
            {m.label}
          </button>

        ))}
      </div>


      {/* Card Payment */}
      {method === "card" && (

        <div className="space-y-5">


          {/* Credit Card Preview */}
          <div
            className="
              relative overflow-hidden
              bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-900
              rounded-3xl p-6
              text-white
              shadow-xl shadow-indigo-900/40
            "
          >

            <div className="absolute top-4 right-5 text-3xl font-black opacity-20">
              VISA
            </div>


            <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-white/10"/>
            <div className="absolute -right-5 -bottom-5 w-24 h-24 rounded-full bg-white/10"/>


            <p className="text-xs text-indigo-200 mb-3">
              Card Number
            </p>

            <p className="font-mono text-xl tracking-[0.25em] mb-6">
              {form.cardNumber || "•••• •••• •••• ••••"}
            </p>


            <div className="flex justify-between">

              <div>
                <p className="text-xs text-indigo-200">
                  Card Holder
                </p>

                <p className="font-semibold">
                  {form.cardName || "YOUR NAME"}
                </p>
              </div>


              <div className="text-right">

                <p className="text-xs text-indigo-200">
                  Expires
                </p>

                <p className="font-semibold">
                  {form.expiry || "MM/YY"}
                </p>

              </div>

            </div>

          </div>



          {/* Inputs */}
          <InputField
            label="Name on card"
            icon={User}
            value={form.cardName}
            onChange={(e) => upd("cardName", e.target.value)}
            placeholder="John Smith"
            error={errors.cardName}
          />


          <InputField
            label="Card number"
            icon={CreditCard}
            value={form.cardNumber}
            onChange={(e) => upd("cardNumber", formatCard(e.target.value))}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            error={errors.cardNumber}
          />


          <div className="grid grid-cols-2 gap-4">

            <InputField
              label="Expiry Date"
              value={form.expiry}
              onChange={(e) => upd("expiry", formatExpiry(e.target.value))}
              placeholder="MM/YY"
              maxLength={5}
              error={errors.expiry}
            />


            <InputField
              label="CVV"
              icon={Lock}
              type="password"
              value={form.cvv}
              onChange={(e) =>
                upd(
                  "cvv",
                  e.target.value.replace(/\D/g, "").slice(0,4)
                )
              }
              placeholder="•••"
              maxLength={4}
              error={errors.cvv}
            />

          </div>



          <label
            className="
              flex items-center gap-3
              p-3 rounded-xl
              bg-slate-900
              border border-slate-700
              text-sm text-slate-300
              cursor-pointer
            "
          >

            <input
              type="checkbox"
              className="accent-indigo-600 w-4 h-4"
            />

            Save this card for future purchases

          </label>


        </div>

      )}



      {/* Paypal */}
      {method === "paypal" && (

        <div className="text-center py-10">

          <div
            className="
              w-20 h-20 rounded-3xl
              bg-blue-500/10
              flex items-center justify-center
              mx-auto mb-4
              border border-blue-500/20
            "
          >

            <span className="text-4xl font-black text-blue-400">
              P
            </span>

          </div>


          <p className="text-slate-300 text-sm">
            You will be redirected to PayPal to complete your payment securely.
          </p>

        </div>

      )}



      {/* Google Pay */}
      {method === "googlepay" && (

        <div className="text-center py-10">

          <div
            className="
              w-20 h-20 rounded-3xl
              bg-slate-800
              flex items-center justify-center
              mx-auto mb-4
              border border-slate-700
            "
          >

            <span className="font-bold text-lg text-white">
              G Pay
            </span>

          </div>


          <p className="text-slate-300 text-sm">
            You will be redirected to Google Pay to complete your payment securely.
          </p>


        </div>

      )}



      {/* Security */}
      <div
        className="
          flex items-center gap-3
          mt-6 p-4
          bg-emerald-500/10
          rounded-xl
          border border-emerald-500/20
        "
      >

        <Lock
          size={15}
          className="text-emerald-400"
        />


        <p className="text-xs text-slate-300">
          Your payment details are protected with 256-bit SSL encryption.
        </p>

      </div>


    </SectionCard>



    {/* Buttons */}
    <div className="mt-6 flex gap-3">


      <Button
        type="button"
        variant="ghost"
        className="
          border border-slate-700
          text-slate-300
          hover:bg-slate-800
        "
        onClick={onBack}
      >

        <ArrowLeft size={15}/>
        Back

      </Button>



      <Button
        type="submit"
        className="
          flex-1
          bg-indigo-600
          hover:bg-indigo-500
          shadow-lg shadow-indigo-600/30
        "
      >

        Review Order
        <ChevronRight size={16}/>

      </Button>


    </div>


  </form>
);
}
    

// ─── REVIEW STEP ─────────────────────────────────────────────────────────────
function ReviewStep({
  address, payment, total, onBack, onPlace,
}: {
  address: AddressForm;
  payment: PaymentForm;
  total: number;
  onBack: () => void;
  onPlace: () => void;
}) {
  const { cart } = useStore();
  const [loading, setLoading] = useState(false);

  const place = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); onPlace(); }, 1500);
  };

  return (
    
  <div className="space-y-5 bg-slate-950 p-6 rounded-3xl shadow-xl">

    {/* Delivery Address */}
    <SectionCard title="Delivery Address" icon={MapPin}>

      <div className="
        p-4 rounded-2xl
        bg-slate-900
        border border-slate-700
      ">

        <p className="font-semibold text-white text-sm">
          {address.firstName} {address.lastName}
        </p>

        <p className="text-sm text-slate-400 mt-2">
          {address.address}, {address.city}, {address.state} {address.zip}
        </p>

        <p className="text-sm text-slate-400">
          {address.country}
        </p>

        <div className="mt-3 pt-3 border-t border-slate-700">

          <p className="text-sm text-slate-300">
            {address.email}
          </p>

          <p className="text-sm text-slate-300">
            {address.phone}
          </p>

        </div>

      </div>

    </SectionCard>



    {/* Payment Method */}
    <SectionCard title="Payment Method" icon={CreditCard}>

      {payment.cardNumber ? (

        <div className="
          flex items-center gap-4
          p-4 rounded-2xl
          bg-gradient-to-r from-indigo-600 to-purple-700
          text-white
          shadow-lg shadow-indigo-900/40
        ">

          <div className="
            w-12 h-8
            bg-white/20
            rounded-lg
            flex items-center justify-center
          ">
            <span className="text-xs font-bold">
              VISA
            </span>
          </div>


          <div>

            <p className="font-semibold text-sm tracking-wider">
              •••• •••• •••• {payment.cardNumber.replace(/\s/g, "").slice(-4)}
            </p>


            <p className="text-xs text-indigo-200 mt-1">
              {payment.cardName} · Expires {payment.expiry}
            </p>


          </div>


        </div>


      ) : (

        <div className="
          p-4 rounded-2xl
          bg-slate-900
          border border-slate-700
        ">

          <p className="text-sm text-slate-300">
            PayPal / Google Pay
          </p>

        </div>

      )}

    </SectionCard>




    {/* Items Ordered */}
    <SectionCard title="Items Ordered" icon={Truck}>

      <div className="space-y-3">


        {cart.map((item) => (

          <div
            key={item.product.id}
            className="
              flex items-center gap-4
              p-3 rounded-2xl
              bg-slate-900
              border border-slate-700
              hover:border-indigo-500
              transition
            "
          >


            <img
              src={item.product.image}
              alt={item.product.name}
              className="
                w-16 h-16
                rounded-xl
                object-cover
                border border-slate-700
              "
            />


            <div className="flex-1 min-w-0">

              <p className="
                text-sm
                font-semibold
                text-white
                truncate
              ">
                {item.product.name}
              </p>


              <p className="
                text-xs
                text-slate-400
                mt-1
              ">
                Quantity: {item.qty}
              </p>


            </div>



            <p className="
              font-bold
              text-white
              text-sm
            ">
              {formatPrice(item.product.price * item.qty)}
            </p>


          </div>


        ))}


      </div>


    </SectionCard>




    {/* Action Buttons */}
    <div className="flex gap-3 mt-6">


      <Button
        variant="ghost"
        className="
          border border-slate-700
          text-slate-300
          hover:bg-slate-800
        "
        onClick={onBack}
      >

        <ArrowLeft size={15}/>
        Back

      </Button>




      <Button
        className="
          flex-1
          bg-indigo-600
          hover:bg-indigo-500
          shadow-lg
          shadow-indigo-600/30
        "
        onClick={place}
        disabled={loading}
      >

        {loading ? (

          <span className="flex items-center gap-2">

            <svg
              className="animate-spin w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
            >

              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />

              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />

            </svg>

            Placing order...

          </span>


        ) : (

          <>
            Place Order · {formatPrice(total)}
            <Lock size={14}/>
          </>

        )}

      </Button>


    </div>


  </div>
);
}

// ─── SUCCESS STATE ────────────────────────────────────────────────────────────
function SuccessView({ orderId, navigate }: { orderId: string; navigate: (path: string) => void }) {
  return (
    
  <div className="
    min-h-[500px]
    max-w-md
    mx-auto
    text-center
    py-12
    px-6
    bg-slate-950
    rounded-3xl
    shadow-2xl
  ">


    {/* Success Icon */}
    <div
      className="
        w-28 h-28
        rounded-full
        bg-emerald-500/10
        border border-emerald-500/20
        flex items-center justify-center
        mx-auto mb-7
        shadow-lg shadow-emerald-500/10
      "
    >

      <div
        className="
          w-20 h-20
          rounded-full
          bg-emerald-500/20
          flex items-center justify-center
        "
      >

        <Check
          size={44}
          className="text-emerald-400"
          strokeWidth={2.5}
        />

      </div>

    </div>



    {/* Heading */}
    <h1 className="
      text-3xl
      font-extrabold
      text-white
      mb-3
    ">
      Order Confirmed!
    </h1>


    <p className="
      text-slate-400
      mb-2
    ">
      Thank you for your purchase.
    </p>


    <p className="
      text-sm
      text-indigo-400
      font-semibold
      mb-8
    ">
      Order #{orderId}
    </p>




    {/* Information Card */}
    <div
      className="
        bg-slate-900
        rounded-2xl
        border border-slate-700
        p-5
        text-left
        space-y-4
        mb-8
      "
    >

      {[
        {
          icon: Mail,
          label: "Confirmation sent to your email"
        },
        {
          icon: Truck,
          label: "Estimated delivery: 5–7 business days"
        },
        {
          icon: ShieldCheck,
          label: "Covered by ElectroMart buyer protection"
        },

      ].map(({ icon: Icon, label }) => (

        <div
          key={label}
          className="
            flex
            items-center
            gap-4
            p-3
            rounded-xl
            bg-slate-800/70
            border border-slate-700
          "
        >

          <span
            className="
              w-10 h-10
              rounded-xl
              bg-indigo-500/10
              border border-indigo-500/20
              flex items-center justify-center
              shrink-0
            "
          >

            <Icon
              size={18}
              className="text-indigo-400"
            />

          </span>


          <p className="
            text-sm
            text-slate-300
          ">
            {label}
          </p>


        </div>

      ))}

    </div>




    {/* Buttons */}
    <div className="flex gap-3">


      <Button
        variant="outline"
        className="
          flex-1
          border-slate-700
          text-slate-200
          hover:bg-slate-800
        "
        onClick={() => navigate("/products")}
      >

        Continue Shopping

      </Button>



      <Button
        className="
          flex-1
          bg-indigo-600
          hover:bg-indigo-500
          shadow-lg
          shadow-indigo-600/30
        "
        onClick={() => navigate("/")}
      >

        Back to Home

      </Button>


    </div>


  </div>
);
}
// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, cartSubtotal, clearCart } = useStore();

  const [step, setStep] = useState<Step>("address");
  const [orderId, setOrderId] = useState("");

  const [address, setAddress] = useState<AddressForm>({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "", zip: "", country: "United States",
  });

  const [payment, setPayment] = useState<PaymentForm>({
    cardName: "", cardNumber: "", expiry: "", cvv: "",
  });

  const delivery = cartSubtotal >= 500 ? 0 : 15;
  const tax      = Math.round(cartSubtotal * 0.08);
  const total    = cartSubtotal + delivery + tax;

  if (cart.length === 0 && step !== "success") {
    navigate("/cart");
    return null;
  }

  const placeOrder = () => {
    const id = `EM-${Date.now().toString().slice(-6)}`;
    setOrderId(id);
    clearCart();
    setStep("success");
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


      {step !== "success" && (

        <>

          {/* Back Button */}
          <button
            onClick={() => navigate("/cart")}
            className="
              flex items-center gap-2
              text-sm font-semibold
              text-indigo-400
              mb-6
              hover:text-indigo-300
              transition
            "
          >

            <ArrowLeft size={16} />

            Back to Cart

          </button>



          {/* Header */}
          <div className="mb-8">

            <h1
              className="
                text-3xl
                font-extrabold
                text-white
                mb-2
              "
            >
              Checkout
            </h1>


            <p className="text-slate-400 text-sm">
              Complete your order securely and quickly
            </p>


          </div>



          {/* Step Indicator Card */}
          <div
            className="
              bg-slate-900/70
              backdrop-blur
              rounded-2xl
              border border-slate-700
              p-5
              mb-8
            "
          >

            <StepIndicator current={step} />

          </div>


        </>

      )}





      {step === "success" ? (

        <div
          className="
            flex
            justify-center
            items-center
          "
        >

          <SuccessView
            orderId={orderId}
            navigate={navigate}
          />

        </div>


      ) : (


        <div
          className="
            grid
            lg:grid-cols-3
            gap-8
            items-start
          "
        >


          {/* Main Content */}
          <div
            className="
              lg:col-span-2
              bg-slate-900/40
              rounded-3xl
              border border-slate-800
              p-1
            "
          >


            {step === "address" && (

              <AddressStep
                form={address}
                setForm={setAddress}
                onNext={() => setStep("payment")}
              />

            )}



            {step === "payment" && (

              <PaymentStep
                form={payment}
                setForm={setPayment}
                onNext={() => setStep("review")}
                onBack={() => setStep("address")}
              />

            )}
{step === "review" && (

              <ReviewStep
                address={address}
                payment={payment}
                total={total}
                onBack={() => setStep("payment")}
                onPlace={placeOrder}
              />
            )}
</div>
{/* Order Summary */}
          <div
            className="
              lg:col-span-1
              sticky
              top-6
            "
          >
<OrderSummary
subtotal={cartSubtotal}
delivery={delivery}
total={total}
/>
</div>
</div>


)}
</div>
</main>
);
    
}
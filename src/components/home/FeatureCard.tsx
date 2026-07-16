import React from "react";

interface Props {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  desc: string;
}

export default function FeatureCard({ icon: Icon, title, desc }: Props) {
  return (
    <div
      className="
        group relative
        bg-white/80
        backdrop-blur-lg
        border border-slate-200
        rounded-3xl
        p-7
        text-center
        shadow-sm
        hover:shadow-2xl
        hover:-translate-y-2
        hover:border-indigo-300
        transition-all
        duration-500
        overflow-hidden
      "
    >
      {/* Background Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-cyan-50 opacity-0 group-hover:opacity-100 transition duration-500"></div>

      {/* Icon */}
      <div
        className="
          relative
          w-16 h-16
          mx-auto mb-5
          rounded-2xl
          bg-gradient-to-r from-indigo-500 to-cyan-500
          flex items-center justify-center
          text-white
          shadow-lg
          group-hover:scale-110
          group-hover:rotate-6
          transition-all
          duration-500
        "
      >
        <Icon size={26} />
      </div>

      {/* Title */}
      <h3
        className="
          relative
          font-bold
          text-lg
          text-slate-800
          mb-2
          group-hover:text-indigo-600
          transition
        "
      >
        {title}
      </h3>

      {/* Description */}
      <p className="relative text-sm text-slate-500 leading-6">
        {desc}
      </p>

      {/* Bottom Animated Line */}
      <div
        className="
          absolute bottom-0 left-0
          h-1 w-0
          bg-gradient-to-r from-indigo-500 to-cyan-500
          group-hover:w-full
          transition-all
          duration-500
        "
      ></div>
    </div>
  );
}
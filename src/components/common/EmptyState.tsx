import React from "react";
import Button from "./Button";

interface Props {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({ icon: Icon, title, message, actionLabel, onAction }: Props) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center mb-5">
        <Icon size={36} className="text-indigo-400" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 mb-6 max-w-sm">{message}</p>
      {actionLabel && <Button onClick={onAction}>{actionLabel}</Button>}
    </div>
  );
}
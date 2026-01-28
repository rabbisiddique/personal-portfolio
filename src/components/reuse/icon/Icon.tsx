"use client";
import * as Icons from "lucide-react";
import React from "react";

interface IconProps {
  name: string;
  className?: string;
  size?: number;
  strokeWidth?: number;
}

const Icon: React.FC<IconProps> = ({
  name,
  className,
  size = 20,
  strokeWidth = 2,
}) => {
  const LucideIcon = (Icons as any)[name];
  if (!LucideIcon) {
    // Fallback icon if name is invalid
    return (
      <Icons.HelpCircle
        className={className}
        size={size}
        strokeWidth={strokeWidth}
      />
    );
  }
  return (
    <LucideIcon className={className} size={size} strokeWidth={strokeWidth} />
  );
};

export default Icon;

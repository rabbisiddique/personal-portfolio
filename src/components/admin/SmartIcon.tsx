import * as LucideIcons from "lucide-react";
import { LucideProps } from "lucide-react";
import React from "react";

interface SmartIconProps extends LucideProps {
  icon: string;
  className?: string;
}

const SmartIcon: React.FC<SmartIconProps> = ({ icon, className, ...props }) => {
  if (!icon) return <LucideIcons.Box className={className} {...props} />;

  // Try to find Lucide Icon by name
  const IconComponent = (
    LucideIcons as unknown as Record<string, React.ComponentType<LucideProps>>
  )[icon];

  if (IconComponent) {
    return <IconComponent className={className} {...props} />;
  }

  // Fallback to a default icon if name not found
  return <LucideIcons.Box className={className} {...props} />;
};

export default SmartIcon;

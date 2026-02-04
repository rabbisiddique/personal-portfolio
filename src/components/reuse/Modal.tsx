import * as DialogPrimitive from "@radix-ui/react-dialog";
import { clsx, type ClassValue } from "clsx";
import { X } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

/** Utility for Tailwind classes merging */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl";
}

const MAX_WIDTH_MAP: Record<NonNullable<ModalProps["maxWidth"]>, string> = {
  sm: "sm:max-w-[425px]",
  md: "sm:max-w-[550px]",
  lg: "sm:max-w-[650px]",
  xl: "sm:max-w-[750px]",
  "2xl": "sm:max-w-[850px]",
  "4xl": "sm:max-w-[1100px]",
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "2xl",
}) => {
  return (
    <DialogPrimitive.Root
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogPrimitive.Portal>
        {/* Backdrop overlay */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-[9998] bg-slate-950/50 dark:bg-black/80 backdrop-blur-sm data-[state=open]:animate-overlay-show" />

        {/* Content Container */}
        <DialogPrimitive.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-[9999] grid w-full translate-x-[-50%] translate-y-[-50%] gap-0",
            "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800",
            "shadow-2xl duration-200 data-[state=open]:animate-content-show rounded-[1.5rem] sm:rounded-[2rem]",
            "max-h-[92vh] flex flex-col overflow-hidden transition-colors",
            MAX_WIDTH_MAP[maxWidth],
          )}
        >
          {/* Header */}
          <div className="flex flex-col space-y-1.5 p-6 sm:p-8 border-b border-slate-100 dark:border-slate-800/50 flex-shrink-0">
            <div className="flex items-center justify-between">
              <DialogPrimitive.Title className="text-xl font-bold leading-none tracking-tight text-slate-900 dark:text-white">
                {title}
              </DialogPrimitive.Title>
              <DialogPrimitive.Close className="rounded-full p-2 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </DialogPrimitive.Close>
            </div>
          </div>

          {/* Body with specialized scrolling */}
          <div className="flex-1 overflow-y-auto scrollbar-modern p-6 sm:p-8 space-y-4 min-h-0">
            {children}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default Modal;

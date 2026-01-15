"use client";

export const ExpandableContent = ({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div
      className="overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{
        maxHeight: isOpen ? "420px" : "0px",
        opacity: isOpen ? 1 : 0,
      }}
    >
      <div
        className={`transition-transform duration-700 ${
          isOpen ? "translate-y-0" : "-translate-y-2"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

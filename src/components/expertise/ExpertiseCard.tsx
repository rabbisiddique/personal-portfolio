"use client";
import { ChevronDown } from "lucide-react";
import { ExpandableContent } from "./ExpandableContent";

export const ExpertiseCard = ({
  item,
  isExpanded,
  onToggle,
}: {
  item: any;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  return (
    <div className="relative group">
      <div className="rounded-2xl bg-card/90 backdrop-blur-xl border border-border hover:border-primary/30 p-8 flex flex-col transition-colors">
        <div className="space-y-4 flex-1">
          {/* Icon */}
          <div
            className={`inline-block p-5 rounded-2xl ${item.iconBg}`}
            style={{
              boxShadow:
                "inset 0 2px 6px rgba(255,255,255,.3), inset 0 -2px 6px rgba(0,0,0,.3)",
            }}
          >
            {item.icon}
          </div>

          {/* Content */}
          <div>
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-2xl font-bold">{item.title}</h3>
              <span
                className={`text-xs px-3 py-1 rounded-full ${item.accentColor}`}
              >
                {item.stats}
              </span>
            </div>

            <p className="text-muted-foreground">{item.description}</p>

            <ExpandableContent isOpen={isExpanded}>
              <div
                className="mt-4 pt-4 border-t border-border/50 cursor-pointer"
                onClick={onToggle}
              >
                <p className="text-sm text-foreground/80">
                  {item.fullDescription}
                </p>
              </div>
            </ExpandableContent>
          </div>
        </div>

        {/* Action */}
        <button
          onClick={onToggle}
          className="mt-4 flex items-center gap-2 text-primary font-semibold text-sm"
        >
          {isExpanded ? "Show Less" : "Read More"}
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-500 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
};

"use client";

import { useState } from "react";

interface TagsInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export function TagsInput({
  value = [],
  onChange,
  placeholder,
}: TagsInputProps) {
  const [input, setInput] = useState("");

  const addTag = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    if (value.includes(trimmed)) return;

    onChange([...value, trimmed]);
    setInput("");
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <div className="border rounded-md p-2 flex flex-wrap gap-2">
      {value.map((tag) => (
        <span
          key={tag}
          className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm cursor-pointer"
          onClick={() => removeTag(tag)}
        >
          {tag} ✕
        </span>
      ))}

      <input
        className="flex-1 outline-none"
        value={input}
        placeholder={placeholder}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addTag();
          }
        }}
      />
    </div>
  );
}

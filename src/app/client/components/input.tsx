"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function ClientInput({ placeholder }: { placeholder: string }) {
  const [value, setValue] = useState("");

  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
}

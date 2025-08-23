"use client";

// External libs
import React from "react";

// Components
import { Input } from "./input";

// DTOs
export interface MaskedInputProps
  extends Omit<React.ComponentProps<typeof Input>, "onChange"> {
  mask: (value: string) => string;
  onChange?: (value: string) => void;
}

const MaskedInput = React.forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ mask, onChange, value, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const masked = mask(e.target.value);
      onChange?.(masked);
    };

    return <Input {...props} ref={ref} value={value} onChange={handleChange} />;
  }
);

MaskedInput.displayName = "MaskedInput";

export { MaskedInput };

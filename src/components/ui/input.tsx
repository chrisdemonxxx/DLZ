import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "flex h-11 w-full rounded-md border border-border bg-surface-2 px-3 text-sm text-fg shadow-none outline-none transition-[border-color,box-shadow] duration-[var(--motion-quick)] placeholder:text-subtle focus-visible:border-border-strong focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40",
        className,
      )}
      {...props}
    />
  );
}

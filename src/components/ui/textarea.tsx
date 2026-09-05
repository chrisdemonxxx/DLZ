import * as React from "react";
import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex min-h-32 w-full rounded-md border border-border bg-surface-2 px-3 py-2 font-mono text-xs leading-relaxed text-fg outline-none transition-[border-color] duration-[var(--motion-quick)] placeholder:text-subtle focus-visible:border-border-strong focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      {...props}
    />
  );
}

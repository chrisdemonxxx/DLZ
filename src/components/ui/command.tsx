import type { ComponentProps } from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function Command({ className, ...props }: ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      className={cn("flex h-full w-full flex-col overflow-hidden rounded-md bg-surface text-fg", className)}
      {...props}
    />
  );
}

export function CommandInput({ className, ...props }: ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div className="flex items-center gap-2 border-b border-border px-3">
      <Search className="size-4 shrink-0 text-subtle" />
      <CommandPrimitive.Input
        className={cn(
          "flex h-11 w-full bg-transparent text-sm outline-none placeholder:text-subtle",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export function CommandList({ className, ...props }: ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      className={cn("max-h-72 overflow-y-auto overflow-x-hidden py-1", className)}
      {...props}
    />
  );
}

export function CommandEmpty({ className, ...props }: ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty className={cn("py-8 text-center text-sm text-muted", className)} {...props} />
  );
}

export function CommandGroup({ className, ...props }: ComponentProps<typeof CommandPrimitive.Group>) {
  return <CommandPrimitive.Group className={cn("overflow-hidden p-1", className)} {...props} />;
}

export function CommandItem({ className, ...props }: ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm outline-none data-[selected=true]:bg-surface-2 data-[selected=true]:text-fg",
        className,
      )}
      {...props}
    />
  );
}

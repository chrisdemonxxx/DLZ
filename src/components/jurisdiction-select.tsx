import { Check, ChevronsUpDown } from "lucide-react";
import { useMemo, useState } from "react";
import { JURISDICTIONS } from "@/lib/aamva";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function JurisdictionSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (code: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = useMemo(
    () => JURISDICTIONS.find((j) => j.code === value),
    [value],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          className="h-11 min-w-0 justify-between gap-3 px-3 font-normal"
          aria-label="Select jurisdiction"
        >
          <span className="flex min-w-0 items-baseline gap-2">
            <span className="font-mono text-sm font-medium tracking-wide">{selected?.code ?? "—"}</span>
            <span className="truncate text-muted">{selected?.name ?? "Jurisdiction"}</span>
          </span>
          <ChevronsUpDown className="size-4 shrink-0 text-subtle" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[min(100vw-2rem,22rem)] p-0" align="start">
        <Command>
          <CommandInput placeholder="State, IIN, or abbreviation" />
          <CommandList>
            <CommandEmpty>No jurisdiction matches.</CommandEmpty>
            <CommandGroup>
              {JURISDICTIONS.map((j) => (
                <CommandItem
                  key={j.code}
                  value={`${j.code} ${j.name} ${j.iin}`}
                  onSelect={() => {
                    onChange(j.code);
                    setOpen(false);
                  }}
                >
                  <Check className={cn("size-3.5", j.code === value ? "opacity-100" : "opacity-0")} />
                  <span className="w-8 font-mono text-xs">{j.code}</span>
                  <span className="flex-1">{j.name}</span>
                  <span className="font-mono text-[11px] text-subtle">{j.iin}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

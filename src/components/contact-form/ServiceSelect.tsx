import { useEffect, useRef, useState } from "react";
import {
  CheckIcon,
  ChevronDownIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

type ServiceSelectProps = {
  id: string;
  value: string;
  options: readonly string[];
  disabled: boolean;
  hasError: boolean;
  describedBy?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  className: string;
};

export default function ServiceSelect({
  id,
  value,
  options,
  disabled,
  hasError,
  describedBy,
  onChange,
  onBlur,
  className,
}: ServiceSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const selectedIndex = Math.max(0, options.indexOf(value));

  useEffect(() => {
    if (!isOpen) return;

    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };

    window.addEventListener("pointerdown", closeOnOutsidePointer);
    return () => window.removeEventListener("pointerdown", closeOnOutsidePointer);
  }, [isOpen]);

  const focusOption = (index: number) => {
    window.requestAnimationFrame(() => optionRefs.current[index]?.focus());
  };

  const openWithFocus = (index: number) => {
    setIsOpen(true);
    focusOption(index);
  };

  const selectOption = (option: string) => {
    onChange(option);
    setIsOpen(false);
    window.requestAnimationFrame(() => buttonRef.current?.focus());
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) onBlur();
      }}
    >
      <button
        ref={buttonRef}
        id={id}
        name="service"
        type="button"
        disabled={disabled}
        aria-invalid={hasError}
        aria-describedby={describedBy}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={`${id}-options`}
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            openWithFocus(selectedIndex);
          }

          if (event.key === "ArrowUp") {
            event.preventDefault();
            openWithFocus(options.length - 1);
          }

          if (event.key === "Escape") setIsOpen(false);
        }}
        className={`group flex min-h-[50px] w-full items-center text-left ${className} ${
          value ? "text-white" : "text-gray-500"
        }`}
      >
        <WrenchScrewdriverIcon
          aria-hidden="true"
          className="pointer-events-none absolute left-4 size-5 text-gray-600 transition-colors duration-200 group-hover:text-amber-400 group-focus-visible:text-amber-400"
        />
        <span className="min-w-0 flex-1 truncate">{value || "Изберете услуга"}</span>
        <span className={`pointer-events-none ml-3 flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] text-amber-400 transition duration-200 group-hover:border-amber-500/30 group-hover:bg-amber-500/10 group-focus-visible:border-amber-500/50 group-focus-visible:bg-amber-500/15 ${isOpen ? "rotate-180 border-amber-500/50 bg-amber-500/15" : ""}`}>
          <ChevronDownIcon className="size-4" />
        </span>
      </button>

      {isOpen && (
        <div
          id={`${id}-options`}
          role="listbox"
          aria-label="Изберете услуга"
          className="absolute z-50 mt-2 max-h-64 w-full overflow-y-auto rounded-2xl border border-white/15 bg-gray-950/95 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-xl sm:max-h-72 sm:p-2"
        >
          {options.map((option, index) => {
            const isSelected = option === value;

            return (
              <button
                key={option}
                ref={(element) => {
                  optionRefs.current[index] = element;
                }}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => selectOption(option)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    optionRefs.current[(index + 1) % options.length]?.focus();
                  }

                  if (event.key === "ArrowUp") {
                    event.preventDefault();
                    optionRefs.current[(index - 1 + options.length) % options.length]?.focus();
                  }

                  if (event.key === "Home") {
                    event.preventDefault();
                    optionRefs.current[0]?.focus();
                  }

                  if (event.key === "End") {
                    event.preventDefault();
                    optionRefs.current[options.length - 1]?.focus();
                  }

                  if (event.key === "Escape") {
                    event.preventDefault();
                    setIsOpen(false);
                    buttonRef.current?.focus();
                  }
                }}
                className={`group flex min-h-12 w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm outline-none transition sm:min-h-[52px] sm:px-4 sm:text-base ${
                  isSelected
                    ? "bg-white/[0.07] text-white"
                    : "text-gray-200 hover:bg-amber-500 hover:text-gray-950 focus:bg-amber-500 focus:text-gray-950"
                }`}
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-xs font-bold text-amber-400 transition-colors group-hover:border-gray-950/15 group-hover:bg-gray-950/10 group-hover:text-gray-950 group-focus:border-gray-950/15 group-focus:bg-gray-950/10 group-focus:text-gray-950 sm:size-8">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1 leading-5">{option}</span>
                <CheckIcon className={`size-5 shrink-0 text-amber-400 transition-colors group-hover:text-gray-950 group-focus:text-gray-950 ${isSelected ? "opacity-100" : "opacity-0"}`} />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

type ServiceNavigationDropdownProps = {
  services: Array<{
    id: string;
    title: string;
    icon: React.JSX.Element;
  }>;
};

export default function ServiceNavigationDropdown({ services }: ServiceNavigationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("pointerdown", closeOnOutsideClick);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("pointerdown", closeOnOutsideClick);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="desktop-services-menu"
        onClick={() => setIsOpen((open) => !open)}
        className="group flex items-center gap-x-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-300 transition-all duration-200 hover:bg-white/5 hover:text-white"
      >
        Услуги
        <ChevronDown
          aria-hidden="true"
          className={`size-4 text-gray-500 transition-transform duration-200 group-hover:text-amber-500 ${isOpen ? "rotate-180 text-amber-500" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          id="desktop-services-menu"
          className="absolute left-1/2 z-50 mt-4 max-h-[calc(100vh-7rem)] w-[calc(100vw-2rem)] max-w-xl -translate-x-1/2 overflow-y-auto overscroll-contain rounded-2xl border border-white/10 bg-gray-900/95 p-3 shadow-2xl shadow-black/50 backdrop-blur-xl"
        >
          {services.map((service) => (
            <Link
              key={service.id}
              to={`/services/${service.id}`}
              onClick={() => setIsOpen(false)}
              className="group flex items-center gap-x-4 rounded-xl p-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/5 focus-visible:bg-white/5"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/20 transition-all duration-200 group-hover:bg-amber-500 group-hover:text-gray-950">
                {service.icon}
              </span>
              <span className="flex-auto">{service.title}</span>
              <span aria-hidden="true" className="text-gray-600 transition-all group-hover:translate-x-1 group-hover:text-amber-500">→</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

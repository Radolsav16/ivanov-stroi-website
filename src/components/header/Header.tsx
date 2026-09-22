import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, X } from "lucide-react";
import { Link } from "react-router-dom";
import { navLinks, services } from "./data";
import HomeLink from "./components/HomeLink";
import { MobileHamburgerButton } from "./components/MobileHamburgerButton";
import ServiceNavigationDropdown from "./components/ServiceNavigationDropdown";
import Container from "../../shared/ui/Container";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleDialogKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = mobilePanelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleDialogKeyDown);

    return () => {
      window.removeEventListener("keydown", handleDialogKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  };

  return (
    <>
    <header className="sticky top-0 z-50 bg-gray-950 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <nav aria-label="Основна навигация">
        <Container className="flex items-center justify-between py-4">
          <HomeLink />
          <MobileHamburgerButton onClick={() => setMobileMenuOpen(true)} />

          <div className="hidden items-center lg:flex lg:gap-x-2">
            <ServiceNavigationDropdown services={services} />
            {navLinks.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className="group relative rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-300 transition-all duration-200 hover:bg-white/5 hover:text-white"
              >
                {item.title}
                <span className="absolute bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-amber-500 transition-all duration-300 group-hover:w-1/2" />
              </Link>
            ))}
          </div>
        </Container>
      </nav>
    </header>

      {mobileMenuOpen && createPortal(
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Мобилна навигация">
          <button
            type="button"
            aria-label="Затвори менюто"
            className="absolute inset-0 bg-black/60"
            onClick={closeMobileMenu}
          />
          <div ref={mobilePanelRef} className="absolute inset-y-0 right-0 w-full overflow-y-auto border-l border-white/10 bg-gray-950 p-6 pb-8 shadow-2xl sm:max-w-sm">
            <div className="flex items-center justify-between">
              <Link to="/" className="p-1.5" onClick={closeMobileMenu}>
                <span className="text-2xl font-extrabold uppercase tracking-[0.15em]">
                  <span className="text-amber-500">IVANOV</span>
                  <span className="text-white">STROI</span>
                </span>
              </Link>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeMobileMenu}
                aria-label="Затвори менюто"
                className="rounded-xl p-2.5 text-gray-400 transition hover:bg-white/5 hover:text-white"
              >
                <X aria-hidden="true" className="size-6" />
              </button>
            </div>

            <div className="mt-8 border-y border-white/10 py-6">
              <button
                type="button"
                aria-expanded={mobileServicesOpen}
                aria-controls="mobile-services-menu"
                onClick={() => setMobileServicesOpen((open) => !open)}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-semibold text-white"
              >
                Услуги
                <ChevronDown
                  aria-hidden="true"
                  className={`size-5 text-gray-500 transition-transform ${mobileServicesOpen ? "rotate-180 text-amber-500" : ""}`}
                />
              </button>

              {mobileServicesOpen && (
                <div id="mobile-services-menu" className="mt-2 space-y-1">
                  {services.map((item) => (
                    <Link
                      key={item.id}
                      to={`/services/${item.id}`}
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 pl-6 text-sm font-medium text-gray-400 transition hover:bg-white/5 hover:text-white"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}

              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={closeMobileMenu}
                  className="block rounded-xl px-4 py-3 text-base font-semibold text-white transition hover:bg-white/5"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}

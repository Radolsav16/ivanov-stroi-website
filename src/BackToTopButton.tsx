import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const SHOW_AFTER_SCROLL_Y = 600;

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const nextVisible = window.scrollY > SHOW_AFTER_SCROLL_Y;

      setIsVisible((currentVisible) =>
        currentVisible === nextVisible ? currentVisible : nextVisible,
      );
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Към началото на страницата"
      title="Към началото"
      className="fixed bottom-24 right-5 z-40 flex size-12 items-center justify-center rounded-full border border-white/10 bg-gray-900/90 text-amber-500 shadow-xl shadow-black/30 backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:border-amber-500/40 hover:bg-gray-900 focus-visible:outline-offset-4 sm:bottom-28 sm:right-8"
    >
      <ArrowUp aria-hidden="true" className="size-5" />
    </button>
  );
}

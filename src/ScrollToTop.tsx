

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface ScrollToTopProps {
  children: React.ReactNode;
}

const scrollToPageTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "auto",
  });
};

export default function ScrollToTop({ children }: ScrollToTopProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToPageTop();
  }, [pathname]);

  useEffect(() => {
    const handleSamePageLink = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      const link = target instanceof Element ? target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;

      const destination = new URL(link.href, window.location.href);
      const isCurrentPage =
        destination.origin === window.location.origin &&
        destination.pathname === window.location.pathname &&
        destination.search === window.location.search &&
        !destination.hash;

      if (isCurrentPage) scrollToPageTop();
    };

    document.addEventListener("click", handleSamePageLink, true);
    return () => document.removeEventListener("click", handleSamePageLink, true);
  }, []);

  return <>{children}</>;
}


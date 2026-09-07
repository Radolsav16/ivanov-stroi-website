import { type PropsWithChildren, useEffect, useRef, useState } from "react";

type DeferredSectionProps = PropsWithChildren<{
  placeholderClassName: string;
  rootMargin?: string;
}>;

const FALLBACK_RENDER_DELAY_MS = 4000;

export default function DeferredSection({
  children,
  placeholderClassName,
  rootMargin = "600px 0px",
}: DeferredSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || !("IntersectionObserver" in window)) {
      setShouldRender(true);
      return;
    }

    const renderSection = () => {
      setShouldRender(true);
      observer.disconnect();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        renderSection();
      },
      { rootMargin },
    );

    observer.observe(container);
    const fallbackTimer = window.setTimeout(
      renderSection,
      FALLBACK_RENDER_DELAY_MS,
    );

    return () => {
      window.clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, [rootMargin]);

  return (
    <div ref={containerRef}>
      {shouldRender ? children : <div aria-hidden="true" className={placeholderClassName} />}
    </div>
  );
}

import type { ComponentProps } from "react";
import { OptimizedImage } from "./OptimizedImage";

type ImageFrameProps = Omit<ComponentProps<typeof OptimizedImage>, "className"> & {
  className?: string;
  frameClassName?: string;
  imageClassName?: string;
  glowClassName?: string;
  overlayClassName?: string;
};

export default function ImageFrame({
  className = "",
  frameClassName = "",
  imageClassName = "",
  glowClassName,
  overlayClassName,
  ...imageProps
}: ImageFrameProps) {
  return (
    <div className={`relative ${className}`}>
      {glowClassName && <div aria-hidden="true" className={glowClassName} />}
      <div className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-gray-900 shadow-2xl shadow-black/40 ${frameClassName}`}>
        <OptimizedImage {...imageProps} className={imageClassName} />
        {overlayClassName && <div aria-hidden="true" className={overlayClassName} />}
      </div>
    </div>
  );
}

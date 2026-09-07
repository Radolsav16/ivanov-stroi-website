import {
  getCloudinarySrcSet,
  getCloudinaryUrl,
} from '../../utils/url';

type OptimizedImageProps = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export const OptimizedImage = ({
  url,
  alt,
  width = 1280,
  height,
  className,
  sizes = "100vw",
  priority = false,
}: OptimizedImageProps) => {
  const supportsCloudinaryTransforms = url.includes("/upload/");

  return (
    <img
      src={getCloudinaryUrl(url, { width })}
      srcSet={supportsCloudinaryTransforms ? getCloudinarySrcSet(url) : undefined}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
    />
  );
};

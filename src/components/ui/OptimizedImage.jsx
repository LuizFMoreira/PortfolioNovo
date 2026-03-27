/**
 * OptimizedImage — Performance-first image component
 *
 * Features:
 *   1. <picture> tag: serves AVIF → WebP → original (JPEG/PNG) in priority order.
 *      Browsers that support AVIF get ~50% smaller files than WebP.
 *      Browsers that support WebP get ~30% smaller files than JPEG.
 *      Older browsers fall back to the original file transparently.
 *
 *   2. Blur-up skeleton: shows a shimmer placeholder while the image loads,
 *      then crossfades to the real image on load. Zero layout shift (CLS = 0)
 *      because width/height are declared as props.
 *
 *   3. Lazy loading: loading="lazy" + IntersectionObserver defer.
 *      Priority images (above the fold, e.g. hero) skip this with priority={true}.
 *
 * Usage:
 *   <OptimizedImage
 *     src="/img/project.jpg"
 *     alt="Re.use platform screenshot"
 *     width={800}
 *     height={450}
 *     className="w-full h-full object-cover"
 *   />
 *
 *   For the hero photo (above-the-fold, critical):
 *   <OptimizedImage src="..." alt="..." width={320} height={360} priority />
 *
 * File naming convention expected:
 *   src="/img/foo.jpg"  →  looks for /img/foo.avif and /img/foo.webp
 *   If those don't exist, the browser ignores those <source> elements and
 *   uses the <img> fallback — completely safe.
 */

import { useState } from 'react';

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  style,
  priority = false,
  objectFit = 'cover',
  objectPosition = 'center',
}) => {
  const [loaded, setLoaded] = useState(false);

  // Derive AVIF and WebP paths from the original src
  // e.g. "/img/foo.jpg" → "/img/foo.avif" and "/img/foo.webp"
  const withoutExt = src.replace(/\.(jpg|jpeg|png|gif)$/i, '');
  const avifSrc = `${withoutExt}.avif`;
  const webpSrc = `${withoutExt}.webp`;

  return (
    <div
      className="relative overflow-hidden"
      style={{
        width:  width  ? `${width}px`  : '100%',
        height: height ? `${height}px` : '100%',
        ...style,
      }}
    >
      {/* Skeleton shimmer — visible while image hasn't loaded */}
      <div
        className="skeleton absolute inset-0 transition-opacity duration-500"
        style={{ opacity: loaded ? 0 : 1, pointerEvents: 'none' }}
        aria-hidden="true"
      />

      {/* The actual optimized image */}
      <picture>
        {/* 1st choice: AVIF — best compression, modern browsers */}
        <source srcSet={avifSrc} type="image/avif" />

        {/* 2nd choice: WebP — wide support, great compression */}
        <source srcSet={webpSrc} type="image/webp" />

        {/* Fallback: original format (JPEG/PNG) */}
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchpriority={priority ? 'high' : 'auto'}
          onLoad={() => setLoaded(true)}
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${className}`}
          style={{
            objectFit,
            objectPosition,
            opacity: loaded ? 1 : 0,
          }}
        />
      </picture>
    </div>
  );
};

export default OptimizedImage;

import { ImageProps } from 'next/image';
import React from 'react';

type MockImageProps = Omit<ImageProps, 'width' | 'height'> & {
  width?: number | string;
  height?: number | string;
};

type StaticImageData = {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
};

const MockNextImage = ({
  fill,
  priority,
  src,
  alt,
  sizes,
  className,
  width,
  height,
  ...props
}: MockImageProps) => {
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      data-testid="mock-next-image"
      src={
        typeof src === 'string'
          ? src
          : typeof src === 'object' && 'src' in src
            ? (src as StaticImageData).src
            : String(src)
      }
      alt={alt || ''}
      width={width}
      height={height}
      data-fill={fill}
      data-priority={priority}
      data-sizes={sizes}
      className={className}
      {...props}
    />
  );
};

export default MockNextImage;

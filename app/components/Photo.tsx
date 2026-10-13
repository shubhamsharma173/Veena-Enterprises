type Props = {
  name: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
};
export default function Photo({
  name,
  alt,
  className = "",
  sizes,
  priority = false,
}: Props) {
  return (
    <img
      className={className}
      src={`/images/${name}-960.webp`}
      srcSet={[480, 960, 1600, 2200]
        .map((w) => `/images/${name}-${w}.webp ${w}w`)
        .join(", ")}
      sizes={sizes}
      alt={alt}
      width={1600}
      height={1000}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
    />
  );
}

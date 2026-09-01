interface BrandLogoProps {
  className?: string;
}

// Geometric "ES" monogram: an E stroke and an S stroke sharing a rounded frame.
const BrandLogo = ({ className = "w-10 h-10" }: BrandLogoProps) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    role="img"
    aria-labelledby="brand-logo-title"
  >
    <title id="brand-logo-title">Emmanuel Samuel logo</title>
    <rect
      x="2"
      y="2"
      width="44"
      height="44"
      rx="14"
      className="fill-primary/10"
      stroke="currentColor"
      strokeOpacity="0.15"
      strokeWidth="1.5"
    />
    {/* E */}
    <path
      d="M23 14h-9v20h9"
      stroke="currentColor"
      strokeWidth="3.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-foreground"
    />
    <path
      d="M14 24h7.5"
      stroke="currentColor"
      strokeWidth="3.25"
      strokeLinecap="round"
      className="text-foreground"
    />
    {/* S */}
    <path
      d="M35 17.5c0-2-1.8-3.5-4-3.5s-4 1.5-4 3.5 1.8 3.5 4 3.5 4 1.5 4 3.5-1.8 3.5-4 3.5-4-1.5-4-3.5"
      stroke="currentColor"
      strokeWidth="3.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary"
    />
  </svg>
);

export default BrandLogo;

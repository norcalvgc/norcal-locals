type RumbleTitleProps = {
  children: string;
  className?: string;
};

export function RumbleTitle({ children, className = "" }: RumbleTitleProps) {
  return (
    <h1
      className={`relative inline-block text-center font-display text-4xl font-extrabold italic leading-none tracking-tight sm:text-5xl md:text-6xl ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 translate-x-[0.08em] translate-y-[0.08em] text-[#032e8f]"
      >
        {children}
      </span>
      <span className="relative text-black">{children}</span>
    </h1>
  );
}

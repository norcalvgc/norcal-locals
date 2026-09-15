const ICON_SIZE = 24;

const ICONS = {
  x: "https://cdn.jsdelivr.net/npm/simple-icons@15/icons/x.svg",
  discord: "https://cdn.jsdelivr.net/npm/simple-icons@15/icons/discord.svg",
} as const;

function SocialIcon({ src }: { src: string }) {
  return (
    // External brand SVGs from Simple Icons; brightness-0 forces a black glyph.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      width={ICON_SIZE}
      height={ICON_SIZE}
      aria-hidden
      className="block size-6 shrink-0 brightness-0"
    />
  );
}

export function SocialFooter() {
  return (
    <nav
      aria-label="Social"
      className="absolute right-4 bottom-4 z-20 flex items-center gap-6 font-mono text-lg leading-none text-black"
    >
      <a
        href="https://x.com/NorCalVGC"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 leading-none hover:underline"
      >
        <SocialIcon src={ICONS.x} />
        <span className="leading-none">@NorCalVGC</span>
      </a>
      <a
        href="https://discord.gg/YJfdjCdaT9"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 leading-none hover:underline"
      >
        <SocialIcon src={ICONS.discord} />
        <span className="leading-none">discord.gg/YJfdjCdaT9</span>
      </a>
    </nav>
  );
}

const PREVIOUS_FONT_PX = 18;
const FONT_PX = PREVIOUS_FONT_PX - 2;
const PREVIOUS_ICON_SIZE = 24;
const ICON_SIZE = (PREVIOUS_ICON_SIZE * FONT_PX) / PREVIOUS_FONT_PX;

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
      className="block shrink-0 brightness-0"
      style={{ width: ICON_SIZE, height: ICON_SIZE }}
    />
  );
}

export function SocialFooter() {
  return (
    <nav
      aria-label="Social"
      className="mt-8 flex flex-wrap items-center justify-center gap-6 font-mono text-base font-normal uppercase leading-none tracking-widest text-zinc-700"
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

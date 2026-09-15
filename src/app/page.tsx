import Image from "next/image";
import { EventList } from "@/components/event-list";
import { RumbleTitle } from "@/components/rumble-title";
import { SocialFooter } from "@/components/social-footer";
import { getEvents } from "@/lib/events";

const SPRITE_SIZE = 550;

export default function Home() {
  const { weekLabel, events } = getEvents();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Image
        src="/champions-background.png"
        alt=""
        fill
        priority
        className="object-cover object-center grayscale contrast-[1.05]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-white/90" aria-hidden />

      <main className="relative z-10 flex min-h-screen w-full flex-col items-center py-8 sm:py-10">
        <Image
          src="/logo.png"
          alt="NorCal VGC Locals logo"
          width={160}
          height={160}
          priority
          className="h-28 w-28 sm:h-36 sm:w-36"
        />

        <div className="mt-4 sm:mt-6">
          <RumbleTitle>NorCal VGC Locals</RumbleTitle>
        </div>

        <p className="mt-3 font-mono text-sm uppercase tracking-widest text-zinc-700 sm:text-base">
          {weekLabel}
        </p>

        <div className="mt-8 flex w-full flex-col items-center gap-6 md:flex-row md:items-start md:justify-between">
          <Image
            src="/baxcalibur.png"
            alt="Baxcalibur"
            width={SPRITE_SIZE}
            height={SPRITE_SIZE}
            unoptimized
            className="hidden size-[550px] max-w-none shrink-0 mix-blend-screen md:block"
          />

          <EventList events={events} />

          <Image
            src="/mega-absol-z.png"
            alt="Mega Absol Z"
            width={SPRITE_SIZE}
            height={SPRITE_SIZE}
            unoptimized
            className="hidden size-[550px] max-w-none shrink-0 mix-blend-screen md:block"
          />
        </div>
      </main>

      <SocialFooter />
    </div>
  );
}

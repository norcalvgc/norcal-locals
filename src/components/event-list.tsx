import type { LocalEvent } from "@/lib/events";

type EventListProps = {
  events: LocalEvent[];
};

export function EventList({ events }: EventListProps) {
  return (
    <ul className="w-full min-w-0 flex-1 space-y-3">
      {events.map((event) => (
        <li
          key={event.id}
          className="rounded-lg border-[1px] border-black bg-white/70 px-4 py-3 backdrop-blur-sm"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-mono text-sm font-medium text-zinc-800">
              {event.date} · {event.time}
            </p>
            <span className="rounded-full bg-[#032e8f]/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-[#032e8f]">
              {event.tournamentType}
            </span>
          </div>
          <p className="mt-1 text-base font-semibold text-zinc-900">
            {event.store} @ {event.city}
          </p>
        </li>
      ))}
    </ul>
  );
}

import type { LocalEvent, TournamentType } from "@/lib/events";

type EventListProps = {
  events: LocalEvent[];
};

const PILL_CLASS: Record<TournamentType, string> = {
  "League Challenge":
    "bg-norcal-blue text-white",
  "League Cup":
    "bg-norcal-orange text-white",
};

export function EventList({ events }: EventListProps) {
  return (
    <ul className="mx-auto w-full max-w-2xl space-y-3">
      {events.map((event) => (
        <li
          key={event.id}
          className="rounded-lg border-[1px] border-black bg-white/70 px-4 py-3 backdrop-blur-sm"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-mono text-sm font-medium text-zinc-800">
              {event.time ? `${event.date} · ${event.time}` : event.date}
            </p>
            {event.tournamentType ? (
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${PILL_CLASS[event.tournamentType]}`}
              >
                {event.tournamentType}
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-base font-semibold text-zinc-900">
            {event.store} @ {event.city}
          </p>
        </li>
      ))}
    </ul>
  );
}

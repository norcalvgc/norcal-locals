export type TournamentType = "League Challenge" | "League Cup";

export type LocalEvent = {
  id: string;
  date: string;
  time: string;
  store: string;
  city: string;
  tournamentType: TournamentType | null;
};

export type EventsPayload = {
  weekLabel: string;
  events: LocalEvent[];
};

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1sdeLsO_NQ_9Vxkn8YSEwNUj5ayTCatJzjqR8Wp5zvnE/gviz/tq?tqx=out:csv";

const PACIFIC = "America/Los_Angeles";

type SheetRow = {
  event: string;
  date: string;
  startTime: string;
  location: string;
};

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
      continue;
    }
    if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      field = "";
      if (row.some((cell) => cell.length > 0)) rows.push(row);
      row = [];
    } else {
      field += c;
    }
  }
  row.push(field);
  if (row.some((cell) => cell.length > 0)) rows.push(row);
  return rows;
}

function sheetRowsToRecords(rows: string[][]): SheetRow[] {
  if (rows.length === 0) return [];
  const header = rows[0].map((h) => h.trim());
  const idx = {
    event: header.indexOf("Event"),
    date: header.indexOf("Date"),
    startTime: header.indexOf("Round 1 Start Time"),
    location: header.indexOf("Location"),
  };
  if (idx.event < 0 || idx.date < 0) return [];

  return rows.slice(1).map((cells) => ({
    event: cells[idx.event]?.trim() ?? "",
    date: cells[idx.date]?.trim() ?? "",
    startTime: idx.startTime >= 0 ? (cells[idx.startTime]?.trim() ?? "") : "",
    location: idx.location >= 0 ? (cells[idx.location]?.trim() ?? "") : "",
  }));
}

function parseSheetDate(dateStr: string): Date | null {
  const m = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return null;
  const month = Number(m[1]);
  const day = Number(m[2]);
  const year = Number(m[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  return new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
}

function pacificYmd(d: Date): { y: number; m: number; day: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: PACIFIC,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(d);
  const get = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value ?? "0");
  return { y: get("year"), m: get("month"), day: get("day") };
}

function getCurrentPacificWeekRange(): { monday: Date; sunday: Date; weekLabel: string } {
  const now = new Date();
  const { y, m, day } = pacificYmd(now);
  const noonUtc = new Date(Date.UTC(y, m - 1, day, 12, 0, 0));
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: PACIFIC,
    weekday: "short",
  }).format(noonUtc);
  const dowMap: Record<string, number> = {
    Mon: 0,
    Tue: 1,
    Wed: 2,
    Thu: 3,
    Fri: 4,
    Sat: 5,
    Sun: 6,
  };
  const offset = dowMap[weekday] ?? 0;
  const monday = new Date(noonUtc);
  monday.setUTCDate(monday.getUTCDate() - offset);
  const sunday = new Date(monday);
  sunday.setUTCDate(sunday.getUTCDate() + 6);

  const monLabel = new Intl.DateTimeFormat("en-US", {
    timeZone: PACIFIC,
    month: "long",
    day: "numeric",
  }).format(monday);

  return {
    monday,
    sunday,
    weekLabel: `week of ${monLabel}`,
  };
}

function isInPacificWeek(eventDate: Date, monday: Date, sunday: Date): boolean {
  const t = eventDate.getTime();
  return t >= monday.getTime() && t <= sunday.getTime();
}

function formatEventDate(d: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: PACIFIC,
    weekday: "short",
    month: "short",
    day: "numeric",
  })
    .format(d)
    .replace(", ", " ");
}

function parseEventName(event: string): {
  store: string;
  tournamentType: TournamentType | null;
  kind: string;
} {
  const dash = event.indexOf(" - ");
  const prefix = dash >= 0 ? event.slice(0, dash).trim() : event;
  const store = dash >= 0 ? event.slice(dash + 3).trim() : event;

  if (prefix === "VG Cup") {
    return { store, tournamentType: "League Cup", kind: "cup" };
  }
  if (prefix === "VG Challenge") {
    return { store, tournamentType: "League Challenge", kind: "challenge" };
  }
  return { store, tournamentType: null, kind: "other" };
}

function cityFromLocation(location: string): string {
  const match = location.match(/,\s*([^,]+),\s*CA\b/i);
  if (!match) return "";
  let city = match[1].trim();
  if (city.toUpperCase() === "SF") city = "San Francisco";
  return city
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function cupKey(date: Date, store: string): string {
  return `${date.getTime()}|${store.toLowerCase()}`;
}

function mapRowsToEvents(
  records: SheetRow[],
  monday: Date,
  sunday: Date,
): LocalEvent[] {
  const inWeek = records
    .map((r) => {
      const d = parseSheetDate(r.date);
      if (!d || !r.event || r.event.startsWith("Updated -")) return null;
      if (!isInPacificWeek(d, monday, sunday)) return null;
      return { ...r, parsedDate: d };
    })
    .filter((x): x is SheetRow & { parsedDate: Date } => x !== null);

  const cups = new Set<string>();
  for (const r of inWeek) {
    const { store, kind } = parseEventName(r.event);
    if (kind === "cup") cups.add(cupKey(r.parsedDate, store));
  }

  return inWeek.map((r) => {
    const { store, tournamentType, kind } = parseEventName(r.event);
    let time = r.startTime;
    if (
      kind === "challenge" &&
      !time &&
      cups.has(cupKey(r.parsedDate, store))
    ) {
      time = "Top Cut of Cup";
    }

    return {
      id: `${r.date}|${r.event}`,
      date: formatEventDate(r.parsedDate),
      time,
      store,
      city: cityFromLocation(r.location),
      tournamentType,
    };
  });
}

export async function getEvents(): Promise<EventsPayload> {
  const { monday, sunday, weekLabel } = getCurrentPacificWeekRange();

  try {
    const res = await fetch(SHEET_CSV_URL, {
      next: { revalidate: 3600 },
      headers: { "User-Agent": "NorCalVGC-Locals/1.0" },
    });
    if (!res.ok) {
      return { weekLabel, events: [] };
    }
    const text = await res.text();
    const records = sheetRowsToRecords(parseCsv(text));
    const events = mapRowsToEvents(records, monday, sunday);
    return { weekLabel, events };
  } catch {
    return { weekLabel, events: [] };
  }
}

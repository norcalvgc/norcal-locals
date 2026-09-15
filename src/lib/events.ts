export type TournamentType = "League Challenge" | "League Cup";

export type LocalEvent = {
  id: string;
  date: string;
  time: string;
  store: string;
  city: string;
  tournamentType: TournamentType;
};

export type EventsPayload = {
  weekLabel: string;
  events: LocalEvent[];
};

export function getEvents(): EventsPayload {
  return {
    weekLabel: "week of September 19",
    events: [
      {
        id: "1",
        date: "Sat Sep 19",
        time: "11:30 AM",
        store: "Legends Eastridge",
        city: "San Jose",
        tournamentType: "League Cup",
      },
      {
        id: "2",
        date: "Sat Sep 19",
        time: "Top Cut of Cup",
        store: "Legends Eastridge",
        city: "San Jose",
        tournamentType: "League Challenge",
      },
      {
        id: "3",
        date: "Sat Sep 19",
        time: "3:00 PM",
        store: "Ultimate Spice Gaming",
        city: "Sacramento",
        tournamentType: "League Challenge",
      },
      {
        id: "4",
        date: "Sun Sep 20",
        time: "1:00 PM",
        store: "Great Escape Games",
        city: "Sacramento",
        tournamentType: "League Cup",
      },
      {
        id: "5",
        date: "Sun Sep 20",
        time: "Top Cut of Cup",
        store: "Great Escape Games",
        city: "Sacramento",
        tournamentType: "League Challenge",
      },
      {
        id: "6",
        date: "Sun Sep 20",
        time: "11:00 AM",
        store: "Gamescape SF",
        city: "San Francisco",
        tournamentType: "League Challenge",
      },
    ],
  };
}

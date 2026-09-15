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
    weekLabel: "week of September 14",
    events: [
      {
        id: "1",
        date: "Sat Sep 14",
        time: "11:00 AM",
        store: "Game Kastle",
        city: "San Jose",
        tournamentType: "League Challenge",
      },
      {
        id: "2",
        date: "Sat Sep 14",
        time: "2:00 PM",
        store: "Eudemonia",
        city: "Berkeley",
        tournamentType: "League Cup",
      },
      {
        id: "3",
        date: "Sun Sep 15",
        time: "12:00 PM",
        store: "Games of Berkeley",
        city: "Berkeley",
        tournamentType: "League Challenge",
      },
      {
        id: "4",
        date: "Sun Sep 15",
        time: "3:00 PM",
        store: "Card Kingdom",
        city: "Oakland",
        tournamentType: "League Cup",
      },
    ],
  };
}

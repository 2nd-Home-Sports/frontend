export enum STEPS {
  LEAGUE = 0,
  TEAM_AREA = 1,
  TEAM = 2,
  CITY = 3,
}

export type TLeague = {
  name: string;
  image: string;
};

export type TTeam = {
  league: TLeague;
  name: string;
  area?: string;
  image: string;
};

export type TCity = {
  name: string;
  latitude: number;
  longitude: number;
};

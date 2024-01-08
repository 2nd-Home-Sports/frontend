import type {
  StrapiResponse,
  StrapiData,
  LeagueType,
  TeamType,
  ImageType,
  TeamAreaType,
} from "@/app/libs/types";

function formatImage(image?: StrapiImage): ImageType | null {
  if (!image || (image && image.data == null)) {
    return null;
  }

  return {
    url: image.data.attributes.url,
    width: image.data.attributes.width,
    height: image.data.attributes.height,
  };
}

function formatTeamArea(area?: StrapiTeamArea): TeamAreaType | null {
  if (!area || (area && area.data == null)) {
    return null;
  }

  return {
    id: area.data.attributes.id,
    name: area.data.attributes.name,
  } as TeamAreaType;
}

type StrapiImage = StrapiResponse<StrapiData<ImageType>>;
type StrapiTeamArea = StrapiResponse<StrapiData<TeamAreaType>>;

type StrapiTeam = StrapiData<
  TeamType & {
    image?: StrapiImage;
    team_area: StrapiTeamArea;
  }
>;

function formatTeam(data: StrapiTeam) {
  const image = formatImage(data.attributes.image);
  const area = formatTeamArea(data.attributes.team_area);

  const team = {
    id: data.id,
    name: data.attributes.name,
    description: data.attributes.description,
    image: image,
    teamArea: area,
  };

  return team as TeamType;
}

export async function getTeamsOfLeague(league: LeagueType) {
  const params = [
    "populate=*",
    "pagination[limit]=-1",
    `filters[league][id][$eqi]=${league.id}`,
  ];
  const url = `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL
  }/api/teams?${params.join("&")}`;
  const response = await fetch(url);
  const { data } = (await response.json()) as StrapiResponse<StrapiTeam[]>;

  if (!data) return [];
  return Promise.all(data.map(formatTeam));
}

export async function getTeamsOfTeamArea(
  league: LeagueType,
  teamArea: TeamAreaType
) {
  const params = [
    "populate=*",
    "pagination[limit]=-1",
    `filters[league][id][$eqi]=${league.id}`,
    `filters[team_area][id][$eqi]=${teamArea.id}`,
  ];
  const url = `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL
  }/api/teams?${params.join("&")}`;
  const response = await fetch(url);
  const { data } = (await response.json()) as StrapiResponse<StrapiTeam[]>;

  if (!data) return [];
  return Promise.all(data.map(formatTeam));
}

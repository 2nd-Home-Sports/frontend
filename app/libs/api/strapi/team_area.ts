import type {
  StrapiResponse,
  StrapiData,
  TeamAreaType,
} from "@/app/libs/types";

type StrapiTeamArea = StrapiData<TeamAreaType>;

function formatTeamArea(data: StrapiTeamArea) {
  const teamArea = {
    id: data.id,
    name: data.attributes.name,
  };

  return teamArea as TeamAreaType;
}

export async function getTeamAreas() {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/team-areas?populate=*`;
  const response = await fetch(url);
  const { data } = (await response.json()) as StrapiResponse<StrapiTeamArea[]>;

  if (!data) return [];
  return Promise.all(data.map(formatTeamArea));
}

import type {
  StrapiResponse,
  StrapiData,
  LeagueType,
  TeamType,
  ImageType,
  TeamAreaType,
  BarType,
  BadgeType,
  CityType,
} from "@/app/libs/types";

type StrapiImage = StrapiResponse<StrapiData<ImageType>>;
type StrapiMedia = StrapiResponse<StrapiData<ImageType>[]>;
type StrapiCity = StrapiResponse<StrapiData<CityType>>;
type StrapiBadge = StrapiData<BadgeType>;
type StrapiBar = StrapiData<
  BarType & {
    background_image?: StrapiImage;
    city: StrapiCity;
    badges: StrapiResponse<StrapiBadge[]>;
    medias: StrapiMedia;
  }
>;

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

function formatMedia(media: StrapiData<ImageType>): ImageType {
  return {
    url: media.attributes.url,
    width: media.attributes.width,
    height: media.attributes.height,
  };
}

function formatBadge(data: StrapiBadge): BadgeType {
  return {
    id: data.id,
    name: data.attributes.name,
    description: data.attributes.description,
    image: null,
  };
}

function formatCity(data: StrapiCity): CityType {
  return {
    id: data.data.id,
    name: data.data.attributes.name,
    latitude: data.data.attributes.latitude,
    longitude: data.data.attributes.longitude,
  };
}

function formatBar(data: StrapiBar, team: TeamType) {
  const backgroundImage = formatImage(data.attributes.background_image);
  const badges: BadgeType[] = [];
  data.attributes.badges &&
    data.attributes.badges.data.length > 0 &&
    data.attributes.badges.data.forEach((_badge: StrapiBadge) => {
      badges.push(formatBadge(_badge));
    });

  const medias: ImageType[] = [];
  data.attributes.medias.data &&
    data.attributes.medias.data.length > 0 &&
    data.attributes.medias.data.forEach((_media) => {
      medias.push(formatMedia(_media));
    });

  const city = formatCity(data.attributes.city);

  const bar = {
    id: data.id,
    name: data.attributes.name,
    backgroundImage,
    team,
    city,
    commentary: data.attributes.commentary,
    address: data.attributes.address,
    latitude: data.attributes.latitude,
    longitude: data.attributes.longitude,
    badges,
    medias,
  };

  return bar as BarType;
}

function formatBarOfTeam(data: StrapiBar, team: TeamType) {
  const backgroundImage = formatImage(data.attributes.background_image);
  const badges: BadgeType[] = [];
  data.attributes.badges &&
    data.attributes.badges.data.forEach((_badge: StrapiBadge) => {
      badges.push(formatBadge(_badge));
    });

  const medias: ImageType[] = [];
  data.attributes.medias.length > 0 &&
    data.attributes.medias.data.forEach((_media) => {
      medias.push(formatMedia(_media));
    });

  const city = formatCity(data.attributes.city);

  const bar = {
    id: data.id,
    name: data.attributes.name,
    backgroundImage,
    team,
    city: city,
    commentary: data.attributes.commentary,
    address: data.attributes.address,
    latitude: data.attributes.latitude,
    longitude: data.attributes.longitude,
    badges,
    medias,
  };

  return bar as BarType;
}

export async function getBars(team: TeamType, city: CityType) {
  const params = [
    "populate=*",
    "pagination[limit]=-1",
    `filters[team][id][$eqi]=${team.id}`,
  ];
  const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/bars?${params.join(
    "&"
  )}`;
  const response = await fetch(url);
  const { data } = (await response.json()) as StrapiResponse<StrapiBar[]>;

  if (!data) return [];
  return Promise.all(data.map((_data) => formatBar(_data, team)));
}

export async function getBarsOfTeam(team: TeamType) {
  const params = [
    "populate=*",
    "pagination[limit]=-1",
    `filters[team][id][$eqi]=${team.id}`,
  ];
  const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/bars?${params.join(
    "&"
  )}`;
  const response = await fetch(url);
  const { data } = (await response.json()) as StrapiResponse<StrapiBar[]>;
  if (!data) return [];
  return Promise.all(data.map((_data) => formatBarOfTeam(_data, team)));
}

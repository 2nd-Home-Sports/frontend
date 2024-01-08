import type {
  StrapiResponse,
  StrapiData,
  CityType,
  TeamType,
  BarType,
} from "@/app/libs/types";

type StrapiCity = StrapiData<CityType>;

export function formatCity(data: StrapiCity) {
  const city: CityType = {
    id: data.id,
    name: data.attributes.name,
    latitude: data.attributes.latitude,
    longitude: data.attributes.longitude,
  };

  return city;
}

export async function getCities() {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/cities?populate=*`;
  const response = await fetch(url);
  const { data } = (await response.json()) as StrapiResponse<StrapiCity[]>;

  if (!data) return [];
  return Promise.all(data.map(formatCity));
}

export async function getCitiesOfBars(bars: BarType[]) {
  const cities: CityType[] = [];
  bars.forEach((_bar) => {
    if (cities.findIndex((_city) => _city.id == _bar.city.id) < 0) {
      cities.push(_bar.city);
    }
  });

  return cities;
}

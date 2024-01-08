import type { StrapiResponse, StrapiData, LeagueType, ImageType } from "@/app/libs/types";

function formatImage(image?: StrapiImage): (ImageType | null) {
    if (!image || (image && image.data == null)) {
        return null;
    }

    return {
        url: image.data.attributes.url,
        width: image.data.attributes.width,
        height: image.data.attributes.height,
    }
}

type StrapiImage = StrapiResponse<StrapiData<ImageType>>;

type StrapiLeague = StrapiData<LeagueType & {
    image?: StrapiImage;
}>

function formatLeague(data: StrapiLeague) {
    const image = formatImage(data.attributes.image);

    const league = {
        id: data.id,
        name: data.attributes.name,
        description: data.attributes.description,
        image: image
    };

    return league as LeagueType;
}

export async function getLeagues() {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/leagues?populate=*`;
    const response = await fetch(url);
    const { data } = (await response.json()) as StrapiResponse<StrapiLeague[]>;

    if (!data) return [];
    return Promise.all(data.map(formatLeague));
}
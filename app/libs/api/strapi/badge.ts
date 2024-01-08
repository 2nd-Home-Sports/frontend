import type { StrapiResponse, StrapiData, ImageType, BadgeType } from "@/app/libs/types";

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

type StrapiBadge = StrapiData<BadgeType & {
    image?: StrapiImage;
}>

function formatBadge(data: StrapiBadge) {
    const image = formatImage(data.attributes.image);

    const badge = {
        id: data.id,
        name: data.attributes.name,
        description: data.attributes.description,
        image: image
    };

    return badge as BadgeType;
}

export async function getBadgeById(id: number) {
    const params = ["populate=*"];
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/badges/${id}?${params.join("&")}`;
    const response = await fetch(url);
    const { data } = (await response.json()) as StrapiResponse<StrapiBadge>;

    const badge = formatBadge(data)

    return badge;
}
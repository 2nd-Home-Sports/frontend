export type Image = {
    formats: {
        medium: {
            url: string;
            width: number;
            height: number;
        },
        small: {
            url: string;
            width: number;
            height: number;
        },
    },
    url: string;
    width: number;
    height: number;
};

export type ImageType = {
    url: string;
    width: number;
    height: number;
};
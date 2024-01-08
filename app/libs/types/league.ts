import  {ImageType}  from '@/app/libs/types';

export type LeagueType = {
    id: number;
    name: string;
    description: string;
    image: ImageType | null;
}

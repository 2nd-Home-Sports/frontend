import  {ImageType}  from '@/app/libs/types';

export type BadgeType = {
    id: number;
    name: string;
    description: string;
    image: ImageType | null;
}
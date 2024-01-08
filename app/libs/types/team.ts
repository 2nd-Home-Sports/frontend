import  {ImageType, LeagueType}  from '@/app/libs/types';
import { TeamAreaType } from './team_area';

export type TeamType = {
    id: number;
    name: string;
    description: string;
    image: ImageType | null;
    teamArea: TeamAreaType | null;
    league: LeagueType;
}

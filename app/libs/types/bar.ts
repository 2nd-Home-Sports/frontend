import { ImageType } from "@/app/libs/types";
import { TeamType } from "./team";
import { BadgeType } from "./badge";
import { CityType } from "./city";

export type BarType = {
  id: number;
  name: string;
  team: TeamType;
  commentary: string;
  address: string;
  backgroundImage: ImageType | null;
  latitude: number;
  longitude: number;
  medias: ImageType[];
  badges: BadgeType[];
  city: CityType;
};

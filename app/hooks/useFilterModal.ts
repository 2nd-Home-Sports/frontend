import { create } from "zustand";
import { CityType, LeagueType, TeamAreaType, TeamType } from "../libs/types";
import { STEPS } from "../types";

interface IFilterModalStore {
  isOpen: boolean;
  step: STEPS;
  league: LeagueType | null;
  teamArea: TeamAreaType | null;
  team: TeamType | null;
  city: CityType | null;
  onSetStep: (_step: STEPS) => void;
  onSetLeague: (_league: LeagueType) => void;
  onSetTeamArea: (_teamArea: TeamAreaType | null) => void;
  onSetTeam: (_team: TeamType) => void;
  onSetCity: (_city: CityType) => void;
  onOpen: () => void;
  onClose: () => void;
}

const useFilterModal = create<IFilterModalStore>((set) => ({
  isOpen: true,
  league: null,
  teamArea: null,
  team: null,
  city: null,
  step: STEPS.LEAGUE,
  onSetStep: (_step: STEPS) => set({ step: _step }),
  onSetLeague: (_league: LeagueType) => set({ league: _league }),
  onSetTeamArea: (_teamArea: TeamAreaType | null) =>
    set({ teamArea: _teamArea }),
  onSetTeam: (_team: TeamType) => set({ team: _team }),
  onSetCity: (_city: CityType) => set({ city: _city }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useFilterModal;

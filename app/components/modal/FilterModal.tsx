"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useFilterModal } from "@/app/hooks";
import { DropDown } from "@/app/components";
import { getLeagues } from "@/app/libs/api/strapi/league";
import { CityType, LeagueType, TeamAreaType, TeamType } from "@/app/libs/types";
import {
  getTeamsOfLeague,
  getTeamsOfTeamArea,
} from "@/app/libs/api/strapi/team";
import { getCities, getCitiesOfBars } from "@/app/libs/api/strapi/city";
import { getBarsOfTeam } from "@/app/libs/api/strapi/bar";
import { group } from "group-items";
import { STEPS, TTeam } from "@/app/types";
import { teamAreaImages } from "@/app/constants";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { MdRestartAlt } from "react-icons/md";
import { getTeamAreas } from "@/app/libs/api/strapi/team_area";

interface IFilterModal { }

const FilterModal: React.FC<IFilterModal> = ({ }) => {
  const [leagues, setLeagues] = useState<LeagueType[]>([]);
  const [teams, setTeams] = useState<TeamType[]>([]);
  const [cities, setCities] = useState<CityType[]>([]);
  const [teamAreas, setTeamAreas] = useState<TeamAreaType[]>([]);

  const filterModal = useFilterModal();

  let stepContent: any;

  useEffect(() => {
    getLeagues().then((_leagues) => {
      setLeagues(_leagues);
    });
  }, []);

  const onNextStep = (stepNumber: number) => {
    filterModal.onSetStep(filterModal.step + stepNumber);
  };

  const onBackStep = (stepNumber: number) => {
    filterModal.onSetStep(filterModal.step - stepNumber);
  };

  useEffect(() => {
    if (filterModal.team != null) {
      getBarsOfTeam(filterModal.team).then((_bars) => {
        if (_bars.length > 0) {
          getCitiesOfBars(_bars).then((_cities) => {
            setCities(_cities);
          });
        }
      });
    }
  }, [filterModal.team]);

  if (filterModal.step == STEPS.LEAGUE) {
    stepContent = (
      <div className="flex items-center">
        {leagues.map((_league, index) => (
          <button
            key={index}
            className="m-8 scale-90 hover:scale-100 active:scale-95 active:opacity-70 transition-all"
            onClick={() => {
              filterModal.onSetLeague(_league);
              // filterModal.onSetStep(STEPS.TEAM);
              if (_league.name.startsWith("NCAAF")) {
                getTeamAreas().then((_teamAreas) => {
                  setTeamAreas(
                    _teamAreas.filter((_teamArea) =>
                      _teamArea.name.startsWith(_league.name)
                    )
                  );
                  onNextStep(1);
                });
              } else {
                getTeamsOfLeague(_league).then((_teams) => {
                  setTeams(_teams);
                });
                onNextStep(2);
              }
            }}
          >
            {_league.image && (
              <Image
                alt={_league.name}
                src={_league.image.url}
                className="h-[100px] w-[100px] md:h-[10vw] md:w-[10vw] object-scale-down"
                width={_league.image.width}
                height={_league.image.height}
              />
            )}
          </button>
        ))}
      </div>
    );
  }

  if (filterModal.step == STEPS.TEAM_AREA) {
    stepContent = (
      <div className="flex items-center mx-20 my-32 flex-wrap justify-center">
        {teamAreas.map((_teamArea, index) => (
          <button
            key={index}
            className="m-8 scale-90 hover:scale-100 active:scale-95 active:opacity-70 transition-all"
            onClick={() => {
              filterModal.onSetTeamArea(_teamArea);
              getTeamsOfTeamArea(filterModal.league!, _teamArea).then(
                (_teams) => {
                  setTeams(_teams);
                  onNextStep(1);
                }
              );
            }}
          >
            {teamAreaImages[_teamArea.name] ? (
              <Image
                alt={_teamArea.name}
                src={teamAreaImages[_teamArea.name]}
                className="h-[60px] w-[60px] md:h-[10vw] md:w-[10vw] object-scale-down"
                width={300}
                height={300}
              />
            ) : (
              <div className="text-white text-[24px] md:text-[32px] font-fun-wood font-light">
                {_teamArea.name.slice(filterModal.league!.name.length + 3)}
              </div>
            )}
          </button>
        ))}
      </div>
    );
  }

  if (filterModal.step == STEPS.TEAM) {
    stepContent = (
      <div className="grid grid-cols-4 gap-1">
        {teams.map((_team, index) => (
          <button
            key={index}
            className="m-1"
            onClick={() => {
              filterModal.onSetTeam(_team);
              filterModal.onSetStep(STEPS.CITY);
            }}
          >
            {_team.image && (
              <Image
                alt={_team.name}
                src={_team.image.url}
                className="max-h-[50px] max-w-[50px] md:max-h-[8vw] md:max-w-[8vw] lg:max-w-[70px] lg:max-h-[70px]"
                width={_team.image.width}
                height={_team.image.height}
              />
            )}
          </button>
        ))}
      </div>
    );
  }

  if (filterModal.step == STEPS.CITY) {
    stepContent = (
      <DropDown label="Select City">
        <div>
          {cities.length > 0 ? (
            cities.map((_city, index) => (
              <button
                key={index}
                onClick={() => {
                  filterModal.onSetCity(_city);
                  filterModal.onClose();
                }}
                className="w-full mt-2 text-[16px] md:text-[20px] leading-6 text-white text-start"
              >
                <span className="mx-3 md:mx-6">&bull;</span>
                {_city.name}
              </button>
            ))
          ) : (
            <div>No cities</div>
          )}
        </div>
      </DropDown>
    );
  }

  return (
    <>
      {filterModal.isOpen && (
        <div
          className={`absolute top-0 left-0 flex items-center justify-center w-screen h-screen bg-black ${filterModal.step > 1 ? "bg-opacity-70" : "bg-opacity-70"
            }`}
        >
          {stepContent}

          {filterModal.step != STEPS.LEAGUE && (
            <div className="absolute right-[2px] bottom-9 md:bottom-3">
              <div
                className="text-[24px] md:text-[32px] lg:text-[40px]  pointer-events-auto cursor-pointer m-3 text-white/80 hover:text-white active:text-white/95 transition-all"
                onClick={() => {
                  if (filterModal.step == STEPS.TEAM) {
                    if (filterModal.teamArea != null) {
                      onBackStep(1);
                    } else {
                      onBackStep(2);
                    }

                    setTeams([]);
                  } else {
                    onBackStep(1);
                  }
                }}
              >
                <IoArrowBackCircleOutline />
              </div>
              <div
                className="text-[24px] md:text-[32px] lg:text-[40px] pointer-events-auto cursor-pointer m-3 text-white/80 hover:text-white active:text-white/95 transition-all"
                onClick={() => {
                  filterModal.onSetTeamArea(null);
                  setTeamAreas([]);
                  setTeams([]);
                  filterModal.onSetStep(STEPS.LEAGUE);
                }}
              >
                <MdRestartAlt />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FilterModal;

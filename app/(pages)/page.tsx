"use client";
import React, { useState, useEffect, useRef } from "react";
import { Map, Marker } from "react-map-gl";
import type { MapRef } from "react-map-gl";
import { useFilterModal } from "@/app/hooks";
import { BadgeType, BarType } from "../libs/types";
import { getBars } from "../libs/api/strapi/bar";
import Image from "next/image";
import { FiXSquare } from "react-icons/fi";
import { BsFilterCircle } from "react-icons/bs";
import Link from "next/link";
import MediaCard from "../components/media-card/MediaCard";
import { getBadgeById } from "../libs/api/strapi/badge";
import ImageUpload from "../components/image-upload/ImageUpload";
import axios from "axios";
import PhotoSlider from "../components/slider/PhotoSlider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const [bars, setBars] = useState<BarType[]>([]);
  const [selectedBar, setSelectedBar] = useState<BarType | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const mapRef = useRef<MapRef>(null);
  const filterModal = useFilterModal();

  useEffect(() => {
    if (filterModal.isOpen == false && mapRef.current) {
      getBars(filterModal.team!, filterModal.city!).then((_bars) => {
        setBars(_bars);
      });

      mapRef.current.flyTo({
        zoom: 7,
        center: {
          lat: filterModal.city!.latitude,
          lng: filterModal.city!.longitude,
        },
      });
    }
  }, [filterModal.isOpen]);

  const barMarkers = bars.map((_bar, index) => (
    <Marker
      key={index}
      longitude={_bar.longitude}
      latitude={_bar.latitude}
      anchor="center"
      onClick={() => {
        setSelectedBar(_bar);
        setIsDetailsOpen(true);
      }}
    >
      <BarMarker bar={_bar} selectedBar={selectedBar} />
    </Marker>
  ));

  const onImageUpload = (src: string) => {
    setIsUploading(true);
    axios
      .post("/api/upload", {
        id: selectedBar!.id,
        media: {},
      })
      .then(() => {
        setIsUploading(false);
      })
      .catch(() => {
        alert("Something went wrong!");
      })
      .finally(() => {
        setIsUploading(false);
      });
  };

  return (
    <div className="relative flex flex-col h-full grow">
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        mapStyle={
          filterModal.step > 1
            ? "mapbox://styles/mapbox/navigation-night-v1"
            : "mapbox://styles/mapbox/navigation-night-v1"
        }
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        ref={mapRef}
        initialViewState={{
          zoom: 4,
          longitude: -102.33351304584956,
          latitude: 38.50047384781058,
        }}
      >
        {barMarkers}
      </Map>
      {isDetailsOpen && selectedBar && (
        <div className="absolute w-full left-0 right-0 h-full flex justify-between pointer-events-none">
          <div className="w-[85%] md:w-full max-w-[706px] h-full flex flex-col pointer-events-auto border-r bg-sky-200">
            <div className="relative h-[60%] flex">
              {selectedBar.backgroundImage ? (
                <Image
                  src={selectedBar.backgroundImage?.url}
                  alt={selectedBar.name}
                  width={selectedBar.backgroundImage.width}
                  height={selectedBar.backgroundImage.height}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="bg-sky-950 w-full h-full"></div>
              )}

              <div className="absolute p-4 top-0 left-0 md:max-w-[80%]  border-r border-b rounded-br-md bg-sky-900">
                <div className="md:text-[3vw] font-fun-wood font-bold text-white">
                  {selectedBar.name}
                </div>
                <div className="flex flex-col md:flex-row text-white md:justify-between md:items-center justify-start my-2">
                  {selectedBar.commentary && (
                    <>
                      <Link
                        href={selectedBar.commentary ?? "/"}
                        className="text-[12px] md:text-[1.5vw]"
                      >
                        <u>Commentary</u>
                      </Link>
                      <div className="hidden md:block w-2 h-2 bg-white rounded-full"></div>
                    </>
                  )}
                  <div className="text-[12px] md:text-[1.3vw] md:max-w-[60%]">
                    {selectedBar.address}
                  </div>
                </div>
              </div>

              {/* {selectedBar.badges.length > 0 && (
                <div className="absolute bottom-0 right-0 p-2 pt-8 max-w-[270px] border max-h-[350px] overflow-scroll rounded-tl-2xl bg-sky-900">
                  
                  <div>
                    {selectedBar.badges.map((_badge, index) => (
                      <BadgeRow badge={_badge} key={index} />
                    ))}
                  </div>
                </div>
              )} */}
              {selectedBar.badges.length > 0 && (
                <div className="absolute bottom-0 right-0 p-2 pt-2 max-w-[270px] border max-h-[350px] overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-300 scrollbar-thumb-rounded rounded-tl-2xl bg-sky-900">
                  <span className="p-1 text-white font-bold text-[12px] md:text-[1.2vw]">
                    BADGES
                  </span>
                  <div className="w-full h-full">
                    {selectedBar.badges.map((_badge, index) => (
                      <BadgeRow badge={_badge} key={index} />
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="h-[40%] flex p-5">
              <div className="flex items-center w-full bg-sky-900 rounded-2xl">
                <div className="w-full p-3 px-10">
                  {selectedBar.medias.length > 0 ? (
                    <PhotoSlider medias={selectedBar.medias} />
                  ) : (
                    <div className="w-fit mx-auto h-full md:flex md:flex-col justify-center items-center">
                      <div className="max-w-[200px] text-center text-white text-[16px]">{`Have any photos or videos of good times at ${selectedBar.name}?`}</div>
                      {/* <ImageUpload
                        onChange={(value) => {
                          onImageUpload(value);
                        }}
                        isUploading={isUploading}
                      /> */}
                      <Link
                        href="https://2ndhomesports.com/nominate/"
                        target="_blank"
                      >
                        <div className=" max-w-[200px] p-3 rounded-2xl text-center font-medium text-white bg-black/10 hover:bg-black/25 active:bg-black/30 cursor-pointer transition-all text-[16px] mt-5">
                          {isUploading ? "Uploading..." : "Submit here"}
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            className="pointer-events-auto cursor-pointer m-3 text-white/80 hover:text-white active:text-white/95 transition-all"
            onClick={() => {
              setIsDetailsOpen(false);
              setSelectedBar(null);
            }}
          >
            <FiXSquare size={40} />
          </div>
        </div>
      )}

      {!filterModal.isOpen && (
        <div className="absolute w-full h-full flex flex-col pointer-events-none">
          <div
            className="absolute right-1 bottom-10 md:right-3 md:bottom-6 pointer-events-auto cursor-pointer text-white/80 hover:text-white active:text-white/95 transition-all"
            onClick={() => {
              filterModal.onOpen();
              setIsDetailsOpen(false);
            }}
          >
            <BsFilterCircle size={40} />
          </div>
        </div>
      )}
    </div>
  );
}

interface BarMarkerProps {
  bar: BarType;
  selectedBar: BarType | null;
}

const BarMarker: React.FC<BarMarkerProps> = ({ bar, selectedBar }) => {
  return (
    <div
      className={`w-[60px] h-[60px] flex items-center justify-center ${
        selectedBar && bar.id == selectedBar.id
          ? "bg-black/30 border-2"
          : "bg-black/0 border-0"
      } transition-all rounded-full hover:bg-black/20 active:bg-black/25 cursor-pointer`}
    >
      {bar.team.image && (
        <Image
          alt={bar.name}
          src={bar.team.image.url}
          width={bar.team.image.width}
          height={bar.team.image.height}
          className="max-w-[50px] max-h-[50px]"
        />
      )}
    </div>
  );
};

interface BadgeRowProps {
  badge: BadgeType;
}

const BadgeRow: React.FC<BadgeRowProps> = ({ badge: _badge }) => {
  const [badge, setBadge] = useState<BadgeType | null>();
  useEffect(() => {
    getBadgeById(_badge.id).then((b) => {
      setBadge(b);
    });
  }, []);
  return (
    <div className="flex mt-2 items-center">
      <div className="flex mr-2">
        {badge ? (
          badge.image ? (
            <Image
              src={badge.image.url}
              alt={badge.name}
              width={60}
              height={60}
              className="lg:w-[48px] lg:h-[48px] md:w-[45px] md:h-[45px] w-[40px] h-[40px] rounded-full overflow-clip"
            ></Image>
          ) : (
            <Image
              src="/images/no_image.png"
              alt={_badge.name}
              width={60}
              height={60}
              className="lg:w-[48px] lg:h-[48px] md:w-[45px] md:h-[45px] w-[40px] h-[40px] rounded-full overflow-clip"
              loading="lazy"
            ></Image>
          )
        ) : (
          <div className="lg:w-[2.2vw] lg:h-[2.2vw] md:w-[2vw] md:h-[2vw] w-[20px] h-[20px] rounded-full bg-white animate-pulse"></div>
        )}
      </div>
      <div className="text-[14px] md:text-[1.6vw] lg:text-[18px] font-luckiest-guy text-white">
        {_badge.name}
      </div>
    </div>
  );
};

"use client";

import React from "react";
import Image from "next/image";
import Carousel from "nuka-carousel";
import { PiCaretLeft, PiCaretRight } from "react-icons/pi";
import { ImageType } from "@/app/libs/types";

interface MediaCardProps {
  media: ImageType[];
}

const MediaCard: React.FC<MediaCardProps> = ({ media }) => {
  return (
    <div className="">
      <MediaCarousel media={media} />
    </div>
  );
};

interface MediaCarouselProps {
  media: ImageType[];
}

const MediaCarousel: React.FC<MediaCarouselProps> = ({ media }) => {
  return (
    <Carousel
      className="w-full relative overflow-hidden rounded-xl border"
      disableEdgeSwiping
      renderCenterLeftControls={(props) => (
        <CarouselControl {...props} direction="left" />
      )}
      renderCenterRightControls={(props) => (
        <CarouselControl {...props} direction="right" />
      )}
      renderBottomCenterControls={(props) => (
        <DotsControl {...props} direction="bottom" />
      )}
    >
      {media.map((_media, index) => (
        <div className="w-full h-full flex" key={index}>
          <Image
            alt="Listing"
            src={_media.url}
            width={150}
            height={150}
            className="group-hover:scale-110 transition"
            draggable={false}
            loading="lazy"
          />
        </div>
      ))}
    </Carousel>
  );
};

interface CarouselControlProps {
  currentSlide: number;
  slideCount: number;
  pagingDotsIndices: number[];
  nextDisabled: boolean;
  previousDisabled: boolean;
  nextSlide(): void;
  previousSlide(): void;
  goToSlide(targetIndex: number): void;
  direction: string;
}

const CarouselControl: React.FC<CarouselControlProps> = (props) => {
  const handleClick = () => {
    if (props.direction == "left") {
      props.previousSlide();
    } else {
      props.nextSlide();
    }
  };

  return (
    <>
      {(props.nextDisabled && props.direction == "right") ||
      (props.previousDisabled && props.direction == "left") ? (
        <></>
      ) : (
        <div className={`${props.direction == "left" ? "pl-1" : "pr-1"} `}>
          <div
            className={`p-2 rounded-full bg-black/30 hover:bg-black/20 text-white h-8 w-8 cursor-pointer flex items-center justify-center`}
            onClick={handleClick}
          >
            {props.direction == "left" ? <PiCaretLeft /> : <PiCaretRight />}
          </div>
        </div>
      )}
    </>
  );
};

const DotsControl: React.FC<CarouselControlProps> = (props) => {
  return (
    <div className="flex gap-2 mb-2">
      {props.pagingDotsIndices.map((dot, index) => (
        <div
          key={index}
          className={`h-[6px] hover:bg-white/70 ${
            index == props.currentSlide
              ? "w-[12px] bg-white/70"
              : "w-[6px] bg-white/30"
          }  rounded-full transition-all cursor-pointer`}
          onClick={() => props.goToSlide(index)}
        ></div>
      ))}
    </div>
  );
};

export default MediaCard;

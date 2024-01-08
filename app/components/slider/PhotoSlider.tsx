import React from "react";
import Slider, { Settings } from "react-slick";
import { ImageType } from "@/app/libs/types";
import SlideButton from "./SlideButton";
import Image from "next/image";
import "./styles.css";

interface IPhotoSliderProps {
  medias: ImageType[];
}

const PhotoSlider: React.FC<IPhotoSliderProps> = ({ medias }) => {
  const settings: Settings = {
    infinite: true,
    arrows: true,
    lazyLoad: "progressive",
    speed: 1000,
    autoplay: false,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    slidesToShow: medias.length > 3 ? 3 : medias.length,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: (
      <SlideButton
        variant="primary"
        direction="next"
        mobilePos="show"
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
    prevArrow: (
      <SlideButton
        variant="primary"
        direction="prev"
        mobilePos="show"
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
    responsive: [
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 620,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings} className="px-6">
      {medias.map((media, i) => (
        <PhotoCard media={media} key={i} />
      ))}
    </Slider>
  );
};

interface IPhotoCard {
  media: ImageType;
}

const PhotoCard: React.FC<IPhotoCard> = ({ media }) => {
  return (
    <div className="w-[130px] h-[130px] px-2 flex justify-center my-[20px]">
      <Image
        alt=""
        src={media.url}
        width={200}
        height={200}
        className="object-cover aspect-square rounded-lg overflow-clip"
      />
    </div>
  );
};

export default PhotoSlider;

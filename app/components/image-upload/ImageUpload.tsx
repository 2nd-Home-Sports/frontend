"use client";
import React, { useCallback } from "react";
import Image from "next/image";
import { CldUploadWidget, CldUploadButton } from "next-cloudinary";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  isUploading: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, isUploading }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );
  return (
    <CldUploadButton
      uploadPreset="zblrdqcs"
      options={{ singleUploadAutoClose: true, maxFiles: 1 }}
      onUpload={handleUpload}
    >
      <div className=" max-w-[200px] p-3 rounded-2xl font-medium text-white bg-black/10 hover:bg-black/25 active:bg-black/30 cursor-pointer transition-all text-[16px] mt-5">
        {isUploading ? "Uploading..." : "Submit here"}
      </div>
    </CldUploadButton>
  );
};

export default ImageUpload;

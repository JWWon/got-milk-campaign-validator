"use client";

import { useSelectedData } from "@/app/utils/selectedVideoStore";
import { Suspense } from "react";

function VideoValidator() {
  return null;
}

export default function ValidatorWithFallback() {
  const { index, video } = useSelectedData();

  if (!index || !video) {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <p>Please select video to validate 🥺</p>
      </div>
    );
  }

  return (
    <div className='w-full h-full py-6 rounded-medium border border-gray-100 dark:bg-gray-700/20 shadow-lg shadow-gray-400/30 dark:shadow-white/20'>
      <Suspense>
        <VideoValidator />
      </Suspense>
    </div>
  );
}

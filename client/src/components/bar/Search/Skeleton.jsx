import React from 'react';

export default function Skeleton() {
  return (
    <div class="flex animate-pulse flex-row items-center h-full space-x-2 mb-2">
        <div class="w-8 bg-blue-400 h-8 rounded-full"></div>
        <div class="flex flex-col space-y-3 flex-1">
          <div class="w-[60%] bg-blue-400 h-2 rounded-md "></div>
          <div class="w-16 bg-blue-400 h-2 rounded-md "></div>
        </div>
      </div>
  );
}

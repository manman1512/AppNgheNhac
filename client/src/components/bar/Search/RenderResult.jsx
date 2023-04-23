import React, { useContext } from 'react';
import {Context} from "../../../store/Context";
import {setSelectedSong, toggleShowPlayer} from "../../../store/Action";
export default function RenderResult({ data }) {
  const [state, dispatch] = useContext(Context)
  const handleSelectSong = (item)=>{
    dispatch(setSelectedSong(item))
    if(!state.player.show)
    dispatch(toggleShowPlayer())

  }
  if (data.length === 0) {
    return <div>Empty</div>;
  } else {
    return (
      <div>
        {data.map((item, index) => (
          <button key={index} onClick={()=>handleSelectSong(item)} class="flex items-center h-full space-x-2 mb-2 w-full hover:bg-[rgba(229,229,229,0.35)] p-2 rounded-lg">
            <div style={{
              width: "64px",
              height: "48px",
              backgroundSize: "64px 48px",
              backgroundImage: `url(${item.thumbnail})`,
              backgroundPosition:"center"
            }} class="rounded-lg"></div>
            <div class="flex flex-col flex-1">
              <p className='text-left line-clamp-1 text-white font-medium'>{item.name}</p>
              <p className=" text-left text-sm text-gray-500">{item.artist.name}</p>
            </div>
          </button>
        ))}
      </div>
    );
  }
}

{
  /* <div class="flex animate-pulse flex-row items-center h-full space-x-2 mb-2">
<div class="w-8 bg-gray-400 h-8 rounded-full"></div>
<div class="flex flex-col space-y-3 flex-1">
  <div class="w-[60%] bg-gray-400 h-2 rounded-md "></div>
  <div class="w-16 bg-gray-400 h-2 rounded-md "></div>
</div>
</div> */
}

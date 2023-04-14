import React, { useContext, useEffect, useState } from 'react';
import { HiPlay } from 'react-icons/hi';
import { BsHeartFill, BsFillPauseCircleFill } from 'react-icons/bs';
import { Context } from '../../store/Context';
import { addLoveSong, removeLoveSong, setSelectedSong, updateLinkSong } from '../../store/Action';
import loveSongApi from '../../axiosClient/api/loveSong';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import songsApi from '../../axiosClient/api/songs';

export default function RenderListSong({ listSong, onSongClick, onFavorite }) {
  const [state, dispatch] = useContext(Context);
  // const [deleteLoveSong, setDeleteLoveSong] = useState(false);
  const { selectedSong } = state.player;

  const loveSong = state.loveSong;
  const handleRemoveFavorite = async (_id) => {
    try {

      const response = await loveSongApi.handleRemoveLoveSong(_id);
      const { data } = response;
      dispatch(removeLoveSong(data.song))
    } catch (error) {
      console.log(error)
    }
  };

  const handleAdd = async (_id) => {
    try {
      const response = await loveSongApi.handleLoveSongById(_id);
      const { data } = response;
      dispatch(addLoveSong(data.song))
      // onFavorite(newData);
    } catch (error) {

    }
  };
  const setSong = async (l) => {
    if (l.link === undefined) {
      const response = await songsApi.getLinkSong(l.id)
      const link = response.data.data["128"]
      dispatch(updateLinkSong(l._id, link))
      dispatch(setSelectedSong({
        ...l,
        link
      }))
    } else {
      dispatch(setSelectedSong(l))
    }
  }
  console.log(state);
  return (
    <div className="relative overflow-x-auto w-full">
      <table className="w-full text-left ">
        <thead className="text-lg">
          <tr>
            <th scope="col" className="px-6 py-3">
              #
            </th>
            <th scope="col" className="px-6 py-3">
              Bài hát
            </th>
            <th scope="col" className="px-6 py-3">
              Nghệ sĩ
            </th>
          </tr>
        </thead>
        <tbody>
          {listSong.map((l, i) => (
            <tr
              className={`border-b ${l && selectedSong && l._id === selectedSong._id
                ? 'bg-[#aee9c5]'
                : 'transparent '
                } hover:bg-[#aee9c5] group`}
              key={i}
            >
              <th scope="row" className="px-6 py-2">
                <div className="flex items-center">
                  <div className="visible group-hover:invisible">{i + 1}</div>
                  <div className="bg-transparent -translate-x-5 right-0 z-50">
                    <button
                      onClick={() => setSong(l)

                      }
                    >
                      {
                        state.player.isPlay ? <BsFillPauseCircleFill
                          className="invisible group-hover:visible"
                          size="2rem"
                        /> : <HiPlay
                          className="invisible group-hover:visible"
                          size="2rem"
                        />
                      }
                    </button>

                  </div>
                </div>
              </th>
              <td className="px-6 py-2">
                <div className="flex items-center">
                  <img
                    src={l.thumbnail}
                    alt=""
                    className="w-[35px] h-[35px] rounded-lg mr-2"
                  />
                  {l.name}
                </div>
              </td>
              <td className="px-6 py-2">{l.artist.name}</td>
              {!loveSong.map(l => l._id).includes(l._id) ? (
                <td className="px-6 py-2">
                  <AiOutlineHeart
                    className="cursor-pointer"
                    title="Thêm vào mục yêu thích"
                    onClick={() => handleAdd(l._id)}
                  />
                </td>
              ) : (
                <td className="px-6 py-2">
                  <AiFillHeart
                    className="cursor-pointer"
                    title="Xóa khỏi mục yêu thích"
                    onClick={() => handleRemoveFavorite(l._id)}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import songsApi from '../../axiosClient/api/songs';
import { BsFileEarmarkMusic } from 'react-icons/bs';
import { IoIosAdd } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { Context } from '../../store/Context';
import { addSongToPlaylist } from '../../store/Action';
import playlistsApi from '../../axiosClient/api/playlists';
import { toast } from 'react-toastify';

export default function SuggestSongs() {
  const [state, dispatch] = useContext(Context);
  // console.log(state.playlist);
  const selectedPlaylist = state.playlist.find(p => p.selected);
  const notifyConflict = () => {
    toast.error("Song is existed in playlist")
  }
  const handleAdd = async (s) => {
    try {
      const response = await playlistsApi.addSongToPlaylist(selectedPlaylist._id, s._id);
      dispatch(addSongToPlaylist(response.data.song))
    } catch (error) {
      if (error.response.status === 409) {
        notifyConflict();
      }
    }
    // dispatch(addSongToPlaylist(s))
  };
  const [suggestSongs, setSuggestSongs] = useState([]);
  useEffect(() => {
    const getAllSong = async () => {
      const songs = await songsApi.getAllSong();
      setSuggestSongs(songs.data);
    };
    getAllSong();
  }, []);
  return (
    <div className="flex flex-auto w-auto flex-col gap-[67px]">
      <div
        className="flex justify-center items-center flex-col bg-[#AEE9C5] p-14
            rounded-lg text-white"
      >
        <BsFileEarmarkMusic size="5rem" />
        <p className="font-bold mt-2 text-lg">
          Không có bài hát trong playlist này
        </p>
      </div>
      <div className="">
        <div className="font-bold text-xl mb-3">Bài hát gợi ý</div>
        <div className="flex flex-col ">
          <table>
            <tbody>
              {suggestSongs.map((s, i) => (
                <tr key={i} className="">
                  <td className=" py-2">
                    <div className="flex items-center">
                      <img
                        src={s.thumbnail}
                        alt=""
                        className="w-[35px] h-[35px] rounded-lg mr-2"
                      />
                      {s.name}
                    </div>
                  </td>
                  <td className="px-24 py-2">{s.artist.name}</td>
                  <td className="px-24 py-2 visible">
                    <IoIosAdd
                      className="cursor-pointer border border-gray-400 rounded-full"
                      color="black"
                      size="1.2rem"
                      title="Khác"
                      onClick={() => handleAdd(s)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link to="/" className="mt-10 font-bold ">
          Thêm...
        </Link>
      </div>
    </div>
  );
}

import React, { useContext } from 'react'
import { HiPlay } from 'react-icons/hi';
import { BsHeartFill, BsFillPauseCircleFill } from 'react-icons/bs';
import { Context } from '../../store/Context';
import { setSelectedSong } from '../../store/Action';
export default function RenderListSong({listSong, onSongClick,}) {
  const [state, dispatch] = useContext(Context);
  const {selectedSong} = state.player;
  
  return (
    <div className="relative overflow-x-auto">
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
                      className={`border-b ${
                        l && selectedSong && l._id === selectedSong._id
                          ? 'bg-[#aee9c5]'
                          : 'transparent '
                      } hover:bg-[#aee9c5] group`}
                      key={i}
                    >
                      <th scope="row" className="px-6 py-2">
                        <div className="flex items-center">
                          <div className="visible group-hover:invisible">
                            {i + 1}
                          </div>
                          <div className="bg-transparent -translate-x-5 right-0 z-50">
                            {l && selectedSong && l._id === selectedSong._id ? (
                              <button
                                onClick={() => {
                                  dispatch(setSelectedSong(l))
                                }}
                              >
                                <BsFillPauseCircleFill
                                  className="invisible group-hover:visible"
                                  size="2rem"
                                />
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  dispatch(setSelectedSong(l))
                                }}
                              >
                                <HiPlay
                                  className="invisible group-hover:visible"
                                  size="2rem"
                                />
                              </button>
                            )}
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
                      <td className="px-6 py-2">
                        <BsHeartFill
                          className="cursor-pointer"
                          title="Xóa khỏi mục yêu thích"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
  )
}

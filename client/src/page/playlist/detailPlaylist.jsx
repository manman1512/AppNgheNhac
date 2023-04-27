import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import playlistsApi from '../../axiosClient/api/playlists';
import { Context } from '../../store/Context';
import { format } from 'date-fns';
import RenderListSong from '../../components/RenderListSong';
import EditPlaylist from './EditPlaylist';
import InfoPlaylist from './InfoPlaylist';
import SuggestSongs from '../../components/SuggestSongs';
import { setListSong, setSelectedPlaylist } from '../../store/Action';
const moment = require('moment');
require('moment/locale/vi'); // Load Vietnamese locale

export default function DetailPlaylist(props) {
  const [state, dispatch] = useContext(Context);
  const param = useParams();
  const path = param.playlistId;
  const selectedPlaylist = state.playlist.find((p) => p.selected);
  const [showModalEditPlaylist, setShowModalEditPlaylist] = useState(false);
  const handleCloseModal = () => {
    setShowModalEditPlaylist(false);
  };

  const handleOpenModal = () => {
    setShowModalEditPlaylist(true);
  };
  useEffect(() => {
    const isEveryHaveSelected = state.playlist
      .map((p) => p.selected)
      .every((x) => x === undefined);
    if (path && isEveryHaveSelected && state.playlist.length > 0) {
      dispatch(setSelectedPlaylist(path));
    }
  }, [path, state.playlist]);
  useEffect(() => {
    const selectedPlaylist = state.playlist.find((s) => s.selected);
    if (selectedPlaylist && selectedPlaylist.listSong === undefined) {
      (async () => {
        const response = await playlistsApi.getSongByPlaylist(
          selectedPlaylist._id
        );
        dispatch(setListSong(response.data));
      })();
    }
    console.log(selectedPlaylist)
  }, [state.playlist]);
  console.log(state);
  return (
    <React.Fragment>
      <div className="p-8 flex gap-8">
        <div className="gap-4 flex-1">
          {state.user && selectedPlaylist && (
            <InfoPlaylist
              playlist={selectedPlaylist}
              onOpen={handleOpenModal}
              length={
                selectedPlaylist.listSong ? selectedPlaylist.listSong.length : 0
              }
              user={state.user}
            />
          )}
          {showModalEditPlaylist && (
            <EditPlaylist
              playlist={state.playlist.find((x) => x._id === path)}
              // onApply={handleApplyChange}
              onClose={handleCloseModal}
              // playlist={state.playlist}
            />
          )}
        </div>
        <div className="flex-[2]">
          {selectedPlaylist &&
            (selectedPlaylist.listSong === undefined ||
            selectedPlaylist.listSong.length === 0 ? (
              <SuggestSongs />
            ) : (
              <RenderListSong listSong={selectedPlaylist.listSong} />
            ))}
        </div>
      </div>
    </React.Fragment>
  );
}

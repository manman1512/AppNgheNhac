import React, { useContext, useRef, useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { useDebounce } from '../../../hooks';
import { useEffect } from 'react';
import Skeleton from './Skeleton';
import RenderResult from './RenderResult';
import songsApi from '../../../axiosClient/api/songs';
import { Context } from '../../../store/Context';
export default function Search() {
  const [titleSearch, setTitleSearch] = useState('');
  const searchTerm = useDebounce(titleSearch, 300);
  const [searching, setSearching] = useState(false);
  const [result, setResult] = useState([]);
  const [error, setError] = useState('');
  const [focus, setFocus] = useState(false);
  const inputRef = useRef(null);
  const [state, dispatch] = useContext(Context);
  useEffect(() => {
    window.addEventListener('click', (e) => {
      if (inputRef.current) {
        console.log(inputRef.current.contains(e.target));
        if(!inputRef.current.contains(e.target)){
          setFocus(false);
        }
      }
    });
    return () =>
      window.removeEventListener('click', (e) => {
        console.log(e);
      });
  }, [inputRef]);
  useEffect(() => {
    (async () => {
      try {
        if (searchTerm.length > 0) {
          setError('');
          setSearching(true);
          const response = await songsApi.searchSongs(searchTerm);
          setResult(response.data.songs);
          setSearching(false);
        }
      } catch (error) {
        setError('fail');
        console.log(error);
        setSearching(false);
      }
    })();
  }, [searchTerm]);

  useEffect(()=>{
    setFocus(false);
  },[state.player.selectedSong])
  return (
    <div ref={inputRef} className="relative">
      <input
        onFocus={() => setFocus(true)}
        type="search"
        className="block p-2 w-full z-20 rounded-3xl
            border-gray-500 border outline-none "
        placeholder="Tìm kiếm bài hát, nghệ sĩ, album..."
        value={titleSearch}
        onChange={(e) => {
          setTitleSearch(e.target.value);
        }}
      />
      <button
        type="submit"
        className="absolute top-0 right-0 p-2.5
              rounded-r-3xl border border-gray-500
             focus:outline-none  dark:bg-[#AEE9C5]
             "
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          // xmlns="http://www.w3.org/2000/svg"
        >
          <HiOutlineSearch size="1.5rem" className="" />
        </svg>
      </button>
      {focus && searchTerm && (
        <div
          className="absolute w-[90%] 
      max-h-[200px] bg-blue-300 my-1 
      mx-auto rounded-lg left-1/2 -translate-x-1/2
      p-2 overflow-y-auto
      "
        >
          {searching ? (
            [0, 1, 2].map((value, index) => <Skeleton key={index} />)
          ) : error === 'fail' ? (
            <p>Search fail</p>
          ) : (
            <RenderResult data={result} />
          )}
        </div>
      )}
    </div>
  );
}

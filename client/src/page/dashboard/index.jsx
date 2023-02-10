import React, { useEffect, useState } from 'react';
import songsApi from '../../axiosClient/api/songs';

export default function Dashboard() {
  // const [title, setTitle] = useState('');
  const [items, setItems] = useState([]);
  useEffect(() => {
    const getHome = async () => {
      const res = await songsApi.getHome();
      // setTitle(res.data.data.items.items);
      const data = res.data.data.items;
      let arrItems = data.map((d) => d.items);
      setItems(arrItems);

    };
    getHome();
  }, []);
  console.log(items);
  return (
    <div className="text-white ">
      <div className="">
        {items.map((item, index) => (
          <div key={index} className="flex">
            {Array.isArray(item)
              ? item.map((i, index) => (
                  <div key={index}className="">
                    <div>
                      <img src={i.thumbnail} />
                      <p>{i.title}</p>
                      <div>{i.sortDescription}</div>
                    </div>
                  </div>
                ))
              : ' '}
          </div>
        ))}
      </div>
    </div>
    // <div className=" grid grid-cols-5 gap-5">
    //   <div
    //     className="w-[200px] font-mono rounded-lg mt-6 ml-6 h-60 bg-white "
    //     style={{
    //       boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    //     }}
    //   >
    //     song
    //   </div>
    // </div>
  );
}

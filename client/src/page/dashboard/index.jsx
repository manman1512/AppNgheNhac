import React, { useEffect, useState } from 'react';
// import songsApi from '../../axiosClient/api/songs';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { BsFillPlayCircleFill, BsThreeDots } from 'react-icons/bs';
import { BsHeart } from 'react-icons/bs';
import { MdOutlineNavigateNext } from 'react-icons/md';
import { IoIosArrowBack } from 'react-icons/io';

export default function Dashboard() {
  // const [title, setTitle] = useState('');
  // const [items, setItems] = useState([]);
  // useEffect(() => {
  //   const getHome = async () => {
  //     const res = await songsApi.getHome();
  //     // setTitle(res.data.data.items.items);
  //     const data = res.data.data.items;
  //     let arrItems = data.map((d) => d.items);
  //     setItems(arrItems);

  //   };
  //   getHome();
  // }, []);
  // console.log(items);
  const images = [
    'https://bloganchoi.com/wp-content/uploads/2021/01/am-nhac-hay.jpg',
    'https://photo-zmp3.zmdcdn.me/banner/9/8/4/4/9844df155bf3e9be83cde590ce2fd370.jpg',
    'https://photo-zmp3.zmdcdn.me/banner/f/4/f/6/f4f68001d1f15c476eb59b91316bb312.jpg',
    'https://photo-zmp3.zmdcdn.me/banner/8/7/b/c/87bc8a978acb1b03ea14a7d793c67713.jpg',
    'https://photo-zmp3.zmdcdn.me/banner/4/9/9/8/49987074fe79ba7736517a688e6fb0bc.jpg',
  ];

  const handleOnClick = (e) => {
    console.log(e);
  };

  return (
    <React.Fragment>
      <div className="mx-auto  w-[1000px] transition-all duration-500 bg-cover mt-5">
        <Carousel
          useKeyboardArrows={true}
          autoPlay
          showIndicators={false}
          infiniteLoop
          showArrows={true}
          showThumbs={false}
          showStatus={false}
          renderArrowNext={(c, n, l) => (
            <div className="flex items-center justify-center group absolute bg-transparent h-[50%] 
            w-12 top-1/2 -translate-y-1/2 right-0 z-50">
              <button
                onClick={c}
                className="invisible group-hover:visible bg-[#777777] opacity-75 p-2 rounded-full"
              >
                <MdOutlineNavigateNext size="24px" color="white" />
              </button>
            </div>
          )}
          renderArrowPrev={(c, n, l) => (
            <div className="flex items-center justify-center group absolute bg-transparent h-[50%] w-12 top-1/2 -translate-y-1/2 left-0 z-50">
              <button
                onClick={c}
                className="invisible group-hover:visible bg-[#777777] opacity-75 p-2 rounded-full "
              >
                <IoIosArrowBack size="22px" color="white" className='' />
              </button>
            </div>
          )}
          className=" center"
          centerMode={true}
          infinite={true}
          centerPadding="60px"
          speed="1000"
        >
          {images.map((i, index) => (
            <div className="slide h-[400px] mt-3">
              <img alt="" src={i} key={index} className="rounded-xl p-2" />
            </div>
          ))}
        </Carousel>
      </div>

      <div className='mt-10'>
        <div className='text-2xl font-bold ml-7 mb-2'>Lựa chọn hôm nay</div>
        <div className="flex gap-4 flex-wrap py-4 justify-start w-full">
          {Array(5)
            .fill(0)
            .map((s, i) => (
              <div
                key={i}
                data-id={i}
                className="w-[calc(20%-1rem)]"
                onContextMenu={(e) => {
                  e.preventDefault();
                  handleOnClick(s);
                }}
              >
                <div
                  key={i}
                  className="
                    mx-auto 
                    bg-[url(https://bloganchoi.com/wp-content/uploads/2021/01/am-nhac-hay.jpg)] 
                    w-[200px] group relative rounded-xl transition-all duration-500 hover:scale-105 h-60 bg-cover"
                >
                  <div className="w-full h-full group-hover:backdrop-brightness-90 rounded-xl"></div>
                  <div
                    className="absolute invisible group-hover:visible -bottom-52 group-hover:bottom-10 transition-all 
                    duration-500 p-4 flex gap-4 left-1/2 -translate-x-1/2 justify-center"
                  >
                    <BsHeart
                      color="white"
                      className="text-[28px] hover:scale-150 cursor-pointer"
                      title="Yêu thích"
                    />
                    <BsFillPlayCircleFill
                      color="white"
                      className="text-[28px] hover:scale-150 cursor-pointer"
                      title="Phát"
                    />
                    <BsThreeDots
                      color="white"
                      className="text-[28px] hover:scale-150 cursor-pointer"
                      title="Chỉnh sửa"
                    />
                  </div>
                </div>
                <p className="mt-2 font-bold text-center">Đây là playlist</p>
              </div>
            ))}
        </div>
      </div>
    </React.Fragment>
  );
}

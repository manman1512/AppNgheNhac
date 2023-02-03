const cryptoJS = require("crypto-js");
const queryString = require("querystring");
const axios = require("axios");
// const KEY =
//   "U2FsdGVkX19BWoF1uTP8o90p9KAWsXZ/VJ41PG7XYF/63qnjiMh1TLy8zAfZBMa9iqiGyPiN5iMUocpD74kAsg==";
const KEY = "6847f1a4fc2f4eb6ab13f9084e082ef4";
const API_KEY = "e3afd4b6c89147258a56a641af16cc79";

const encrypt = () => {
  const t = new Date().getTime().toString();

  const n = cryptoJS.AES.decrypt(KEY, "nhaccuatui").toString(cryptoJS.enc.Utf8);
  const s = cryptoJS.HmacSHA512(t, n).toString();
  return {
    a: API_KEY,
    s,
    t,
  };
};
const instance = axios.create({
  baseURL: "https://beta.nhaccuatui.com/api",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

instance.interceptors.request.use(
  function (config) {
    // config.url += `?${queryString.stringify(encrypt())}`
    config.url += `?a=e3afd4b6c89147258a56a641af16cc79&s=6f0e1b4359ee20608cfe014c22a26b289ff2c3b6ed243fb64b1f741f7ef8c87e1057e23a9682975ad2eccde51ac3c6403fe953e0f5636a00b20627a002cb5c22&t=1675233216647`;
    // console.log(config.uqrl);
    config.data = queryString.stringify(config.data);

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    // console.log(error);
    return Promise.reject(error);
  }
);

const joinQueryString = (obj) =>
  Object.entries(obj)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
    .join("&");

module.exports = {
  getHome: () => instance.post("home"),

  getSong: (songId) =>
    instance.post("media/info", joinQueryString({ key: songId, type: "song" })),

  getPlaylists: () => instance.post("tags"),

  getPlaylistDetail: (playlistId) =>
    instance.post(
      "media/info",
      joinQueryString({ key: playlistId, type: "playlist" })
    ),
  getLyric: (songId) =>
    instance.post("lyric", joinQueryString({ key: songId, type: "song" })),
  getVideoDetail: (videoId) =>
    instance.post("media/info", joinQueryString({ key: videoId, type: "video" })),
  getTopics: () => instance.post("topic"),
  getTopicDetail: (topicId) =>
    instance.post("topic/detail", joinQueryString({ key: topicId })),
  getChart: (
    { category = "nhac-viet", time } = {
      category: "nhac-viet",
    }
  ) =>
    instance.post(
      "ranking/top20",
      joinQueryString({
        category,
        type: "song",
        size: 20,
        week: time?.week || undefined,
        year: time?.year || undefined,
      })
    ),
  getTop100: (top100Id) =>
    instance.post("top100", joinQueryString({ key: top100Id })),
  searchByKeyword: (keyword) =>
    instance.post("search/all", joinQueryString({ key: keyword })),
  getTopKeyword: () => instance.post("search/topkeyword"),
  getTrendingArtists: () =>
    instance.post("ranking/artist", joinQueryString({ size: 10 })),
  exploreArtists: (
    { nation = "hot", gender = 1 } = { nation: "hot", gender: 1 }
  ) => instance.post("artist", joinQueryString({ nation, gender })),
  getArtistDetail: (artistId) =>
    instance.post(
      "artist/detail",
      joinQueryString({
        shortLink: artistId,
        type: "all",
        size: 20,
        index: 1,
        sort: 0,
      })
    ),

  explore: ({ type, key = "moi-hot", page = 1, pageSize = 36 }) =>
    instance.post(
      "genre",
      joinQueryString({ type, key, order: 1, pageIndex: page, pageSize })
    ),
};
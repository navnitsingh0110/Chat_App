// User Data for dynamic addition of users in user list
const usersData = [
  {
    avatar:
      "https://hips.hearstapps.com/hmg-prod/images/gettyimages-942065100-copy.jpg?resize=1200:*",
    name: "John Mayers",
    time: "3 min ago",
    status: "Accountant",
  },
  {
    avatar:
      "https://cdn.pixabay.com/photo/2021/07/20/14/59/iron-man-6480952_1280.jpg",
    name: "Tony Stark",
    time: "10 min ago",
    status: "Genius, Billionaire, Playboy, Philanthropist",
  },
  {
    avatar:
      "https://c4.wallpaperflare.com/wallpaper/739/10/526/scarlett-johansson-face-pink-lipstick-actress-wallpaper-preview.jpg",
    name: "Scarlett Johansson",
    time: "3 hours ago",
    status: "Black Widow",
  },
  {
    avatar:
      "https://www.gannett-cdn.com/presto/2023/02/15/USAT/d22ad1a7-00ec-425f-b1c9-a643fcfcda9f-AFP_AFP_336E7FA.jpg",
    name: "Jeremy Renner",
    time: "4 hours ago",
    status: "Hawkeye",
  },
  {
    avatar: "https://flxt.tmsimg.com/assets/308495_v9_bb.jpg",
    name: "Anthony Mackie",
    time: "8 hours ago",
    status: "Falcon",
  },
  {
    avatar:
      "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcRpW3LbFgFmL3wF7AxVmNPkfKKVTg3hdeDwJAkQ6ffgI1aqNQH-ofOktw9CRPIIPA8IRuPHc9YeW1BGdTI",
    name: "Chris Evans",
    time: "22 hours ago",
    status: "Captain America",
  },
  {
    avatar:
      "https://hips.hearstapps.com/hmg-prod/images/chris-hemsworth-poses-during-a-photo-call-for-thor-ragnarok-on-october-15-2017-in-sydney-australia-photo-by-mark-metcalfe_getty-images-for-disney-square.jpg",
    name: "Chris Hemsworth",
    time: "1 day ago",
    status: "Thor the God of Thunder",
  },
  {
    avatar: "https://www.emmys.com/sites/default/files/Mark-Ruffalo.jpg",
    name: "Mark Ruffalo",
    time: "Dec 10",
    status: "The Incredible Hulk",
  },
  {
    avatar:
      "https://media.gettyimages.com/id/1398729436/photo/west-hollywood-california-tom-hiddleston-attends-the-loki-fyc-event-at-the-silver-screen.jpg?s=612x612&w=0&k=20&c=5BtgR1wxAmrtNk6TiXej0oNbF5W-cDtt2Qbh-hEWMpA=",
    name: "Tom Hiddleston",
    time: "Dec 8",
    status: "Loki",
  },
  {
    avatar: "https://flxt.tmsimg.com/assets/71830_v9_bb.jpg",
    name: "Don Cheadle",
    time: "Dec 6",
    status: "Rhodey",
  },
  {
    avatar:
      "https://m.media-amazon.com/images/M/MV5BMTk3NDE3Njc5M15BMl5BanBnXkFtZTYwOTY5Nzc1._V1_.jpg",
    name: "Stan Lee",
    time: "Dec 4",
    status: "The Big Daddy",
  },
  {
    avatar:
      "https://m.media-amazon.com/images/M/MV5BMTQ1NTQwMTYxNl5BMl5BanBnXkFtZTYwMjA1MzY1._V1_FMjpg_UX1000_.jpg",
    name: "Samuel L. Jackson",
    time: "Dec 2",
    status: "Shield",
  },
];

// Json data for chat histories keyed by chat number (1-based)
const JsonData = {
  chat1: [
    {
      from: { type: "user1" },
      msg: { message: "Hi, how can I help you?" },
    },
    {
      from: { type: "user2" },
      msg: { message: "I've got an issue with my internet connection." },
    },
    {
      from: { type: "user1" },
      msg: { message: "Could you please confirm your email address?" },
    },
    {
      from: { type: "user2" },
      msg: { message: "john.mayers@gmail.com" },
    },
  ],
  chat2: [
    {
      from: { type: "user1" },
      msg: { message: "Hi, how can I help you?" },
    },
    {
      from: { type: "user2" },
      msg: { message: "My computer is not working since yesterday." },
    },
    {
      from: { type: "user1" },
      msg: { message: "Please confirm your email address." },
    },
    {
      from: { type: "user2" },
      msg: { message: "tony.stark@gmail.com" },
    },
  ],
  // Additional chat histories can be added similarly...
};

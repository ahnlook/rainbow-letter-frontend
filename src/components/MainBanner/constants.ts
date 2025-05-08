import Donate from 'assets/banner_support.webp';
import Banner from 'assets/im_home_banner.webp';
import Forest from 'assets/im_banner_forest.webp';
import Shared from 'assets/im_banner_shared.webp';
import Store from 'assets/im_banner_store.webp';

export const BANNER_ITEMS = [
  {
    id: 1,
    category: 'EVENT',
    link: '/donate',
    image: Donate,
  },
  {
    id: 2,
    category: 'EVENT',
    link: 'https://pf.kakao.com/_MNevG/108670095',
    image: Forest,
  },
  {
    id: 3,
    category: 'EVENT',
    link: '/letters/pin',
    image: Shared,
  },
  {
    id: 4,
    category: 'EVENT',
    link: 'https://smartstore.naver.com/rainbowletter/products/11806088454',
    image: Store,
  },
];

export const EN_BANNER_ITEMS = [
  {
    id: 1,
    category: 'EVENT',
    link: '/letter-box',
    image: Banner,
  },
];

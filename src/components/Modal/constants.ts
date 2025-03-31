// import Kakao from 'assets/im_modal_kakao.png';
import FitaPat from 'assets/im_modal_fitapat.png';
import forest from 'assets/forest.svg';
import woman from 'assets/im_donate_woman.svg';
import Forest from '../../assets/im_ad_forest.webp';
import Tumblbug from '../../assets/im_ad_tumblbug.webp';
import Kakao from '../../assets/im_ad_kakao.webp';

export interface Modal {
  type: string;
  title: string;
  body: {
    id: number;
    prefix?: string;
    contents: string;
  }[];
}

export interface Modal_AD {
  id: number;
  title?: string;
  description?: string;
  image: string;
  url: string;
  className?: string;
}

export const MODAL_AD_CONTENTS_ITEMS: Modal_AD[] = [
  {
    id: 2,
    image: Forest,
    url: 'https://pf.kakao.com/_MNevG/108670095',
  },
  {
    id: 3,
    image: Kakao,
    url: 'https://pf.kakao.com/_MNevG/105645061',
  },
];

export const MODAL_MESSAGE: Modal[] = [
  {
    type: 'TOPIC',
    title: 'write.suggest',
    body: [
      {
        id: 1,
        prefix: 'Q. ',
        contents: 'write.today',
      },
      {
        id: 2,
        prefix: 'Q. ',
        contents: 'write.tomorrow',
      },
      {
        id: 3,
        prefix: 'Q. ',
        contents: 'write.support',
      },
    ],
  },
  {
    type: 'PHONE',
    title: '카톡으로 답장 알림을 받아보세요',
    body: [
      {
        id: 1,
        contents: '핸드폰번호를 등록하면',
      },
      {
        id: 2,
        contents: '답장 링크를 카톡으로 보내드려요',
      },
    ],
  },
  {
    type: 'COMPLETE',
    title: '편지가 출발했어요',
    body: [
      {
        id: 1,
        contents: '답장은 다음날 오전 10시에 도착해요',
      },
    ],
  },
  {
    type: 'EXIST',
    title: `작성중인 편지가 있어요`,
    body: [
      {
        id: 1,
        contents: '여기서 계속 작성할까요?',
      },
    ],
  },
  {
    type: 'SAVING',
    title: '',
    body: [
      {
        id: 1,
        contents: 'modal.saving.contents',
      },
    ],
  },
  {
    type: 'IMAGE',
    title: `modal.saveImage.title`,
    body: [
      {
        id: 1,
        contents: 'modal.saveImage.select',
      },
    ],
  },
  {
    type: 'SAVECOMPLETE',
    title: '',
    body: [
      { id: 1, contents: `modal.saveImage.completeUpLine` },
      { id: 2, contents: `modal.saveImage.completeDownLine` },
    ],
  },
];

export default MODAL_MESSAGE;

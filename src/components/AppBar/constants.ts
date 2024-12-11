interface AppBar {
  [key: string]: {
    titleKey: string;
  };
}

const appBarConfig: AppBar = {
  '/my-page': {
    titleKey: 'appBar.myPage',
  },
  '/my-page/faqs': {
    titleKey: 'appBar.faqs',
  },
  '/my-page/leave': {
    titleKey: '회원 탈퇴',
  },
  '/my-pets': {
    titleKey: '우리아이',
  },
  '/my-pets/register': {
    titleKey: '등록하기',
  },
  '/my-pets/edit': {
    titleKey: '수정하기',
  },
  '/my-page/password': {
    titleKey: '비밀번호 변경하기',
  },
  '/write-letter': {
    titleKey: '편지쓰기',
  },
  '/letter-box': {
    titleKey: 'appBar.letterBox',
  },
  // TODO: 변경
  '/letter-box-renew': {
    titleKey: '편지함',
  },
  '/saved-image': {
    titleKey: '이미지 저장',
  },
  '/my-page/register': {
    titleKey: '등록하기',
  },
  '/contents': {
    titleKey: '컨텐츠',
  },
  letterId: {
    titleKey: '편지함',
  },
  shareLink: {
    titleKey: '편지함',
  },
  '/admin/letters': {
    titleKey: '편지 리스트 관리',
  },
  '/admin/pets': {
    titleKey: '반려동물 리스트 관리',
  },
};

export default appBarConfig;

export default function metaData(pathname: string, isKor: boolean) {
  const { title, description, ...metaData } = checkLng(pathname, isKor);
  const MetaTitle: HTMLTitleElement | null = document.querySelector('title');
  const MetaDescription: HTMLMetaElement | null = document.querySelector(
    'meta[name="description"]'
  );

  if (MetaTitle && MetaDescription) {
    MetaTitle.innerText = title;
    MetaDescription.content = description;
  }

  for (const [key, value] of Object.entries(metaData)) {
    const MetaElement: HTMLMetaElement | null = document.querySelector(
      `meta[property="${key}"]`
    );
    if (MetaElement) {
      MetaElement.content = value;
    }
  }
}

const checkLng = (pathname: string, isKor: boolean) => {
  let configObj;

  if (isKor) {
    configObj = metaDataConfig;
  } else {
    configObj = metaDataConfigForEn;
  }

  const { title, description, ...metaData } = configObj[pathname];

  return { title, description, ...metaData };
};

interface MetaData {
  [key: string]: {
    title: string;
    description: string;
    'og:title'?: string;
    'og:description'?: string;
  };
}

const metaDataConfig: MetaData = {
  default: {
    title: '무지개편지',
    description:
      '사별한 반려동물에게 마음을 담아 편지를 보내보세요. ai가 반려동물 입장에서 쓴 답장을 보내줄 거예요.',
    'og:title': '무지개편지 : 먼저 간 반려동물에게 보내는 편지',
    'og:description': '무지개편지 : 편지를 보내고 아이의 답장을 받아보세요.',
  },
  '/': {
    title: '무지개편지',
    description:
      '사별한 반려동물에게 마음을 담아 편지를 보내보세요. ai가 반려동물 입장에서 쓴 답장을 보내줄 거예요.',
    'og:title': '무지개편지 : 먼저 간 반려동물에게 보내는 편지',
    'og:description': '무지개편지 : 편지를 보내고 아이의 답장을 받아보세요.',
  },
  letterId: {
    title: '무지개편지 : 아이와 주고 받은 편지',
    description: '아이와 주고 받은 편지를 확인할 수 있어요.',
    'og:title': '무지개편지 : 아이와 주고 받은 편지',
    'og:description': '',
  },
  shareLink: {
    title: '무지개편지 : 아이와 주고 받은 편지',
    description: '아이와 주고 받은 편지를 확인할 수 있어요.',
    'og:title': '무지개편지 : 아이와 주고 받은 편지',
    'og:description': '',
  },
  '/write-letter': {
    title: '무지개편지 : 편지쓰기',
    description: '아이에게 편지를 보내보세요.',
  },
  '/letter-box': {
    title: '무지개편지 : 편지함',
    description: '아이와 주고 받은 편지를 확인할 수 있어요.',
  },
  '/my-pets': {
    title: '무지개편지 : 아이 정보',
    description: '아이의 정보를 확인하고 수정할 수 있어요.',
  },
  '/my-page': {
    title: '무지개편지 : 마이페이지',
    description: '내 정보를 확인하고 수정할 수 있어요.',
  },
  '/login': {
    title: '무지개편지 : 로그인',
    description: '편지를 보내고 아이의 답장을 받아보세요.',
  },
  '/sign-up': {
    title: '무지개편지 : 회원가입',
    description: '편지를 보내고 아이의 답장을 받아보세요.',
  },
  '/auth/email': {
    title: '무지개편지 : 비밀번호 찾기',
    description: '편지를 보내고 아이의 답장을 받아보세요.',
  },
  '/my-page/password': {
    title: '무지개편지 : 비밀번호 변경하기',
    description: '편지를 보내고 아이의 답장을 받아보세요.',
  },
  '/my-page/faqs': {
    title: '무지개편지 : 자주 묻는 질문',
    description: '지주 묻는 질문과 답변을 볼 수 있어요.',
  },
  '/my-page/leave': {
    title: '무지개편지 : 탈퇴',
    description: '편지를 보내고 아이의 답장을 받아보세요.',
  },
  '/my-pets/register': {
    title: '무지개편지 : 아이 정보 등록',
    description: '아이의 정보를 등록할 수 있어요.',
  },
  '/my-pets/edit': {
    title: '무지개편지 : 아이 정보 수정',
    description: '아이의 정보를 수정할 수 있어요.',
  },
  '/contents': {
    title: '무지개편지 : 콘텐츠',
    description: '무지개편지 콘텐츠를 확인해보세요.',
  },
  '/donate': {
    title: '무지개편지 : 후원하기',
    description: '무지개마을을 지켜주세요.',
    'og:title': '무지개편지 : 후원하기',
    'og:description':
      '무지개편지를 지켜주세요. 무지개마을에 여러분의 도움이 필요해요.',
  },
};

const metaDataConfigForEn: MetaData = {
  default: {
    title: 'Rainbow Letter',
    description:
      'Send a heartfelt letter to your departed pet. AI will make a reply as if it’s from your pet’s perspective.',
    'og:title':
      'Rainbow Letter: A Letter to Your Beloved Pet Beyond the Rainbow',
    'og:description':
      'Rainbow Letter: Write a letter and receive a reply from your pet.',
  },
  '/': {
    title: 'Rainbow Letter',
    description:
      'Send a heartfelt letter to your departed pet. AI will make a reply as if it’s from your pet’s perspective.',
    'og:title':
      'Rainbow Letter: A Letter to Your Beloved Pet Beyond the Rainbow',
    'og:description':
      'Rainbow Letter: Write a letter and receive a reply from your pet.',
  },
  letterId: {
    title: 'Rainbow Letter : 아이와 주고 받은 편지',
    description: '아이와 주고 받은 편지를 확인할 수 있어요.',
    'og:title': '무지개편지 : 아이와 주고 받은 편지',
    'og:description': '',
  },
  shareLink: {
    title: 'Rainbow Letter : 아이와 주고 받은 편지',
    description: '아이와 주고 받은 편지를 확인할 수 있어요.',
    'og:title': '무지개편지 : 아이와 주고 받은 편지',
    'og:description': '',
  },
  '/write-letter': {
    title: 'Rainbow Letter : 편지쓰기',
    description: '아이에게 편지를 보내보세요.',
  },
  '/letter-box': {
    title: 'Rainbow Letter : 편지함',
    description: '아이와 주고 받은 편지를 확인할 수 있어요.',
  },
  '/my-pets': {
    title: 'Rainbow Letter : 아이 정보',
    description: '아이의 정보를 확인하고 수정할 수 있어요.',
  },
  '/my-page': {
    title: 'Rainbow Letter : 마이페이지',
    description: '내 정보를 확인하고 수정할 수 있어요.',
  },
  '/login': {
    title: 'Rainbow Letter : 로그인',
    description: '편지를 보내고 아이의 답장을 받아보세요.',
  },
  '/sign-up': {
    title: 'Rainbow Letter : 회원가입',
    description: '편지를 보내고 아이의 답장을 받아보세요.',
  },
  '/auth/email': {
    title: 'Rainbow Letter : 비밀번호 찾기',
    description: '편지를 보내고 아이의 답장을 받아보세요.',
  },
  '/my-page/password': {
    title: 'Rainbow Letter : 비밀번호 변경하기',
    description: '편지를 보내고 아이의 답장을 받아보세요.',
  },
  '/my-page/faqs': {
    title: 'Rainbow Letter : 자주 묻는 질문',
    description: '지주 묻는 질문과 답변을 볼 수 있어요.',
  },
  '/my-page/leave': {
    title: 'Rainbow Letter : 탈퇴',
    description: '편지를 보내고 아이의 답장을 받아보세요.',
  },
  '/my-pets/register': {
    title: 'Rainbow Letter : 아이 정보 등록',
    description: '아이의 정보를 등록할 수 있어요.',
  },
  '/my-pets/edit': {
    title: 'Rainbow Letter : 아이 정보 수정',
    description: '아이의 정보를 수정할 수 있어요.',
  },
  '/contents': {
    title: '무지개편지 : 콘텐츠',
    description: '무지개편지 콘텐츠를 확인해보세요.',
  },
  '/donate': {
    title: 'Rainbow Letter : 후원하기',
    description: '무지개마을을 지켜주세요.',
    'og:title': '무지개편지 : 후원하기',
    'og:description':
      '무지개편지를 지켜주세요. 무지개마을에 여러분의 도움이 필요해요.',
  },
};

export interface Faqs {
  id: number;
  question: string;
  answer: string;
  des?: string;
  link?: string;
  email?: string;
}

export const QUESTION_PREFIX = 'Q. ';

export const FAQS_EN: Faqs[] = [
  {
    id: 0,
    question: 'What is Rainbow Letter?',
    answer:
      'Rainbow Letter is a service that offers comfort to those grieving the loss of a pet through letter exchanges. Psychologists often emphasize that “writing can be a powerful tool for healing.” We hope this space allows you to fully express your emotions and take the time you need to honor their memory.',
  },
  {
    id: 1,
    question: 'When can I expect a reply from my pet?',
    answer:
      '(For South Korea) Letters written before 11:59 PM will receive a reply the next day at 10 AM. Letters sent after midnight may experience delays in receiving a reply. ',
    des: '(For Other Countries) The Rainbow Post Office HQ is located in Korea. To receive a reply at 10:00 AM KST the next day, please make sure to send your letter by 11:59 PM KST. ',
  },
  {
    id: 2,
    question: 'How will I be notified of a reply?',
    answer: 'We’ll send a notification to your registered email address. ',
    des: '(For users in South Korea only) If you register your phone number, you’ll receive a text message or a KakaoTalk notification.',
  },
];

export const FAQS: Faqs[] = [
  {
    id: 0,
    question:
      '(간편가입) 네이버 간편가입 했는데 @naver.com으로 로그인이 되지 않아요',
    answer:
      '네이버 이용자 정보보호 정책에 따라 고객님의 네이버 계정에 등록된 [연락처 이메일]로 가입이 됩니다. 따라서 @naver.com 으로 가입되지 않을 경우, 네이버ID > 내프로필 > 기본정보의 이메일 주소를 확인해주세요.',
  },
  {
    id: 1,
    question: '무지개편지는 어떤 서비스인가요?',
    answer:
      '펫로스 증후군을 겪고 있는 분들을 편지 주고 받기를 통해 위로하는 서비스예요. 심리상담학에서는 ‘글쓰기는 치유의 과정’이라고 강조해요. 자기 감정을 마음껏 표현하며 충분한 추모의  시간을 보내시길 바래요.',
  },
  {
    id: 2,
    question: '답장은 언제 오나요?',
    answer:
      '편지를 보낸 날로부터 1~2일 후 오전 10시에 도착해요. 밤 늦게 보낸 편지는 답장이 늦어질 수도 있어요.',
  },
  {
    id: 3,
    question: '답장이 온 건 어떻게 알 수 있나요?',
    answer:
      '가입하신 이메일 주소로 답장 도착 안내 메일을 보내드려요. 핸드폰 번호를 등록하면 문자도 보내드려요.',
  },
  {
    id: 4,
    question: '서비스 공지사항은 어디에서 확인하나요?',
    answer: '네이버 ‘무지개편지’ 블로그를 확인해주세요. \n',
    link: 'https://blog.naver.com/rainbowletter',
  },
  {
    id: 5,
    question: '문의/제휴하고 싶다면 어디로 연락하나요?',
    answer: '메일 주시면 영업일 기준 1~2일 이내 회신 드릴게요. \n',
    email: 'rainbowletter41@gmail.com',
  },
];

export const TITLES = Object.freeze({
  PET_NAME: 'register.name',
  DATE_OF_DEATH: 'register.day',
  PET_TYPES: 'register.type',
  ROLES_FOR_PETS: 'register.owner',
  PET_PERSONALITIES: 'register.personalities',
  PROFILE_IMAGE: 'register.image',
  OPTION: 'register.option',
});

export const DATE_OF_DEATH = Object.freeze({
  YEAR: '년',
  MONTH: '월',
  DAY: '일',
  UNKNOWN: 'register.unknown',
});

export const INFO_MESSAGES = Object.freeze({
  ENTER_NAME: 'register.enterNameWarn',
  UNCHANGEABLE_NAME_NOTICE: 'register.nameWarn',
  ENTER_WITHIN_10_CHARS: 'register.chaWarn',
  CHECK_DATE_AGAIN: 'register.dateWarn',
});

export const USER_ACTIONS = Object.freeze({
  REGISTER: '등록하기',
});

export const PERSONALITY_MAPPING = Object.freeze({
  애교많은: 'Affectionate',
  사교적인: 'Social',
  활동적인: 'Active',
  사고뭉치: 'Mischievous',
  똑똑한: 'Smart',
  낯가리는: 'Shy',
  장난치는: 'Playful',
  얌전한: 'Well-behaved',
  예민한: 'Sensitive',
  순한: 'Gentle',
  시크한: 'Chic',
  먹보: 'Food-loving',
});

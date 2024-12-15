export const USER_ACTIONS = {
  LEAVE: 'delete.leave',
};

export const ACCOUNT_DELETION = {
  GUIDELINES_TITLE: 'delete.guide',
  CONFIRM_MESSAGE: 'delete.confirm',
};

export const ACCOUNT_DELETION_GUIDELINES_TITLE_EN =
  'When you delete your account:';

export const ACCOUNT_DELETION_GUIDELINES_EN = [
  'All letters will be permanently deleted.',
  'Deleted data (letters, pet information, etc.) cannot be recovered.',
  'Even if you re-register with the same email, the deleted data will not be restored.',
  'Re-registration is not allowed for one week after account deletion.',
];

export const ACCOUNT_DELETION_GUIDELINES = [
  {
    ID: 1,
    CONTENT: ['탈퇴 시 ', <strong>편지는 모두 삭제</strong>, '됩니다.'],
  },
  {
    ID: 2,
    CONTENT: [
      '삭제된 데이터(편지, 동물정보 등)은 ',
      <strong>복구되지 않습니다.</strong>,
    ],
  },
  {
    ID: 3,
    CONTENT: [
      <strong>동일 이메일로 재가입해도</strong>,
      ' 삭제된 데이터는 복구되지 않습니다.',
    ],
  },
  {
    ID: 4,
    CONTENT: [
      '탈퇴 후 ',
      <strong>일주일 동안 재가입이 불가</strong>,
      '합니다.',
    ],
  },
];

type LetterStatus = 'REQUEST' | 'RESPONSE';
type ReadStatus = 'UNREAD' | 'READ';
type ReplyStatus = 'CHAT_GPT' | 'REPLY';
type promptType = 'A' | 'B';

type PetType = {
  id: number;
  userId: number;
  name: string;
  species: string;
  owner: string;
  personalities: string[];
  deathAnniversary: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

type LetterType = {
  id: number;
  userId: number;
  petId: number;
  summary: string;
  content: string;
  shareLink: string;
  image: string;
  status: LetterStatus;
  createdAt: string;
  updatedAt: string;
  number: number;
};

type ReplyType = {
  id: number;
  petId: number;
  letterId: number;
  summary: string;
  content: string;
  promptType: promptType;
  inspection: boolean;
  inspectionTime: string;
  status: ReplyStatus;
  submitTime: string;
  readStatus: ReadStatus;
  createdAt: string;
  updatedAt: string;
};

// export interface LetterListResponse {
//   id: number;
//   summary: string;
//   status: LetterStatus;
//   petName: string;
//   readStatus: ReadStatus;
//   createdAt: string;
//   number: number;
// }

export interface LetterItemPet {
  id: number;
  name: string;
  deathAnniversary: null;
  image: string;
  personalities: string[];
  species: string;
  owner: string;
  favorite: {
    canIncrease: boolean;
    dayIncreaseCount: number;
    lastIncreasedAt: string;
    total: number;
  };
}

export interface LetterItemReply {
  createdAt: string;
  inspection: boolean;
  inspectionTime: string;
  promptType: string;
  readStatus: string;
  status: string;
  submitTime: null | string;
  content: string;
  summary: string;
}

export interface LetterListResponse {
  id: number;
  sequence: number;
  createdAt: string;
  pet: LetterItemPet;
  summary: string;
  content: string;
  shareLink: string;
  image: string;
  reply: LetterItemReply | null;
  letterStatus?: string;
}

export interface LetterRequest {
  summary: string;
  content: string;
  image: string;
}

export interface LetterItemResponse {
  pet: PetType;
  letter: LetterType;
  reply: ReplyType;
}

export interface Letter {
  id: number;
  summary: string;
  content: string;
  shareLink: string;
  pet: {
    id: number;
    name: string;
    species: string;
    personalities: string;
    image: {
      id: null | number;
      objectKey: null | string;
      url: null | string;
    };
  };
  image: {
    id: number;
    objectKey: string;
    url: string;
  };
  reply: {
    id: number;
    summary: string;
    content: string;
    inspection: boolean;
    readStatus: string;
    type: string;
    timestamp: string;
  };
  createdAt: string;
}

export interface SharedLetterResponse {
  sharedLetters: SharedLetterItemType[];
  paginationInfo: SharedLetterPageType;
}

export interface SharedLetterItemType {
  id: number;
  content: string;
  recipientType: string;
  pet: {
    id: number;
    name: string;
    image: string;
  };
}

export interface SharedLetterPageType {
  next: string;
}

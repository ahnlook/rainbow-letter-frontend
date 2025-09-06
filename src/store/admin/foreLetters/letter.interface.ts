export interface ApiResponse {
  content: Content[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

interface Content {
  id: number;
  memberId: number;
  email: string;
  phoneNumber: string;
  provider: string;
  memberCreatedAt: string;
  summary: string;
  content: string;
  shareLink: string;
  count: number;
  pet: Pet;
  image: Image;
  reply: Reply;
  createdAt: string;
}

interface Pet {
  id: number;
  name: string;
  owner: string;
  species: string;
  personalities: string;
  deathAnniversary?: any;
  image: PetImage;
}

interface PetImage {
  id?: any;
  objectKey?: any;
  url?: any;
}

interface Image {
  id: number;
  objectKey: string;
  url: string;
}

interface Reply {
  id: number;
  summary: string;
  content: string;
  inspection: boolean;
  inspectionTime: string;
  readStatus: string;
  type: string;
  timestamp: string;
  chatGptContent: string;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

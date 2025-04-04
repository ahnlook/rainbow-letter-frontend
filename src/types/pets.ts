import { Dates } from 'types/date';

// TODO: 추후 lastIncreasedAt 물음표 삭제
export interface PetFavorite {
  id: number;
  total: number;
  dayIncreaseCount: number;
  canIncrease: boolean;
  lastIncreasedAt?: string;
}

export interface PetImage {
  id: number | null;
  objectKey: string | null;
  url: string | null;
}

export interface PetRegister {
  name: string;
  species: string;
  owner: string;
  deathAnniversary: Dates<string>;
  image: {
    id: string;
    url: string;
    file: File;
  };
}

export interface PetResponse {
  id: number;
  userId: number;
  name: string;
  species: string;
  owner: string;
  personalities?: string[];
  deathAnniversary: string;
  image: string;
  favorite: PetFavorite;
  createdAt: string;
  updatedAt: string;
}

export interface PetsDashBoard {
  id: number;
  name: string;
  letterCount: number;
  favoriteCount: number;
  image: string;
  deathAnniversary: string;
}

export interface LigthNovel {
  id: number;
  titles: string[];
  volumes: string;
  volumes_total: string;
  volumes_extra: string;
  synopsis: string;
  image: string;
  genders: string[];
  tags: string[];
  author: string;
  first_post: string;
  last_post: string;
  background?: string;
}

export interface ICollection {
  collection_id: string;
  create_at: string;
  image: string;
  name: string;
  popularity: number;
  volumes: number;
  volumes_total: number;
  __typename: string;
}

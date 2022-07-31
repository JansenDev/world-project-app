import { gql } from "@apollo/client";


export const GREETING = gql`
  query Query {
    greeting
  }`;

export const GET_COLLECTION_PAGINATED = gql`
  query ($input: PaginatedInput) {
    getCollectionsPaginated(input: $input) {
      collection_id
      popularity
      name
      volumes
      volumes_total
      image
      create_at
    }
  }`;


export const GET_COLLECTION_DETAIL_BY_ID = gql`
query ($idCollection: ID) {
  getCollectionDetailedById(idCollection: $idCollection) {
    collection_id
    name
    titles
    volumes_total
    volumes_extra
    synopsis
    image
    gender_id
    tag_id
    author
    first_post
    last_post
    background
    create_at
    volumes
    genders
  }
}
  `
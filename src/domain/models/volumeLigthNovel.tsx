export interface LigthNovelVolume {
  volumeId: number;
  bookId: number;
  volume: number;
  pagesTotal: number;
  pagesCurrent: number;
  pages: LigthNovelPage[];
}

interface LigthNovelPage {
  page_id: number;
  index: boolean;
  pageNumber: number;
  image: string | "";
  title: IPageTitle;
  text: string | "";
}

interface IPageTitle {
  tag?: string;
  title?: string;
}

export interface IPageContent {
  page_number: number;
  image: string;
  text: string;
  chapter_type: string;
  title: string;
  book_id: number;
}

import DetailsBook from "../screens/BookDetails/DetailsBook";
import Home from "../screens/Home/Home";
import Reader from "../screens/Reader/Reader";

export const routes: IRoute[] = [
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/details/:book_id",
    element: <DetailsBook />
  },
  {
    path: "/reader/:book_id/:book_volume/:book_pageNumber",
    element: <Reader />
  }
];

export interface IRoute {
  index?: boolean;
  path: string;
  element: JSX.Element;
  caseSensitive?: boolean;
  children?: IRoute[];
}

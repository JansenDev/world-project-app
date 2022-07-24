import DetailsBook from "../screens/BookDetails/DetailsBook";
import Home from "../screens/Home/Home";

export const routes: IRoute[] = [
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/details/:book_id",
    element: <DetailsBook />
  }
];

export interface IRoute {
  index?: boolean;
  path: string;
  element: JSX.Element;
  caseSensitive?: boolean;
  children?: IRoute[];
}

import Home from "../screens/Home/Home";

export const routes: IRoute[] = [
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/details/:book_id",
    element: <Home />
  }
];

export interface IRoute {
  index?: boolean;
  path: string;
  element: JSX.Element;
  caseSensitive?: boolean;
  children?: IRoute[];
}

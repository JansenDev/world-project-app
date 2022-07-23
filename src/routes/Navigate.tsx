import { IRoute, routes } from "./routes";
import { Route, NativeRouter, Routes } from "react-router-native";

const Navigate = () => (
  <NativeRouter>
    <Routes>{RenderChildrens(routes)}</Routes>
  </NativeRouter>
);

const RenderChildrens = (routes: IRoute[]) => {
  // Validar contenido de ruta
  if (!routes || routes.length === 0) {
    return;
  }

  //   Renderizar recursivamente la ruta y sus hijos
  return routes.map((props, index) => (
    <Route key={index} caseSensitive {...props}>
      {RenderChildrens(props.children!)}
    </Route>
  ));
};

export default Navigate;

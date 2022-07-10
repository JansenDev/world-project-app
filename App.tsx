import HeaderComponent from "./src/components/header/HeaderComponent";
import { ToastProvider } from "react-native-toast-notifications";
import Home from "./src/screens/Home/Home";
// import FaIcon from "react-native-vector-icons/FontAwesome";

export default function App() {
  return (
    <ToastProvider>
      <Home></Home>
    </ToastProvider>
  );
}

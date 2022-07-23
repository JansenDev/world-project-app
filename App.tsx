import { ToastProvider } from "react-native-toast-notifications";
import Navigate from "./src/routes/Navigate";

export default function App() {
  return (
    <ToastProvider>
      <Navigate />
    </ToastProvider>
  );
}

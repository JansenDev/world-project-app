import { ToastProvider } from "react-native-toast-notifications";
import Navigate from "./src/routes/Navigate";
import { AppRegistry } from "react-native";
import { ApolloProvider } from "@apollo/client";
import { clientGraphql } from "./src/api/graphql/config";

export default function App() {
  return (
    <ApolloProvider client={clientGraphql}>
      <ToastProvider>
        <Navigate />
      </ToastProvider>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent("WorldProject", () => App);

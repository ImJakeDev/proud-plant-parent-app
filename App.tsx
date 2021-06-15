import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { PROUD_PLANT_PARENT_ENDPOINT, X_HASURA_ADMIN_SECRET } from "@env";

import { ProudPlantParentProvider } from "./global/proudPlantParentContext";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

const client = new ApolloClient({
  uri: `${PROUD_PLANT_PARENT_ENDPOINT}`,
  cache: new InMemoryCache(),
  headers: {
    "content-type": "application/json",
    "x-hasura-admin-secret": `${X_HASURA_ADMIN_SECRET}`,
  },
});

const queryClient = new QueryClient();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <QueryClientProvider client={queryClient}>
            <ProudPlantParentProvider>
              <Navigation colorScheme={colorScheme} />
            </ProudPlantParentProvider>
            <StatusBar />
          </QueryClientProvider>
        </ApolloProvider>
      </SafeAreaProvider>
    );
  }
}

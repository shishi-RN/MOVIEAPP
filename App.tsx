import React, { useState, useEffect } from "react";
import Navigation from "./src/Navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

const App = () => {
  //Persistent Query Client
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 1000 * 60 * 5,
      },
    },
  });

  const asyncStoragePersister = createAsyncStoragePersister({
    storage: AsyncStorage,
  });
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister }}
    >
      <QueryClientProvider client={queryClient}>
        <Navigation />
      </QueryClientProvider>
    </PersistQueryClientProvider>
  );
};
export default App;

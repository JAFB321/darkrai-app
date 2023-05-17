import "react-datepicker/dist/react-datepicker.css";
import {
  RefineThemes,
  ThemedLayoutV2,
  notificationProvider,
} from "@refinedev/chakra-ui";
import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider, {
  UnsavedChangesNotifier,
} from "@refinedev/nextjs-router";
import type { NextPage } from "next";
import { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";
import { Header } from "@components/header";
// import dataProvider from "@refinedev/simple-rest";
import { authProvider } from "src/authProvider";
import { dataProvider } from "src/providers/rest-data-provider";
import { liveProvider } from "src/providers/alertas-live-provider";
import { useEffect, useState } from "react";
import { AlertasClient } from "src/providers/alertas-live-provider/AlertasClient";
import AuthContext from "src/context/authContext";
import { adminResources, enfermeroResources } from "src/utils/resources";

const serverIp = process.env.SERVER_API_IP

const API_URL = `http://${serverIp}:3003/api`;

const alertsClient = new AlertasClient(API_URL)

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  noLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element { 
  // const { data: permissionsData } = usePermissions();
  // const { data: user } = useGetIdentity<User>();
  
  const [isAdmin, setIsAdmin] = useState(false)

  const [SERVER_API_URL] = useState(API_URL)
  
  useEffect(() => {
    localStorage.setItem('SERVER_API_URL',SERVER_API_URL)
  }, [SERVER_API_URL])
  
  console.log(SERVER_API_URL);
  
  const renderComponent = () => {
    if (Component.noLayout) {
      return <Component {...pageProps} />;
    }

    return (
      <ThemedLayoutV2 Header={Header} >
        <Component {...pageProps} />
      </ThemedLayoutV2>
    );
  };

  return (
    <>
      <AuthContext.Provider value={{isAdmin, setIsAdmin}}>
      <RefineKbarProvider>
        {/* You can change the theme colors here. example: theme={RefineThemes.Magenta} */}
        <ChakraProvider theme={RefineThemes.Blue}>
          <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(SERVER_API_URL)}
            notificationProvider={notificationProvider}
            liveProvider={liveProvider(alertsClient)}
            authProvider={authProvider}
            resources={isAdmin ? adminResources : enfermeroResources}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true, 
            }}
          >
            {renderComponent()}
            <RefineKbar />
            <UnsavedChangesNotifier />
          </Refine>
        </ChakraProvider>
      </RefineKbarProvider>
      </AuthContext.Provider>

    </>
  );
}

export default MyApp;

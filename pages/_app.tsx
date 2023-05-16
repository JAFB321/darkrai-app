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
      <ThemedLayoutV2 Header={Header}>
        <Component {...pageProps} />
      </ThemedLayoutV2>
    );
  };

  return (
    <>
      <RefineKbarProvider>
        {/* You can change the theme colors here. example: theme={RefineThemes.Magenta} */}
        <ChakraProvider theme={RefineThemes.Blue}>
          <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(SERVER_API_URL)}
            notificationProvider={notificationProvider}
            liveProvider={liveProvider(alertsClient)}
            authProvider={authProvider}
            resources={[
              {
                name: "medicamento",
                list: "/medicamentos",
                create: "/medicamentos/create",
                edit: "/medicamentos/edit/:id",
                show: "/medicamentos/show/:id",
                meta: {
                  canDelete: true,
                },
              },
              {
                name: "paciente",
                list: "/pacientes",
                create: "/pacientes/create",
                edit: "/pacientes/edit/:id",
                show: "/pacientes/show/:id",
                meta: {
                  canDelete: true,
                },
              },
              {
                name: "enfermero",
                list: "/enfermeros",
                create: "/enfermeros/create",
                edit: "/enfermeros/edit/:id",
                show: "/enfermeros/show/:id",
                meta: {
                  canDelete: true,
                },
              },
              {
                name: "tratamiento",
                list: "/tratamientos",
                create: "/tratamientos/create",
                edit: "/tratamientos/edit/:id",
                show: "/tratamientos/show/:id",
                meta: {
                  canDelete: true,
                  hide: true
                },
              },
              {
                name: "plan-medicacion",
                create: "/plan-medicaciones/create",
                edit: "/plan-medicaciones/edit/:id",
                show: "/plan-medicaciones/show/:id",
                meta: {
                  canDelete: true,
                  hide: true
                },
              },
              {
                name: "suministrar/all",
                list: "/suministrar",
                meta: {
                  label: 'Suministrar',
                }
                
              },
              {
                name: "contenedor",
                list: "/contenedor",
                edit: "/contenedor/edit/:id",
                show: "/contenedor/show/:id",
                meta: {
                  label: 'Contenedores',
                }
                
              },
              // {
              //   name: "categories",
              //   list: "/categories",
              //   create: "/categories/create",
              //   edit: "/categories/edit/:id",
              //   show: "/categories/show/:id",
              //   meta: {
              //     canDelete: true,
              //   },
              // },
            ]}
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
    </>
  );
}

export default MyApp;

import { ContenedorList } from "@components/contenedor/ContenedorList";
import { ChakraUIListInferencer } from "@refinedev/inferencer/chakra-ui";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

export default function ContenedorListPage() {
  return <ContenedorList />;
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  if (!authenticated) {
    return {
      props: {},
      redirect: {
        destination: `${redirectTo}?to=${encodeURIComponent("/contenedor")}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

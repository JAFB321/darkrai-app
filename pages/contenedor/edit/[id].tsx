import { ContenedorEdit } from "@components/contenedor/ContenedorEdit";
import { ChakraUIEditInferencer } from "@refinedev/inferencer/chakra-ui";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

export default function ContenedorEditPage() {
  return <ContenedorEdit />;
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

import { PacienteList } from "@components/paciente/PacienteList";
import { ChakraUIListInferencer } from "@refinedev/inferencer/chakra-ui";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

export default function PacienteListPage() {
  // return <ChakraUIListInferencer />;
  return < PacienteList />;
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  if (!authenticated) {
    return {
      props: {},
      redirect: {
        destination: `${redirectTo}?to=${encodeURIComponent("/pacientes")}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

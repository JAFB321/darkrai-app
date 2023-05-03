import { PacienteShow } from "@components/paciente/PacienteShow";
import { ChakraUIShowInferencer } from "@refinedev/inferencer/chakra-ui";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

export default function PacienteShowPage() {
  return <PacienteShow />;
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

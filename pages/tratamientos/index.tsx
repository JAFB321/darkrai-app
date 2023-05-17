import { TratamientoList } from "@components/tratamiento/TratamientoList";
import { ChakraUIListInferencer } from "@refinedev/inferencer/chakra-ui";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";
import { havePermission, redirectToHome } from "src/utils/auth";

export default function TratamientoListPage() {
  return <TratamientoList />;
  // return < ChakraUIListInferencer />;
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  const { pacienteId } = context.query

  const isAutorized = await havePermission(context, 'admin', 'enfermero')
  if(!isAutorized) return redirectToHome()

  if (!pacienteId) {
    return {
      props: {},
      redirect: {
        destination: `/pacientes`,
        permanent: false,
      },
    };
  }

  if (!authenticated) {
    return {
      props: {},
      redirect: {
        destination: `${redirectTo}?to=${encodeURIComponent("/tratamientos")}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

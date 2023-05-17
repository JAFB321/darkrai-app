import { TratamientoEdit } from "@components/tratamiento/TratamientoEdit";
import { ChakraUIEditInferencer } from "@refinedev/inferencer/chakra-ui";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";
import { havePermission, redirectToHome } from "src/utils/auth";

export default function TratamientEditPage() {
  return <TratamientoEdit />;
  // return <ChakraUIEditInferencer />;
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  const isAutorized = await havePermission(context, 'admin')
  if(!isAutorized) return redirectToHome()
  
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

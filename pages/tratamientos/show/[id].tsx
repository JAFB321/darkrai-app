import { TratamientoShow } from "@components/tratamiento/TratamientoShow";
import { ChakraUIShowInferencer } from "@refinedev/inferencer/chakra-ui";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";
import { havePermission, redirectToHome } from "src/utils/auth";

export default function TratamientoShowPage() {
  return <TratamientoShow />;
  // return <ChakraUIShowInferencer />;
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);


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

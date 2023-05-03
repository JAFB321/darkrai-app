import { TratamientoCreate } from "@components/tratamiento/TratamientoCreate";
import { ChakraUICreateInferencer } from "@refinedev/inferencer/chakra-ui";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

export default function TratamientoCreatePage() {
  return <TratamientoCreate />;
  // return <ChakraUICreateInferencer />;
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

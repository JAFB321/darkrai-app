import { PlanMedicacionShow } from "@components/plan-medicacion/PlanMedicacionShow";
import { ChakraUIShowInferencer } from "@refinedev/inferencer/chakra-ui";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

export default function PlanMedicacionShowPage() {
  return <PlanMedicacionShow />;
  // return <ChakraUIShowInferencer />;
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  if (!authenticated) {
    return {
      props: {},
      redirect: {
        destination: `${redirectTo}?to=${encodeURIComponent("/plan-medicaciones")}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

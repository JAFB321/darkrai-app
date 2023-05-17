import { ChakraUIListInferencer } from "@refinedev/inferencer/chakra-ui";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";
import { havePermission, redirectToHome } from "src/utils/auth";

export default function CategoryList() {
  return <ChakraUIListInferencer />;
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  const isAutorized = await havePermission(context, 'admin')
  if(!isAutorized) return redirectToHome()

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

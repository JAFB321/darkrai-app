import { ChakraUIListInferencer } from "@refinedev/inferencer/chakra-ui";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

export default function CategoryList() {
  return <ChakraUIListInferencer />;
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  if(authProvider.getPermissions){
    const permissions = await authProvider.getPermissions() as any
    console.log(permissions);
  }

  if (!authenticated) {
    return {
      props: {},
      redirect: {
        destination: `${redirectTo}?to=${encodeURIComponent("/categories")}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

import { Heading } from "@chakra-ui/react";
import { AuthPage } from "@refinedev/chakra-ui";

import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

export default function Login() {
  return (
    <AuthPage
      type="login"
      title={<Heading>Darkrai</Heading>}
      contentProps={{
        title: 'Iniciar sesion',
      }}
      formProps={{
        defaultValues: { email: "izak@darkrai.com", password: "12345" },
      }}
      
      registerLink={<></>}
      forgotPasswordLink={<></>}
    />
  );
}

Login.noLayout = true;

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  if (authenticated) {
    return {
      props: {},
      redirect: {
        destination: redirectTo ?? "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

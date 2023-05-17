import { EnfermeroShow } from "@components/enfermero/EnfermeroShow";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";
import { havePermission, redirectToHome } from "src/utils/auth";

export default function EnfermeroShowPage() {
  return <EnfermeroShow />;
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  const isAutorized = await havePermission(context, 'admin')
  if(!isAutorized) return redirectToHome()

  if (!authenticated) {
    return {
      props: {},
      redirect: {
        destination: `${redirectTo}?to=${encodeURIComponent("/enfermeros")}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

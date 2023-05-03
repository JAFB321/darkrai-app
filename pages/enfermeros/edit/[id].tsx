import { EnfermeroEdit } from "@components/enfermero/EnfermeroEdit";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

export default function EnfermeroEditPage() {
  return <EnfermeroEdit />;
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

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

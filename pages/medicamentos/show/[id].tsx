import { MedicamentoShow } from "@components/medicamento/MedicamentoShow";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

export default function MedicamentoShowPage() {
  return <MedicamentoShow />;
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

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

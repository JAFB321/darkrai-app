import { MedicamentoList } from "@components/medicamento/MedicamentoList";
import { ChakraUIListInferencer } from "@refinedev/inferencer/chakra-ui";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

export default function CategoryListPage() {
    return <MedicamentoList />;
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
    const { authenticated, redirectTo } = await authProvider.check(context);

    if (!authenticated) {
        return {
            props: {},
            redirect: {
                destination: `${redirectTo}?to=${encodeURIComponent("/medicamentos")}`,
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};

import { EnfermeroList } from "@components/enfermero/EnfermeroList";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

export default function EnfermeroListPage() {
    return <EnfermeroList />;
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

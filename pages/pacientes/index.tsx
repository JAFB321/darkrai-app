import { PacienteList } from "@components/paciente/PacienteList";
import { usePermissions } from "@refinedev/core";
import { GetServerSideProps } from "next";
import { useContext, useEffect } from "react";
import { authProvider } from "src/authProvider";
import AuthContext from "src/context/authContext";
import { AuthRoles } from "src/utils/auth";

export default function PacienteListPage() {

  const authContext = useContext(AuthContext)
  const { data: permissions } = usePermissions<AuthRoles>()
  
  useEffect (() => {
     if(permissions?.rol === 'admin' && !authContext.isAdmin){
      authContext.setIsAdmin(true)
     }
     if(permissions?.rol === 'enfermero' && authContext.isAdmin){
      authContext.setIsAdmin(false)
     }
  }, [permissions?.rol])
  
  return < PacienteList />;
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  if (!authenticated) {
    return {
      props: {},
      redirect: {
        destination: `${redirectTo}?to=${encodeURIComponent("/pacientes")}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

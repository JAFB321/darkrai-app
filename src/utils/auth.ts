import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { authProvider } from "src/authProvider";
import { UserRoles } from "src/types";

export type AuthRoles = { rol: UserRoles }

export const havePermission = async (
    ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
    ...roles: UserRoles[]
    ) => {
        if(!authProvider.getPermissions) return false

        const permissions = await authProvider.getPermissions(ctx) as AuthRoles
        if(!permissions?.rol) return false

        return roles.includes(permissions.rol)
    }

export const redirectToHome = () => ({
    props: {},
    redirect: {
      destination: `/`,
      permanent: false,
    },
  })
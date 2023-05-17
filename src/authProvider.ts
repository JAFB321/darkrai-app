import { AuthBindings } from "@refinedev/core";
import nookies from "nookies";
import axios from 'axios'
import { User, UserRoles } from "./types";

export const authProvider: AuthBindings = {
  login: async ({ email, username, password, remember }) => {
    // Suppose we actually send a request to the back end here.
    

    const SERVER_API_URL = localStorage.getItem('SERVER_API_URL')
    const response = await axios.post(SERVER_API_URL+'/user/auth', {
      username: email || username,
      password
    }).catch((error) => ({error: error.message} as any))

    if(response.error) return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    };

    const user: User = response.data.data

    if (user?.id) {
      nookies.set(null, "auth", JSON.stringify(user), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    };
    
  },
  logout: async () => {
    nookies.destroy(null, "auth");
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async (ctx: any) => {
    const cookies = nookies.get(ctx);
    if (cookies["auth"]) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
    };
  },
  getPermissions: async (ctx) => {
    const auth = nookies.get(ctx)["auth"]
    if (auth) {
      const parsedAuth = JSON.parse(auth) 
      return {rol: parsedAuth.rol};
    }
    return null;
  },
  getIdentity: async () => {
    const auth = nookies.get()["auth"];
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return parsedUser;
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};

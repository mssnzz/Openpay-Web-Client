import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../src/theme";
import "../global.css";
import { useRouter } from "next/router";
import { getProfile } from "../services/users";
import { setUserProfile } from "../context/profile";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <MyInnerApp Component={Component} pageProps={pageProps} />
    </SessionProvider>
  );
}

function MyInnerApp({ Component, pageProps }: any) {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: false,
    onUnauthenticated() {
      // Redirige a la página principal si no está autenticado
      router.push("/");
    },
  });

  React.useEffect(() => {
    // Función para obtener el perfil del usuario
    async function fetchUserProfile() {
      if (session) {
        const logged: any = session;
        console.log(session);
        try {
          const response = await getProfile(logged?.user?.accessToken);
          if (response.error == true) {
            setUserProfile(null);
            signOut({ callbackUrl: "/" });
          } else {
            setUserProfile(response.data);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    }

    if (session) {
      fetchUserProfile();
    }

    // Redirecciona según el estado de autenticación y la ruta actual
    if (
      status === "authenticated" &&
      router.pathname !== "/dashboard/inventario/lista"
    ) {
      //router.push("/dashboard/inventario/lista");
    } else if (status === "unauthenticated") {
      router.push("/");
    }
  }, [session, router, status]);

  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  );
}

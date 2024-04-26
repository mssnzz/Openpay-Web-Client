// _app.tsx
import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles';
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../src/theme";  // Asegúrate de que este import está trayendo correctamente tu tema
import "../global.css";
import { useRouter } from "next/router";
import { getProfile } from "../services/users";
import { setUserProfile } from "../context/profile";
import { CircularProgress } from "@mui/material";

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
  const [profileLoaded, setProfileLoaded] = React.useState(false); // Estado para controlar la carga del perfil

  React.useEffect(() => {
    async function fetchUserProfile() {
      if (session) {
        const logged: any = session;
        console.log(session);
        try {
          const response = await getProfile(logged?.user?.accessToken);
          if (response.error == true) {
            setUserProfile(null);
            signOut({ callbackUrl: "/" });
            setProfileLoaded(true); // Configura el estado a true una vez el perfil esté cargado

          } else {
            setUserProfile(response.data);
            setProfileLoaded(true); // Configura el estado a true una vez el perfil esté cargado

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
    if (status === "authenticated" && router.pathname !== "/dashboard/inventario/lista") {
      // router.push("/dashboard/inventario/lista");
    } else if (status === "unauthenticated") {
      router.push("/");
    }
  }, [session, router, status]);
  const materialTheme = materialExtendTheme(theme.material);
  if (!profileLoaded) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress /> {/* Mostrar un spinner mientras el perfil está cargando */}
      </div>
    );
  }
  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
        <JoyCssVarsProvider
          disableTransitionOnChange
          theme={theme.joy}
        >
          <CssBaseline enableColorScheme />
          <Component {...pageProps} />
        </JoyCssVarsProvider>
      </MaterialCssVarsProvider>
    </React.Fragment>
  );
}

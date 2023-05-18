/* eslint-disable react/display-name */
import "../styles/globals.css";
// ** React Perfect Scrollbar Style
import "react-perfect-scrollbar/dist/css/styles.css";

// ** Global css styles
// import "../../styles/globals.css";
import type { EmotionCache } from "@emotion/cache";
// ** Emotion Imports
import { CacheProvider } from "@emotion/react";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import type { NextPage } from "dashboard";
import type { AppProps } from "next/app";
// ** Next Imports
import Head from "next/head";
import { useRouter } from "next/router";
import { Router } from "next/router";
import { getSession, SessionProvider, useSession } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
// ** Loader Import
import NProgress from "nprogress";
import { ReactChild, ReactFragment, ReactPortal } from "react";

// ** Contexts
import {
  SettingsConsumer,
  SettingsProvider,
} from "@app/src/_start/@core/context/settingsContext";
import ThemeComponent from "@app/src/_start/@core/theme/ThemeComponent";
// ** Utils Imports
import { createEmotionCache } from "@app/src/_start/@core/utils/create-emotion-cache";
// ** Config Imports
import themeConfig from "@app/src/_start/config/themeConfig";
// ** Component Imports
import UserLayout from "@app/src/_start/layouts/UserLayout";

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  component: NextPage;
  emotionCache: EmotionCache;
};

const clientSideEmotionCache = createEmotionCache();

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });
  Router.events.on("routeChangeError", () => {
    NProgress.done();
  });
  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });
}

const lightTheme = createTheme({
  type: "light",
  theme: {
    colors: {},
  },
});

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {},
  },
});

const App = ({ Component, pageProps }: AppProps, props: ExtendedAppProps) => {
  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider>
        <SessionProvider session={pageProps.session}>
          <AuthenticatedApp
            pageProps={pageProps}
            Component={Component}
            router={props.router}
          />
        </SessionProvider>
      </NextUIProvider>
    </NextThemesProvider>
  );
};

function AuthenticatedApp(
  { Component, pageProps }: AppProps,
  props: ExtendedAppProps
) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    // exibir um spinner de carregamento ou tela de carregamento aqui
    return <div>Loading...</div>;
  }

  // Verifique a rota atual
  // const isDashboardPage = router.pathname.includes("dashboard");
  const isDashboardPage = true;
  return (
    <Dashboard
      pageProps={pageProps}
      Component={Component}
      router={props.router}
      component={Component}
      emotionCache={clientSideEmotionCache}
    />
  );
  // return !!session && isDashboardPage ? (
  //   <Dashboard
  //     pageProps={pageProps}
  //     Component={Component}
  //     router={props.router}
  //     component={Component}
  //     emotionCache={clientSideEmotionCache}
  //   />
  // ) : (
  //   <Home
  //     pageProps={pageProps}
  //     Component={Component}
  //     router={props.router}
  //     component={Component}
  //     emotionCache={clientSideEmotionCache}
  //   />
  // );
}

export default App;

const Home = (props: ExtendedAppProps) => {
  const { Component, pageProps } = props;

  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </NextThemesProvider>
  );
};

const Dashboard = (props: ExtendedAppProps) => {
  const {
    Component,
    component,
    emotionCache = clientSideEmotionCache,
    pageProps,
  } = props;

  // Variables
  const getLayout =
    component.getLayout ??
    ((
      page:
        | boolean
        | ReactChild
        | ReactFragment
        | ReactPortal
        | null
        | undefined
    ) => <UserLayout>{page}</UserLayout>);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{`${themeConfig.templateName} - Material Design React Admin Template`}</title>
        <meta
          name="description"
          content={`${themeConfig.templateName} – Material Design React Admin Dashboard Template – is the most developer friendly & highly customizable Admin Dashboard Template based on MUI v5.`}
        />
        <meta
          name="keywords"
          content="Material Design, MUI, Admin Template, React Admin Template"
        />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <SettingsProvider>
        <SettingsConsumer>
          {({ settings }) => {
            return (
              <ThemeComponent settings={settings}>
                {getLayout(<Component {...pageProps} />)}
              </ThemeComponent>
            );
          }}
        </SettingsConsumer>
      </SettingsProvider>
    </CacheProvider>
  );
};

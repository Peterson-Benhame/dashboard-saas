// ** React Imports
import Box, { BoxProps } from "@mui/material/Box";
// ** MUI Imports
import Fab from "@mui/material/Fab";
import { styled } from "@mui/material/styles";
// ** Icons Imports
import ArrowUp from "mdi-material-ui/ArrowUp";
import { useRouter } from "next/router";
import { useState } from "react";

import ScrollToTop from "@app/src/_start/@core/components/scroll-to-top";
// ** Type Import
import { LayoutProps } from "@app/src/_start/@core/layouts/types";
// ** Styled Component
import DatePickerWrapper from "@app/src/_start/@core/styles/libs/react-datepicker";
// ** Theme Config Import
import themeConfig from "@app/src/_start/config/themeConfig";

import Footer from "./components/shared-components/footer";
// ** Components
import AppBar from "./components/vertical/appBar";
import Navigation from "./components/vertical/navigation";

const VerticalLayoutWrapper = styled("div")({
  height: "100%",
  display: "flex",
});

const MainContentWrapper = styled(Box)<BoxProps>({
  flexGrow: 1,
  minWidth: 0,
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
});

const ContentWrapper1 = styled("main")(({ theme }) => ({
  flexGrow: 1,
  width: "100%",
  padding: theme.spacing(6),
  transition: "padding .25s ease-in-out",
  [theme.breakpoints.down("sm")]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}));

const ContentWrapper2 = styled("main")(({ theme }) => ({
  flexGrow: 1,
  width: "100%",
  transition: "padding .25s ease-in-out",
  [theme.breakpoints.down("sm")]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}));

const VerticalLayout = (props: LayoutProps) => {
  const router = useRouter();
  const isDashboardPage = router.pathname.includes("dashboard");

  // ** Props
  const { settings, children, scrollToTop } = props;

  // ** Vars
  const { contentWidth } = settings;
  const navWidth = themeConfig.navigationSize;

  // ** States
  const [navVisible, setNavVisible] = useState<boolean>(false);

  // ** Toggle Functions
  const toggleNavVisibility = () => setNavVisible(!navVisible);

  return (
    <>
      <VerticalLayoutWrapper className="layout-wrapper">
        {/* Navigation Menu */}
        {isDashboardPage && (
          <Navigation
            navWidth={navWidth}
            navVisible={navVisible}
            setNavVisible={setNavVisible}
            toggleNavVisibility={toggleNavVisibility}
            {...props}
          />
        )}
        <MainContentWrapper className="layout-content-wrapper">
          {/* AppBar Component */}
          {isDashboardPage && (
            <AppBar toggleNavVisibility={toggleNavVisibility} {...props} />
          )}

          {/* Content */}
          {isDashboardPage && (
            <ContentWrapper1
              className="layout-page-content"
              sx={{
                ...(contentWidth === "boxed" && {
                  mx: "auto",
                  "@media (min-width:1440px)": { maxWidth: 1440 },
                  "@media (min-width:1200px)": { maxWidth: "100%" },
                }),
              }}
            >
              {children}
            </ContentWrapper1>
          )}
          {!isDashboardPage && (
            <ContentWrapper2
              className="layout-page-content"
              sx={{
                ...(contentWidth === "boxed" && {
                  mx: "auto",
                  "@media (min-width:1440px)": { maxWidth: 1440 },
                  "@media (min-width:1200px)": { maxWidth: "100%" },
                }),
              }}
            >
              {children}
            </ContentWrapper2>
          )}

          {/* Footer Component */}
          {isDashboardPage && <Footer {...props} />}

          {/* Portal for React Datepicker */}
          <DatePickerWrapper sx={{ zIndex: 11 }}>
            <Box id="react-datepicker-portal"></Box>
          </DatePickerWrapper>
        </MainContentWrapper>
      </VerticalLayoutWrapper>

      {/* Scroll to top button */}
      {scrollToTop ? (
        scrollToTop(props)
      ) : (
        <ScrollToTop className="mui-fixed">
          <Fab color="primary" size="small" aria-label="scroll back to top">
            <ArrowUp />
          </Fab>
        </ScrollToTop>
      )}
    </>
  );
};

export default VerticalLayout;

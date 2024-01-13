import { useState, useEffect, useMemo } from "react";
// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";

// Soft UI Dashboard React examples
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Soft UI Dashboard React themes
import theme from "assets/theme";
// import themeRTL from "assets/theme/theme-rtl";

// RTL plugins
// import rtlPlugin from "stylis-plugin-rtl";
// import { CacheProvider } from "@emotion/react";
// import createCache from "@emotion/cache";

// Soft UI Dashboard React routes
import routes from "routes";

// Soft UI Dashboard React contexts
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";
import SignIn from "layouts/authentication/sign-in";

// Images
import brand from "assets/images/logo-ct.png";

import UserContext from "./context/userContext";

export default function App() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [user, setUser] = useState("asdasd");
  // const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  const value = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user]
  );

  // Cache for the rtl
  // useMemo(() => {
  //   const cacheRtl = createCache({
  //     key: "rtl",
  //     stylisPlugins: [rtlPlugin],
  //   });

  //   setRtlCache(cacheRtl);
  // }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const fildtedRoutes = routes?.filter((e) => e.isSideBarActive === true);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <SuiBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="default" color="inherit">
        settings
      </Icon>
    </SuiBox>
  );

  return (
    <UserContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        {user ? (
          <>
            <CssBaseline />
            <>
              <Sidenav
                color={sidenavColor}
                brand={brand}
                brandName="Admin Dashboard"
                routes={fildtedRoutes}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
              />
              <Configurator />
              {configsButton}
            </>
            <Routes>
              {getRoutes(routes)}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </>
        ) : (
          <SignIn />
        )}
      </ThemeProvider>
    </UserContext.Provider>
  );
}

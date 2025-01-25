import React from "react";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import { MainContextProvider } from "../context/MainContext";
import AppLayout from "../layout/AppLayout";
import UserPage from "../pages/UserPage";

export const routes = [
  {
    path: "/",
    element: <RegisterPage />,
    layout: "App",
  },
  {
    path: "/login",
    element: <LoginPage />,
    layout: "App",
  },
  {
    path: "/user",
    element: <UserPage></UserPage>,
    layout:"App"
  },
  
];

interface RouterType {
  path: string;
  element: React.ReactNode;
  layout?: string;
}

const layoutRouter = (routes: RouterType[]): RouterType[] => {
  return routes.map((router) => {
    if (router.layout && router.layout === "App") {
      router.element = (
        <MainContextProvider>
          <AppLayout>{router.element}</AppLayout>
        </MainContextProvider>
      );
    }
    return router;
  });
};

export default layoutRouter(routes);

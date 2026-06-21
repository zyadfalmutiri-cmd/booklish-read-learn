import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import ReactGA from "react-ga4";

export const getRouter = () => {
  const queryClient = new QueryClient();

  // تشغيل Google Analytics مرة واحدة
  ReactGA.initialize("G-RX3P6FG7FL");

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  // تتبع تغيير الصفحات
  router.subscribe(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname,
    });
  });

  return router;
};
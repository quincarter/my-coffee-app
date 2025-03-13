import { createContext } from "@lit/context";
import { Route } from "@vaadin/router";

export const routerContext = createContext(Symbol("router-context"));

export const navigationItems: Route[] = [
  {
    path: "/",
    name: "Home",
    component: "coffee-home",
    action: async () => {
      await import("../pages/home/coffee-home");
    },
  },
  {
    path: "/users",
    name: "Users",
    component: "coffee-users",
    action: async () => {
      await import("../pages/users/coffee-users");
    },
  },
  // { path: "/users/:user", component: "x-user-profile" },
];

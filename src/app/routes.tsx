import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import {
  Home,
  Products,
  ProductDetail,
  OrderProduct,
  Checkout,
  CustomizeProduct,
  Login,
  Register,
  About,
  Contact,
  SendMessage,
  Promo,
  Profile,
  CookieSettings
} from "./pages";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "produtos",
        Component: Products,
      },
      {
        path: "produto/:id",
        Component: ProductDetail,
      },
      {
        path: "personalizar/:id",
        Component: CustomizeProduct,
      },
      {
        path: "encomendar/:id",
        Component: OrderProduct,
      },
      {
        path: "checkout",
        Component: Checkout,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "registo",
        Component: Register,
      },
      {
        path: "sobre",
        Component: About,
      },
      {
        path: "contactos",
        Component: Contact,
      },
      {
        path: "enviar-mensagem",
        Component: SendMessage,
      },
      {
        path: "promo-primeira-compra",
        Component: Promo,
      },
      {
        path: "perfil",
        Component: Profile,
      },
      {
        path: "/definicoes-cookies",
        Component: CookieSettings,
      },
    ],
  },
]);
import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "./pages/Home";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Collection from "./pages/Collection";
import ProductPage from "./pages/Product";
import Wishlist from "./pages/Wishlist";
import Help from "./pages/Help";
import Checkout from "./pages/Checkout";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Orders from "./pages/Orders";
import Returns from "./pages/Returns";
import Loyalty from "./pages/Loyalty";
import OrderConfirmation from "./pages/OrderConfirmation";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "careers", Component: Careers },
      { path: "collection", Component: Collection },
      { path: "product/:id", Component: ProductPage },
      { path: "wishlist", Component: Wishlist },
      { path: "help", Component: Help },
      { path: "checkout", Component: Checkout },
      { path: "signin", Component: SignIn },
      { path: "register", Component: Register },
      { path: "forgot-password", Component: ForgotPassword },
      { path: "orders", Component: Orders },
      { path: "returns", Component: Returns },
      { path: "loyalty", Component: Loyalty },
      { path: "order-confirmation", Component: OrderConfirmation },
      { path: "*", Component: NotFound },
    ],
  },
]);

import { createBrowserRouter } from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar";
import { Product } from "./pages/Product/Product";
import { Cart } from "./pages/Cart/Cart";
import { ProductForm } from "./pages/ProductForm/ProductForm";
import { ProductContainer } from "./pages/ProductContainer/ProductContainer";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children: [
      {
        index: true,
        element: <ProductContainer />
      },
      {
        path: "/product",
        element: <Product />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/product-form",
        element: <ProductForm />,
      },
    ],
  },
]);

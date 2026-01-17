import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import Error from "./components/Error/Error";
import About from "./components/About/About";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import SellProduct from "./components/SellProduct/SellProduct";
import Login from "./components/Login/Login";
import Footer from "./components/Footer/Footer";

const AppLayout = () => {
  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const appRoute = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
        errorElement: <Error />,
      },
      {
        path: "/about",
        element: <About name={"About XOWNER"} />,
        errorElement: <Error />,
      },
      {
        path: "/products/:productId",
        element: <ProductDetails />,
        errorElement: <Error />,
      },
      {
        path: "/sell",
        element: <SellProduct />,
        errorElement: <Error />,
      },
      {
        path: "/login",
        element: <Login />,
        errorElement: <Error />,
      },
    ],
    errorElement: <Error />,
  },
]);

const App = () => {
  return <RouterProvider router={appRoute}></RouterProvider>;
};

export default App;

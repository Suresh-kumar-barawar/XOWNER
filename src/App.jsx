import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import Error from "./components/Error/Error";
import About from "./components/About/About";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import SellProduct from "./components/SellProduct/SellProduct";
import Exchange from "./components/Exchange/Exchange";
import Login from "./components/Login/Login";
import Chat from "./components/Chat/Chat";
import Help from "./components/Help/Help";
import Footer from "./components/Footer/Footer";
import BottomNav from "./components/BottomNav/BottomNav";
import ScrollToTop from "./utils/useScrollToTop";

const AppLayout = () => {
  return (
    <div className="app-layout">
      <Header />
      <ScrollToTop />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
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
      {
        path: "/chat",
        element: <Chat />,
        errorElement: <Error />,
      },
      {
        path: "/help",
        element: <Help />,
        errorElement: <Error />,
      },
      {
        path: "/exchange",
        element: <Exchange />,
        errorElement: <Error />,
      },
    ],
    errorElement: <Error />,
  },
]);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={appRoute} />
    </AuthProvider>
  );
};

export default App;
